// Arranca la app en un puerto aleatorio con una base temporal cifrada y claves de prueba.
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export async function startTestServer() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mi-horario-test-'));
  const dbFile = path.join(dir, 'test.db');
  Object.assign(process.env, {
    NODE_ENV: 'test',
    ENV_FILE: '/nonexistent',
    APP_ORIGIN: 'http://127.0.0.1',
    DATABASE_PATH: dbFile,
    DB_ENCRYPTION_KEY: crypto.randomBytes(32).toString('hex'),
    DATA_ENCRYPTION_KEY: crypto.randomBytes(32).toString('base64'),
    BLIND_INDEX_KEY: crypto.randomBytes(32).toString('base64'),
    BCRYPT_ROUNDS: '10',
    WEATHER_ENABLED: 'false'
  });
  const { config } = await import('../src/config.js');
  const { initCrypto } = await import('../src/security/crypto.js');
  const { openDatabase } = await import('../src/db/index.js');
  const { createApp } = await import('../src/app.js');
  initCrypto(config);
  openDatabase({ file: dbFile, hexKey: config.dbEncryptionKey });
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise((r) => server.once('listening', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  config.appOrigin = base;
  return { server, base, dbFile, dir, hexKey: config.dbEncryptionKey };
}

/** Cliente mínimo que conserva la cookie de sesión y el token CSRF. */
export function client(base) {
  let cookie = '';
  let csrf = '';
  async function req(method, path, body, extraHeaders = {}) {
    const headers = { ...extraHeaders };
    if (cookie) headers.cookie = cookie;
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (csrf && !('x-csrf-token' in extraHeaders)) headers['x-csrf-token'] = csrf;
    const res = await fetch(base + path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
    const set = res.headers.getSetCookie();
    for (const c of set) {
      const [pair] = c.split(';');
      if (/Max-Age=0|Expires=Thu, 01 Jan 1970/.test(c)) cookie = ''; else cookie = pair;
    }
    const json = res.headers.get('content-type')?.includes('json') ? await res.json() : await res.text();
    if (json && json.csrfToken) csrf = json.csrfToken;
    return { status: res.status, body: json, headers: res.headers };
  }
  return {
    req,
    get cookie() { return cookie; },
    set cookie(v) { cookie = v; },
    get csrf() { return csrf; },
    set csrf(v) { csrf = v; }
  };
}

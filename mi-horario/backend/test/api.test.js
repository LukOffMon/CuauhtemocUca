import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer, client } from './helpers.js';

import fs from 'node:fs';
import Database from 'better-sqlite3-multiple-ciphers';

let server, base, dbFile, dir;
before(async () => ({ server, base, dbFile, dir } = await startTestServer()));
after(async () => {
  server?.close();
  const { closeDatabase } = await import('../src/db/index.js');
  closeDatabase();
  fs.rmSync(dir, { recursive: true, force: true });
});

const user = { name: 'Ana', email: 'ana@prepa.mx', password: 'contraseña-segura-1', seedDefaults: true };

test('registro, sesión y datos de ejemplo', async () => {
  const c = client(base);
  const r = await c.req('POST', '/api/auth/register', user);
  assert.equal(r.status, 201);
  assert.equal(r.body.user.email, 'ana@prepa.mx');
  assert.ok(c.cookie.startsWith('mh_sid='));
  const setCookie = r.headers.getSetCookie().join(';');
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);

  const b = await c.req('GET', '/api/bootstrap');
  assert.equal(b.status, 200);
  assert.equal(b.body.classes.length, 20);
  assert.equal(b.body.exams.length, 11);
  assert.equal(b.body.tasks.length, 25);
  assert.equal(b.body.data.prefs.theme, 'azul');
});

test('correo duplicado y validación', async () => {
  const c = client(base);
  assert.equal((await c.req('POST', '/api/auth/register', user)).status, 409);
  assert.equal((await c.req('POST', '/api/auth/register', { ...user, email: 'x@y.mx', password: 'corta' })).status, 400);
  assert.equal((await c.req('POST', '/api/auth/register', { ...user, email: 'z@y.mx', admin: true })).status, 400);
});

test('login con contraseña incorrecta no revela si el correo existe', async () => {
  const c = client(base);
  const a = await c.req('POST', '/api/auth/login', { email: 'ana@prepa.mx', password: 'mala' });
  const b = await c.req('POST', '/api/auth/login', { email: 'nadie@prepa.mx', password: 'mala' });
  assert.equal(a.status, 401);
  assert.equal(b.status, 401);
  assert.deepEqual(a.body, b.body);
});

test('sin sesión no hay datos', async () => {
  const c = client(base);
  assert.equal((await c.req('GET', '/api/bootstrap')).status, 401);
});

test('protección CSRF', async () => {
  const c = client(base);
  await c.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  const good = c.csrf;
  c.csrf = '';
  const noToken = await c.req('POST', '/api/classes', { weekday: 1, start: '07:00', end: '08:00', subject: 'X', room: '', color: '#123456' });
  assert.equal(noToken.status, 403);
  c.csrf = good;
  const evil = await c.req('POST', '/api/classes', { weekday: 1, start: '07:00', end: '08:00', subject: 'X', room: '', color: '#123456' }, { origin: 'https://malo.example' });
  assert.equal(evil.status, 403);
  // Formulario de otro sitio (sin JSON)
  const form = await fetch(base + '/api/auth/logout', { method: 'POST', headers: { cookie: c.cookie, 'content-type': 'application/x-www-form-urlencoded' }, body: 'a=1' });
  assert.equal(form.status, 415);
});

test('CRUD de clases y aislamiento entre usuarios', async () => {
  const ana = client(base);
  await ana.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  const created = await ana.req('POST', '/api/classes', { weekday: 6, start: '09:00', end: '10:30', subject: "<img src=x onerror=alert(1)>", room: 'A1', color: '#112233' });
  assert.equal(created.status, 201);
  assert.equal(created.body.start, '09:00');

  const beto = client(base);
  await beto.req('POST', '/api/auth/register', { name: 'Beto', email: 'beto@prepa.mx', password: 'otra-contraseña-2', seedDefaults: false });
  const list = await beto.req('GET', '/api/classes');
  assert.equal(list.body.length, 0);
  assert.equal((await beto.req('PUT', `/api/classes/${created.body.id}`, { weekday: 1, start: '07:00', end: '08:00', subject: 'hack', room: '', color: '#000000' })).status, 404);
  assert.equal((await beto.req('DELETE', `/api/classes/${created.body.id}`, {})).status, 404);
  assert.equal((await ana.req('DELETE', `/api/classes/${created.body.id}`, {})).status, 200);

  const bad = await ana.req('POST', '/api/classes', { weekday: 1, start: '10:00', end: '09:00', subject: 'X', room: '', color: '#123456' });
  assert.equal(bad.status, 400);
  const sqli = await ana.req('PUT', "/api/classes/1%20OR%201=1", { weekday: 1, start: '07:00', end: '08:00', subject: 'X', room: '', color: '#123456' });
  assert.equal(sqli.status, 400);
});

test('tareas, datos cifrados y respaldo', async () => {
  const c = client(base);
  await c.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  const { body } = await c.req('GET', '/api/tasks');
  const t = body[0];
  const done = await c.req('PATCH', `/api/tasks/${t.id}/complete`, { completed: true });
  assert.equal(done.body.completed, true);

  assert.equal((await c.req('PUT', '/api/data/grades', { Filosofía: [90, null, null] })).status, 200);
  assert.equal((await c.req('PUT', '/api/data/grades', { Filosofía: [190, null, null] })).status, 400);
  assert.equal((await c.req('PUT', '/api/data/links', [{ name: 'x', url: 'javascript:alert(1)' }])).status, 400);
  assert.equal((await c.req('PUT', '/api/data/secret', {})).status, 404);

  const exp = await c.req('GET', '/api/export');
  assert.equal(exp.body.app, 'mi-horario');
  assert.deepEqual(exp.body.data.grades, { Filosofía: [90, null, null] });
  const imp = await c.req('POST', '/api/import', exp.body);
  assert.equal(imp.status, 200);
  const after = await c.req('GET', '/api/bootstrap');
  assert.equal(after.body.tasks.length, 25);
  assert.equal(after.body.tasks.filter((x) => x.completed).length, 1);
});

test('los datos sensibles no están en claro en la base', async () => {
  const { getDb } = await import('../src/db/index.js');
  const db = getDb();
  const dump = JSON.stringify([
    db.prepare('SELECT * FROM users').all(),
    db.prepare('SELECT * FROM tasks').all(),
    db.prepare('SELECT * FROM user_data').all()
  ]);
  assert.ok(!dump.includes('ana@prepa.mx'));
  assert.ok(!dump.includes('Filosofía'));
  assert.ok(!dump.includes('Ana'));
});

test('el archivo de la base está cifrado en disco (SQLCipher)', () => {
  const header = fs.readFileSync(dbFile).subarray(0, 16).toString('latin1');
  assert.notEqual(header, 'SQLite format 3\u0000');
  const plain = new Database(dbFile, { readonly: true, fileMustExist: true });
  assert.throws(() => plain.prepare('SELECT * FROM users').all());
  plain.close();
});

test('cambio de contraseña cierra las demás sesiones', async () => {
  const a = client(base);
  const b = client(base);
  await a.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  await b.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  const r = await a.req('POST', '/api/auth/password', { currentPassword: user.password, newPassword: 'nueva-contraseña-123' });
  assert.equal(r.status, 200);
  assert.equal((await a.req('GET', '/api/bootstrap')).status, 200);
  assert.equal((await b.req('GET', '/api/bootstrap')).status, 401);
  user.password = 'nueva-contraseña-123';
});

test('bloqueo tras intentos fallidos', async () => {
  const c = client(base);
  for (let i = 0; i < 5; i++) await c.req('POST', '/api/auth/login', { email: 'beto@prepa.mx', password: 'incorrecta' });
  const r = await c.req('POST', '/api/auth/login', { email: 'beto@prepa.mx', password: 'otra-contraseña-2' });
  assert.equal(r.status, 429);
});

test('cabeceras de seguridad', async () => {
  const r = await fetch(base + '/');
  const csp = r.headers.get('content-security-policy');
  assert.match(csp, /script-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(r.headers.get('x-powered-by'), null);
});

test('borrar cuenta elimina todo', async () => {
  const c = client(base);
  await c.req('POST', '/api/auth/login', { email: user.email, password: user.password });
  assert.equal((await c.req('POST', '/api/auth/delete-account', { password: 'mala' })).status, 400);
  assert.equal((await c.req('POST', '/api/auth/delete-account', { password: user.password })).status, 200);
  assert.equal((await c.req('POST', '/api/auth/login', { email: user.email, password: user.password })).status, 401);
});

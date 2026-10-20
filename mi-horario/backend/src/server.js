import { config, assertConfig } from './config.js';
import { initCrypto } from './security/crypto.js';
import { openDatabase, closeDatabase } from './db/index.js';
import { purgeExpiredSessions } from './security/sessions.js';
import { createApp } from './app.js';

try {
  assertConfig();
  initCrypto(config);
  openDatabase({ file: config.databasePath, hexKey: config.dbEncryptionKey });
} catch (e) {
  console.error('\n✖ ' + e.message + '\n');
  process.exit(1);
}

purgeExpiredSessions();
const purgeTimer = setInterval(purgeExpiredSessions, 60 * 60 * 1000);
purgeTimer.unref();

const server = createApp().listen(config.port, config.host, () => {
  console.log(`✔ Mi Horario escuchando en http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${config.port} (${config.env})`);
});
server.headersTimeout = 30_000;
server.requestTimeout = 30_000;

function shutdown(sig) {
  console.log(`\n${sig} recibido, cerrando…`);
  server.close(() => { closeDatabase(); process.exit(0); });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

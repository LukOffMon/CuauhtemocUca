#!/usr/bin/env node
// Re-cifra todos los campos con la clave actual después de rotar DATA_ENCRYPTION_KEY.
//
// Pasos:
//   1. Haz un respaldo:              npm run backup-db
//   2. En .env mueve la clave vieja a DATA_ENCRYPTION_KEYS_OLD (ej. "k1:base64vieja"),
//      pon una nueva en DATA_ENCRYPTION_KEY y cambia DATA_ENCRYPTION_KEY_ID (ej. "k2").
//   3. Detén la app y ejecuta:       npm run rotate-key
//   4. Cuando termine, ya puedes quitar la clave vieja de DATA_ENCRYPTION_KEYS_OLD.
import { config, assertConfig } from '../backend/src/config.js';
import { initCrypto, decrypt, encrypt, needsReencrypt } from '../backend/src/security/crypto.js';
import { openDatabase, closeDatabase } from '../backend/src/db/index.js';

assertConfig();
initCrypto(config);
const db = openDatabase({ file: config.databasePath, hexKey: config.dbEncryptionKey });

// [tabla, columna llave, columna cifrada, función que arma el AAD a partir de la fila]
const targets = [
  ['users', 'id', 'email_enc', (r) => `users:${r.public_id}:email`],
  ['users', 'id', 'name_enc', (r) => `users:${r.public_id}:name`],
  ['classes', 'id', 'data_enc', (r) => `classes:${r.user_id}:data`],
  ['exams', 'id', 'data_enc', (r) => `exams:${r.user_id}:data`],
  ['tasks', 'id', 'data_enc', (r) => `tasks:${r.user_id}:data`],
  ['sessions', 'id_hash', 'user_agent_enc', (r) => `session:${r.id_hash}:ua`]
];

let total = 0;
db.transaction(() => {
  for (const [table, pk, col, aad] of targets) {
    const upd = db.prepare(`UPDATE ${table} SET ${col} = ? WHERE ${pk} = ?`);
    for (const r of db.prepare(`SELECT * FROM ${table}`).all()) {
      if (!r[col] || !needsReencrypt(r[col])) continue;
      upd.run(encrypt(decrypt(r[col], aad(r)), aad(r)), r[pk]);
      total++;
    }
  }
  const upd = db.prepare('UPDATE user_data SET value_enc = ? WHERE user_id = ? AND key = ?');
  for (const r of db.prepare('SELECT * FROM user_data').all()) {
    if (!needsReencrypt(r.value_enc)) continue;
    const aad = `user_data:${r.user_id}:${r.key}`;
    upd.run(encrypt(decrypt(r.value_enc, aad), aad), r.user_id, r.key);
    total++;
  }
})();
closeDatabase();
console.log(`✔ ${total} valores re-cifrados con la clave "${config.dataKeyId}".`);

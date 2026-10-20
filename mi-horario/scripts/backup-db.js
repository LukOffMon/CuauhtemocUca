#!/usr/bin/env node
// Copia de seguridad consistente de la base cifrada (sigue cifrada con la misma clave).
//   npm run backup-db              → data/backups/mi-horario-AAAAMMDD-HHMM.db
//   npm run backup-db -- ruta.db   → a la ruta indicada
import fs from 'node:fs';
import path from 'node:path';
import { config, assertConfig } from '../backend/src/config.js';
import { openDatabase, closeDatabase } from '../backend/src/db/index.js';

assertConfig();
const d = new Date();
const p = (n) => String(n).padStart(2, '0');
const target = path.resolve(process.argv[2] || path.join(path.dirname(config.databasePath), 'backups',
  `mi-horario-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.db`));
if (fs.existsSync(target)) { console.error('✖ Ya existe ' + target); process.exit(1); }
fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 });

const db = openDatabase({ file: config.databasePath, hexKey: config.dbEncryptionKey });
db.prepare('VACUUM INTO ?').run(target);
closeDatabase();
fs.chmodSync(target, 0o600);

// Verifica que la copia esté cifrada y se pueda abrir con la misma clave.
const header = fs.readFileSync(target).subarray(0, 15).toString('latin1');
if (header === 'SQLite format 3') { fs.rmSync(target); console.error('✖ La copia salió sin cifrar; se eliminó.'); process.exit(1); }
const check = openDatabase({ file: target, hexKey: config.dbEncryptionKey });
const n = check.prepare('SELECT count(*) AS n FROM users').get().n;
closeDatabase();
console.log(`✔ Respaldo cifrado creado: ${target} (${n} usuarios)`);

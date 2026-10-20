// Conexión a SQLite cifrado con SQLCipher (better-sqlite3-multiple-ciphers).
// El archivo completo queda cifrado en disco con AES-256; además los campos
// sensibles van cifrados por separado con AES-256-GCM (defensa en profundidad).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3-multiple-ciphers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let db = null;

export function openDatabase({ file, hexKey }) {
  if (file !== ':memory:') {
    fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  }
  const conn = new Database(file);
  conn.pragma(`cipher = 'sqlcipher'`);
  conn.pragma(`legacy = 4`);
  // La clave se valida antes como 64 caracteres hex, así que no hay riesgo de inyección en el PRAGMA.
  if (!/^[0-9a-fA-F]{64}$/.test(hexKey)) throw new Error('Clave de base de datos inválida.');
  conn.pragma(`key = "x'${hexKey}'"`);

  try {
    conn.prepare('SELECT count(*) FROM sqlite_master').get();
  } catch {
    conn.close();
    throw new Error('No se pudo abrir la base de datos: la clave DB_ENCRYPTION_KEY no coincide o el archivo está dañado.');
  }

  conn.pragma('journal_mode = WAL');
  conn.pragma('foreign_keys = ON');
  conn.pragma('secure_delete = ON');   // sobrescribe con ceros lo que se borra
  conn.pragma('busy_timeout = 5000');

  conn.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
  conn.pragma('user_version = 1');

  if (file !== ':memory:') {
    try { fs.chmodSync(file, 0o600); } catch { /* Windows u otros FS */ }
  }
  db = conn;
  return conn;
}

export function getDb() {
  if (!db) throw new Error('La base de datos no está abierta.');
  return db;
}

export function closeDatabase() {
  if (db) { db.close(); db = null; }
}

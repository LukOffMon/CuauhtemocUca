#!/usr/bin/env node
// Genera claves seguras y crea/actualiza el archivo .env.
//   npm run keys            → crea .env (no sobrescribe claves existentes)
//   npm run keys -- --print → solo imprime claves nuevas (para pegarlas en tu hosting)
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
const examplePath = path.join(root, '.env.example');

const fresh = {
  DB_ENCRYPTION_KEY: crypto.randomBytes(32).toString('hex'),
  DATA_ENCRYPTION_KEY: crypto.randomBytes(32).toString('base64'),
  BLIND_INDEX_KEY: crypto.randomBytes(32).toString('base64')
};

if (process.argv.includes('--print')) {
  for (const [k, v] of Object.entries(fresh)) console.log(`${k}=${v}`);
  process.exit(0);
}

let text = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : fs.readFileSync(examplePath, 'utf8');
const added = [];
for (const [k, v] of Object.entries(fresh)) {
  const re = new RegExp(`^${k}=(.*)$`, 'm');
  const m = text.match(re);
  if (m && m[1].trim()) continue;            // ya tiene valor: no se toca (perderías tus datos)
  text = m ? text.replace(re, `${k}=${v}`) : `${text.trimEnd()}\n${k}=${v}\n`;
  added.push(k);
}
fs.writeFileSync(envPath, text, { mode: 0o600 });
console.log(added.length ? `✔ .env listo. Claves generadas: ${added.join(', ')}` : '✔ .env ya tenía todas las claves; no se cambió nada.');
console.log('⚠ Guarda una copia segura de .env: si pierdes las claves, la base de datos no se puede descifrar.');

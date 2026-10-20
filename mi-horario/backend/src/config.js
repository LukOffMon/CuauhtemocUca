// Configuración central. Todo sale de variables de entorno (ver .env.example).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.resolve(__dirname, '..', '..');

// Carga .env si existe (Node >= 21.7 trae process.loadEnvFile, sin dependencias).
const envFile = process.env.ENV_FILE || path.join(ROOT_DIR, '.env');
if (fs.existsSync(envFile) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envFile);
}

const env = process.env;

function bool(v, fallback) {
  if (v === undefined || v === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(v).toLowerCase());
}
function int(v, fallback, { min = -Infinity, max = Infinity } = {}) {
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

const problems = [];
function required(name) {
  const v = env[name];
  if (!v) problems.push(`Falta la variable ${name}.`);
  return v || '';
}

const isProduction = env.NODE_ENV === 'production';
const appOrigin = (env.APP_ORIGIN || `http://localhost:${env.PORT || 3000}`).replace(/\/+$/, '');

export const config = {
  env: env.NODE_ENV || 'development',
  isProduction,
  isTest: env.NODE_ENV === 'test',
  port: int(env.PORT, 3000, { min: 1, max: 65535 }),
  host: env.HOST || '0.0.0.0',
  appOrigin,
  // Número de proxies de confianza delante de la app (Caddy, Nginx, Render…). 0 = conexión directa.
  trustProxy: int(env.TRUST_PROXY, isProduction ? 1 : 0, { min: 0, max: 10 }),

  databasePath: path.resolve(ROOT_DIR, env.DATABASE_PATH || 'data/mi-horario.db'),
  // Clave de SQLCipher para cifrar el archivo completo de la base de datos (64 caracteres hex = 256 bits).
  dbEncryptionKey: required('DB_ENCRYPTION_KEY'),

  // Cifrado por campo (AES-256-GCM). Clave actual + claves anteriores para rotación.
  dataKeyId: env.DATA_ENCRYPTION_KEY_ID || 'k1',
  dataKey: required('DATA_ENCRYPTION_KEY'),
  dataKeysOld: env.DATA_ENCRYPTION_KEYS_OLD || '', // formato: "k0:base64,kx:base64"
  // HMAC para buscar por correo sin guardarlo en claro (índice ciego).
  blindIndexKey: required('BLIND_INDEX_KEY'),

  bcryptRounds: int(env.BCRYPT_ROUNDS, 12, { min: 10, max: 15 }),
  sessionIdleHours: int(env.SESSION_IDLE_HOURS, 168, { min: 1, max: 24 * 60 }),
  sessionAbsoluteDays: int(env.SESSION_ABSOLUTE_DAYS, 30, { min: 1, max: 365 }),
  maxFailedLogins: int(env.MAX_FAILED_LOGINS, 5, { min: 3, max: 50 }),
  lockoutMinutes: int(env.LOCKOUT_MINUTES, 15, { min: 1, max: 24 * 60 }),

  allowRegistration: bool(env.ALLOW_REGISTRATION, true),
  weatherEnabled: bool(env.WEATHER_ENABLED, true),
  // Zona horaria con la que se crean las fechas del horario de ejemplo (Aguascalientes = -06:00).
  seedTzOffset: env.SEED_TZ_OFFSET || '-06:00',
  logRequests: bool(env.LOG_REQUESTS, !isProduction)
};

export function assertConfig() {
  if (problems.length) {
    const msg = [
      'Configuración incompleta:',
      ...problems.map((p) => '  - ' + p),
      '',
      'Genera las claves con:  npm run keys  (crea/actualiza el archivo .env)'
    ].join('\n');
    throw new Error(msg);
  }
  if (!/^[0-9a-fA-F]{64}$/.test(config.dbEncryptionKey)) {
    throw new Error('DB_ENCRYPTION_KEY debe tener exactamente 64 caracteres hexadecimales (256 bits).');
  }
  if (isProduction && !config.appOrigin.startsWith('https://')) {
    throw new Error('En producción APP_ORIGIN debe empezar con https:// (las cookies de sesión exigen HTTPS).');
  }
}

// Cifrado de campos sensibles con AES-256-GCM (cifrado autenticado).
//
// Formato de cada valor cifrado:  v1.<keyId>.<iv>.<tag>.<ciphertext>   (base64url)
//  - iv aleatorio de 12 bytes por valor (nunca se reutiliza).
//  - AAD ("additional authenticated data") liga el texto cifrado a su contexto
//    (tabla, usuario y campo). Si alguien copia un valor cifrado a otra fila u
//    otro usuario, el descifrado falla en lugar de devolver datos ajenos.
//  - keyId permite rotar claves: se cifra con la actual y se descifra con cualquiera.
import crypto from 'node:crypto';

const VERSION = 'v1';
const keys = new Map();
let currentKeyId = null;
let blindKey = null;

function parseKey(b64, label) {
  const buf = Buffer.from(String(b64 || '').trim(), 'base64');
  if (buf.length !== 32) {
    throw new Error(`${label} debe ser una clave de 32 bytes en base64 (usa: npm run keys).`);
  }
  return buf;
}

export function initCrypto({ dataKeyId, dataKey, dataKeysOld, blindIndexKey }) {
  keys.clear();
  if (!/^[A-Za-z0-9_-]{1,16}$/.test(dataKeyId)) throw new Error('DATA_ENCRYPTION_KEY_ID inválido.');
  keys.set(dataKeyId, parseKey(dataKey, 'DATA_ENCRYPTION_KEY'));
  currentKeyId = dataKeyId;
  for (const pair of String(dataKeysOld || '').split(',').map((s) => s.trim()).filter(Boolean)) {
    const idx = pair.indexOf(':');
    const id = pair.slice(0, idx);
    if (idx < 1 || keys.has(id)) throw new Error('DATA_ENCRYPTION_KEYS_OLD mal formado o con ids repetidos.');
    keys.set(id, parseKey(pair.slice(idx + 1), `DATA_ENCRYPTION_KEYS_OLD (${id})`));
  }
  blindKey = parseKey(blindIndexKey, 'BLIND_INDEX_KEY');
}

export function encrypt(plaintext, aad) {
  if (plaintext === null || plaintext === undefined) return null;
  const key = keys.get(currentKeyId);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(String(aad), 'utf8'));
  const ct = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, currentKeyId, iv.toString('base64url'), tag.toString('base64url'), ct.toString('base64url')].join('.');
}

export function decrypt(token, aad) {
  if (token === null || token === undefined) return null;
  const parts = String(token).split('.');
  if (parts.length !== 5 || parts[0] !== VERSION) throw new Error('Valor cifrado con formato desconocido.');
  const key = keys.get(parts[1]);
  if (!key) throw new Error(`No existe la clave "${parts[1]}" para descifrar.`);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(parts[2], 'base64url'));
  decipher.setAAD(Buffer.from(String(aad), 'utf8'));
  decipher.setAuthTag(Buffer.from(parts[3], 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(parts[4], 'base64url')), decipher.final()]).toString('utf8');
}

export const encryptJSON = (value, aad) => encrypt(JSON.stringify(value), aad);
export function decryptJSON(token, aad, fallback = null) {
  if (token === null || token === undefined) return fallback;
  return JSON.parse(decrypt(token, aad));
}

/** true si el valor fue cifrado con una clave que no es la actual (útil para re-cifrar al rotar). */
export function needsReencrypt(token) {
  return typeof token === 'string' && token.split('.')[1] !== currentKeyId;
}

/** Índice ciego: HMAC-SHA256 determinista para poder buscar (p. ej. correo) sin guardarlo en claro. */
export function blindIndex(value) {
  return crypto.createHmac('sha256', blindKey).update(String(value)).digest('hex');
}

export const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');
export const sha256 = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');

export function safeEqual(a, b) {
  const ba = Buffer.from(String(a ?? ''));
  const bb = Buffer.from(String(b ?? ''));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

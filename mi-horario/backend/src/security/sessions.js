// Sesiones del lado del servidor con cookie HttpOnly.
//  - El navegador solo guarda un token aleatorio de 256 bits; la base guarda su SHA-256.
//    Si alguien roba la base, no puede reutilizar las sesiones.
//  - Expiración por inactividad (deslizante) + expiración absoluta.
//  - Cada sesión tiene su token CSRF (patrón "synchronizer token").
import { config } from '../config.js';
import { getDb } from '../db/index.js';
import { encrypt, randomToken, sha256, safeEqual } from './crypto.js';

export const COOKIE_NAME = config.isProduction ? '__Host-mh_sid' : 'mh_sid';
const HOUR = 3600_000;

function cookieOptions(maxAgeMs) {
  return {
    httpOnly: true,                 // inaccesible para JavaScript (mitiga robo por XSS)
    secure: config.isProduction,    // solo por HTTPS en producción
    sameSite: 'lax',                // no se envía en peticiones POST de otros sitios
    path: '/',
    maxAge: maxAgeMs
  };
}

export function createSession(res, userId, userAgent = '') {
  const db = getDb();
  const token = randomToken(32);
  const idHash = sha256(token);
  const now = Date.now();
  const csrf = randomToken(32);
  const idle = config.sessionIdleHours * HOUR;
  const absolute = now + config.sessionAbsoluteDays * 24 * HOUR;
  db.prepare(
    `INSERT INTO sessions (id_hash, user_id, csrf_token, user_agent_enc, created_at, last_seen_at, expires_at, absolute_expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(idHash, userId, csrf, encrypt(String(userAgent).slice(0, 200), `session:${idHash}:ua`), now, now, Math.min(now + idle, absolute), absolute);
  res.cookie(COOKIE_NAME, token, cookieOptions(Math.min(idle, absolute - now)));
  return { csrfToken: csrf };
}

export function destroySession(req, res) {
  if (req.sessionIdHash) getDb().prepare('DELETE FROM sessions WHERE id_hash = ?').run(req.sessionIdHash);
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(0), maxAge: undefined });
}

export function destroyAllSessions(userId, exceptIdHash = null) {
  getDb().prepare('DELETE FROM sessions WHERE user_id = ? AND id_hash IS NOT ?').run(userId, exceptIdHash);
}

export function purgeExpiredSessions() {
  const now = Date.now();
  return getDb().prepare('DELETE FROM sessions WHERE expires_at < ? OR absolute_expires_at < ?').run(now, now).changes;
}

/** Carga la sesión (si existe) y la deja en req.user / req.csrfToken. No exige login. */
export function loadSession(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token || typeof token !== 'string' || token.length > 100) return next();
  const db = getDb();
  const idHash = sha256(token);
  const row = db
    .prepare(
      `SELECT s.id_hash, s.user_id, s.csrf_token, s.last_seen_at, s.expires_at, s.absolute_expires_at, s.created_at,
              u.public_id, u.password_changed_at
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.id_hash = ?`
    )
    .get(idHash);
  const now = Date.now();
  if (!row || row.expires_at < now || row.absolute_expires_at < now || row.created_at < row.password_changed_at) {
    if (row) db.prepare('DELETE FROM sessions WHERE id_hash = ?').run(idHash);
    res.clearCookie(COOKIE_NAME, { ...cookieOptions(0), maxAge: undefined });
    return next();
  }
  // Desliza la expiración como máximo una vez por minuto para no escribir en cada petición.
  if (now - row.last_seen_at > 60_000) {
    const idle = config.sessionIdleHours * HOUR;
    const newExp = Math.min(now + idle, row.absolute_expires_at);
    db.prepare('UPDATE sessions SET last_seen_at = ?, expires_at = ? WHERE id_hash = ?').run(now, newExp, idHash);
    res.cookie(COOKIE_NAME, token, cookieOptions(newExp - now));
  }
  req.user = { id: row.user_id, publicId: row.public_id };
  req.sessionIdHash = idHash;
  req.csrfToken = row.csrf_token;
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Tu sesión terminó. Inicia sesión de nuevo.' });
  next();
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Protección CSRF en capas para métodos que modifican datos:
 *  1. Cookie SameSite=Lax.
 *  2. Origin / Sec-Fetch-Site deben ser del mismo sitio.
 *  3. Content-Type: application/json obligatorio (un formulario de otro sitio no puede enviarlo sin CORS).
 *  4. Con sesión iniciada: encabezado X-CSRF-Token igual al token de la sesión.
 */
export function csrfProtection(req, res, next) {
  if (SAFE_METHODS.has(req.method)) return next();
  const origin = req.get('origin');
  if (origin && origin !== config.appOrigin) {
    return res.status(403).json({ error: 'Origen no permitido.' });
  }
  const site = req.get('sec-fetch-site');
  if (site && !['same-origin', 'none'].includes(site)) {
    return res.status(403).json({ error: 'Petición entre sitios bloqueada.' });
  }
  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Se esperaba JSON.' });
  }
  if (req.user && !safeEqual(req.get('x-csrf-token'), req.csrfToken)) {
    return res.status(403).json({ error: 'Token de seguridad inválido. Recarga la página.' });
  }
  next();
}

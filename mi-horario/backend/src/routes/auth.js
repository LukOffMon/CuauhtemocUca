import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { getDb } from '../db/index.js';
import { seedUser } from '../db/seed-data.js';
import { userData } from '../db/repo.js';
import { encrypt, decrypt, blindIndex, randomToken } from '../security/crypto.js';
import { createSession, destroySession, destroyAllSessions, requireAuth } from '../security/sessions.js';
import {
  validateBody, registerSchema, loginSchema, changePasswordSchema, deleteAccountSchema, profileSchema
} from '../security/validate.js';
import { authLimiter } from '../middleware/rate-limit.js';

const router = Router();

// Hash de relleno: si el correo no existe igual se ejecuta bcrypt, así el tiempo de
// respuesta no revela qué correos están registrados.
const DUMMY_HASH = bcrypt.hashSync(randomToken(16), config.bcryptRounds);

const emailAad = (publicId) => `users:${publicId}:email`;
const nameAad = (publicId) => `users:${publicId}:name`;

export function publicUser(row) {
  return {
    id: row.public_id,
    email: decrypt(row.email_enc, emailAad(row.public_id)),
    name: row.name_enc ? decrypt(row.name_enc, nameAad(row.public_id)) : '',
    createdAt: row.created_at
  };
}
const getUserRow = (id) => getDb().prepare('SELECT * FROM users WHERE id = ?').get(id);

router.post('/register', authLimiter, validateBody(registerSchema), async (req, res) => {
  if (!config.allowRegistration) return res.status(403).json({ error: 'El registro de cuentas nuevas está desactivado.' });
  const { name, email, password, seedDefaults } = req.valid;
  const db = getDb();
  const index = blindIndex(email);
  if (db.prepare('SELECT 1 FROM users WHERE email_index = ?').get(index)) {
    return res.status(409).json({ error: 'Ya existe una cuenta con ese correo. Inicia sesión.', field: 'email' });
  }
  const hash = await bcrypt.hash(password, config.bcryptRounds);
  const publicId = randomToken(12);
  const now = Date.now();
  const info = db
    .prepare(
      `INSERT INTO users (public_id, email_index, email_enc, name_enc, password_hash, password_changed_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(publicId, index, encrypt(email, emailAad(publicId)), encrypt(name, nameAad(publicId)), hash, now - 1, now, now);
  const userId = Number(info.lastInsertRowid);
  if (seedDefaults) seedUser(userId);
  userData.set(userId, 'prefs', userData.get(userId, 'prefs'));
  const { csrfToken } = createSession(res, userId, req.get('user-agent'));
  res.status(201).json({ user: publicUser(getUserRow(userId)), csrfToken });
});

router.post('/login', authLimiter, validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.valid;
  const db = getDb();
  const row = db.prepare('SELECT * FROM users WHERE email_index = ?').get(blindIndex(email));
  const now = Date.now();
  const generic = { error: 'Correo o contraseña incorrectos.' };

  if (!row) {
    await bcrypt.compare(password, DUMMY_HASH);
    return res.status(401).json(generic);
  }
  if (row.locked_until && row.locked_until > now) {
    const mins = Math.ceil((row.locked_until - now) / 60000);
    return res.status(429).json({ error: `Demasiados intentos fallidos. Intenta de nuevo en ${mins} min.` });
  }
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) {
    const fails = row.failed_logins + 1;
    const lock = fails >= config.maxFailedLogins ? now + config.lockoutMinutes * 60000 : null;
    db.prepare('UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?').run(lock ? 0 : fails, lock, row.id);
    return res.status(401).json(generic);
  }
  db.prepare('UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?').run(row.id);
  // Re-hash transparente si se subió el costo de bcrypt.
  if (bcrypt.getRounds(row.password_hash) < config.bcryptRounds) {
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(await bcrypt.hash(password, config.bcryptRounds), row.id);
  }
  // Sesión nueva en cada inicio (evita fijación de sesión).
  if (req.sessionIdHash) destroySession(req, res);
  const { csrfToken } = createSession(res, row.id, req.get('user-agent'));
  res.json({ user: publicUser(row), csrfToken });
});

router.get('/me', (req, res) => {
  if (!req.user) return res.json({ user: null, registrationOpen: config.allowRegistration });
  res.json({ user: publicUser(getUserRow(req.user.id)), csrfToken: req.csrfToken });
});

router.post('/logout', (req, res) => {
  destroySession(req, res);
  res.json({ ok: true });
});

router.post('/logout-all', requireAuth, (req, res) => {
  destroyAllSessions(req.user.id);
  destroySession(req, res);
  res.json({ ok: true });
});

router.put('/profile', requireAuth, validateBody(profileSchema), (req, res) => {
  const row = getUserRow(req.user.id);
  getDb().prepare('UPDATE users SET name_enc = ?, updated_at = ? WHERE id = ?')
    .run(encrypt(req.valid.name, nameAad(row.public_id)), Date.now(), row.id);
  res.json({ user: publicUser(getUserRow(row.id)) });
});

router.post('/password', authLimiter, requireAuth, validateBody(changePasswordSchema), async (req, res) => {
  const row = getUserRow(req.user.id);
  if (!(await bcrypt.compare(req.valid.currentPassword, row.password_hash))) {
    return res.status(400).json({ error: 'La contraseña actual no es correcta.', field: 'currentPassword' });
  }
  const now = Date.now();
  getDb().prepare('UPDATE users SET password_hash = ?, password_changed_at = ?, updated_at = ? WHERE id = ?')
    .run(await bcrypt.hash(req.valid.newPassword, config.bcryptRounds), now, now, row.id);
  // Cierra todas las sesiones (incluida esta) y abre una nueva.
  destroyAllSessions(row.id);
  const { csrfToken } = createSession(res, row.id, req.get('user-agent'));
  res.json({ ok: true, csrfToken });
});

router.post('/delete-account', authLimiter, requireAuth, validateBody(deleteAccountSchema), async (req, res) => {
  const row = getUserRow(req.user.id);
  if (!(await bcrypt.compare(req.valid.password, row.password_hash))) {
    return res.status(400).json({ error: 'La contraseña no es correcta.', field: 'password' });
  }
  destroySession(req, res);
  getDb().prepare('DELETE FROM users WHERE id = ?').run(row.id); // ON DELETE CASCADE borra todo lo demás
  res.json({ ok: true });
});

export default router;

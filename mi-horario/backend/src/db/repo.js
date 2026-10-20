// Acceso a datos. TODAS las consultas usan sentencias preparadas con parámetros
// (nunca se concatena texto del usuario en SQL) y TODAS filtran por user_id,
// así un usuario jamás puede leer ni tocar filas de otro.
import { getDb } from './index.js';
import { encryptJSON, decryptJSON } from '../security/crypto.js';
import { dataSchemas, defaultPrefs } from '../security/validate.js';

const aad = (table, userId, field = 'data') => `${table}:${userId}:${field}`;
const now = () => Date.now();

const pad = (n) => String(n).padStart(2, '0');
const minToHHMM = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

// ---------------- Clases ----------------
function classOut(r) {
  const d = decryptJSON(r.data_enc, aad('classes', r.user_id));
  return { id: r.id, weekday: r.weekday, start: minToHHMM(r.start_min), end: minToHHMM(r.end_min), ...d };
}
export const classes = {
  list(userId) {
    return getDb().prepare('SELECT * FROM classes WHERE user_id = ? ORDER BY weekday, start_min').all(userId).map(classOut);
  },
  create(userId, c) {
    const t = now();
    const info = getDb()
      .prepare('INSERT INTO classes (user_id, weekday, start_min, end_min, data_enc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(userId, c.weekday, c.startMin, c.endMin, encryptJSON({ subject: c.subject, room: c.room, color: c.color }, aad('classes', userId)), t, t);
    return this.get(userId, info.lastInsertRowid);
  },
  get(userId, id) {
    const r = getDb().prepare('SELECT * FROM classes WHERE id = ? AND user_id = ?').get(id, userId);
    return r ? classOut(r) : null;
  },
  update(userId, id, c) {
    const info = getDb()
      .prepare('UPDATE classes SET weekday = ?, start_min = ?, end_min = ?, data_enc = ?, updated_at = ? WHERE id = ? AND user_id = ?')
      .run(c.weekday, c.startMin, c.endMin, encryptJSON({ subject: c.subject, room: c.room, color: c.color }, aad('classes', userId)), now(), id, userId);
    return info.changes ? this.get(userId, id) : null;
  },
  remove(userId, id) {
    return getDb().prepare('DELETE FROM classes WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
  }
};

// ---------------- Exámenes ----------------
function examOut(r) {
  const d = decryptJSON(r.data_enc, aad('exams', r.user_id));
  return { id: r.id, startsAt: r.starts_at, endsAt: r.ends_at, ...d };
}
const examData = (e) => ({ subject: e.subject, room: e.room, color: e.color, notes: e.notes || '' });
export const exams = {
  list(userId) {
    return getDb().prepare('SELECT * FROM exams WHERE user_id = ? ORDER BY starts_at').all(userId).map(examOut);
  },
  get(userId, id) {
    const r = getDb().prepare('SELECT * FROM exams WHERE id = ? AND user_id = ?').get(id, userId);
    return r ? examOut(r) : null;
  },
  create(userId, e) {
    const t = now();
    const info = getDb()
      .prepare('INSERT INTO exams (user_id, starts_at, ends_at, data_enc, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(userId, e.startsAt, e.endsAt, encryptJSON(examData(e), aad('exams', userId)), t, t);
    return this.get(userId, info.lastInsertRowid);
  },
  update(userId, id, e) {
    const info = getDb()
      .prepare('UPDATE exams SET starts_at = ?, ends_at = ?, data_enc = ?, updated_at = ? WHERE id = ? AND user_id = ?')
      .run(e.startsAt, e.endsAt, encryptJSON(examData(e), aad('exams', userId)), now(), id, userId);
    return info.changes ? this.get(userId, id) : null;
  },
  remove(userId, id) {
    return getDb().prepare('DELETE FROM exams WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
  }
};

// ---------------- Tareas ----------------
function taskOut(r) {
  const d = decryptJSON(r.data_enc, aad('tasks', r.user_id));
  return {
    id: r.id, kind: r.kind, opensAt: r.opens_at, dueAt: r.due_at, finalDueAt: r.final_due_at,
    completed: r.completed_at !== null, completedAt: r.completed_at, ...d
  };
}
const taskData = (t) => ({ subject: t.subject, title: t.title, color: t.color, link: t.link || '' });
export const tasks = {
  list(userId) {
    return getDb().prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY due_at').all(userId).map(taskOut);
  },
  get(userId, id) {
    const r = getDb().prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, userId);
    return r ? taskOut(r) : null;
  },
  create(userId, t, completedAt = null) {
    const ts = now();
    const info = getDb()
      .prepare(
        `INSERT INTO tasks (user_id, kind, opens_at, due_at, final_due_at, completed_at, data_enc, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(userId, t.kind, t.opensAt, t.dueAt, t.finalDueAt ?? null, completedAt, encryptJSON(taskData(t), aad('tasks', userId)), ts, ts);
    return this.get(userId, info.lastInsertRowid);
  },
  update(userId, id, t) {
    const info = getDb()
      .prepare('UPDATE tasks SET kind = ?, opens_at = ?, due_at = ?, final_due_at = ?, data_enc = ?, updated_at = ? WHERE id = ? AND user_id = ?')
      .run(t.kind, t.opensAt, t.dueAt, t.finalDueAt ?? null, encryptJSON(taskData(t), aad('tasks', userId)), now(), id, userId);
    return info.changes ? this.get(userId, id) : null;
  },
  setCompleted(userId, id, completed) {
    const info = getDb()
      .prepare('UPDATE tasks SET completed_at = ?, updated_at = ? WHERE id = ? AND user_id = ?')
      .run(completed ? now() : null, now(), id, userId);
    return info.changes ? this.get(userId, id) : null;
  },
  remove(userId, id) {
    return getDb().prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?').run(id, userId).changes > 0;
  }
};

// ---------------- Datos JSON por usuario ----------------
const DEFAULTS = {
  prefs: defaultPrefs,
  grades: () => ({}),
  absences: () => ({}),
  notes: () => ({}),
  links: () => [],
  pomodoro: () => ({ date: '1970-01-01', count: 0 })
};
export const userData = {
  get(userId, key) {
    const r = getDb().prepare('SELECT value_enc FROM user_data WHERE user_id = ? AND key = ?').get(userId, key);
    if (!r) return DEFAULTS[key]();
    const value = decryptJSON(r.value_enc, aad('user_data', userId, key));
    // Completa con valores por defecto si se agregaron campos nuevos a las preferencias.
    if (key === 'prefs') return dataSchemas.prefs.parse({ ...defaultPrefs(), ...value });
    return value;
  },
  all(userId) {
    return Object.fromEntries(Object.keys(DEFAULTS).map((k) => [k, this.get(userId, k)]));
  },
  set(userId, key, value) {
    getDb()
      .prepare(
        `INSERT INTO user_data (user_id, key, value_enc, updated_at) VALUES (?, ?, ?, ?)
         ON CONFLICT(user_id, key) DO UPDATE SET value_enc = excluded.value_enc, updated_at = excluded.updated_at`
      )
      .run(userId, key, encryptJSON(value, aad('user_data', userId, key)), now());
    return value;
  }
};

export function wipeUserContent(userId) {
  const db = getDb();
  db.prepare('DELETE FROM classes WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM exams WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM tasks WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_data WHERE user_id = ?').run(userId);
}

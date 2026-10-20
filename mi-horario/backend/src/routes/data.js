// API de datos del alumno (requiere sesión). Todo pasa por validación estricta.
import { Router } from 'express';
import { getDb } from '../db/index.js';
import { classes, exams, tasks, userData, wipeUserContent } from '../db/repo.js';
import { publicUser } from './auth.js';
import { seedUser } from '../db/seed-data.js';
import {
  validateBody, idParam, classSchema, examSchema, taskSchema, completeSchema, dataSchemas, DATA_KEYS, importSchema
} from '../security/validate.js';

const router = Router();
const APP_VERSION = '3.0.0';

const notFound = (res) => res.status(404).json({ error: 'No se encontró ese elemento.' });

// Todo lo necesario para pintar la app en una sola petición.
router.get('/bootstrap', (req, res) => {
  const uid = req.user.id;
  const row = getDb().prepare('SELECT * FROM users WHERE id = ?').get(uid);
  res.json({
    user: publicUser(row),
    classes: classes.list(uid),
    exams: exams.list(uid),
    tasks: tasks.list(uid),
    data: userData.all(uid),
    serverTime: Date.now()
  });
});

// CRUD genérico para clases, exámenes y tareas.
function crud(path, repo, schema) {
  router.get(`/${path}`, (req, res) => res.json(repo.list(req.user.id)));
  router.post(`/${path}`, validateBody(schema), (req, res) => {
    const count = getDb().prepare(`SELECT count(*) AS n FROM ${path} WHERE user_id = ?`).get(req.user.id).n; // path es fijo, no viene del usuario
    if (count >= 1000) return res.status(400).json({ error: 'Llegaste al máximo de elementos permitidos.' });
    res.status(201).json(repo.create(req.user.id, req.valid));
  });
  router.put(`/${path}/:id`, validateBody(schema), (req, res) => {
    const item = repo.update(req.user.id, idParam(req.params.id), req.valid);
    return item ? res.json(item) : notFound(res);
  });
  router.delete(`/${path}/:id`, (req, res) => {
    return repo.remove(req.user.id, idParam(req.params.id)) ? res.json({ ok: true }) : notFound(res);
  });
}
crud('classes', classes, classSchema);
crud('exams', exams, examSchema);
crud('tasks', tasks, taskSchema);

router.patch('/tasks/:id/complete', validateBody(completeSchema), (req, res) => {
  const item = tasks.setCompleted(req.user.id, idParam(req.params.id), req.valid.completed);
  return item ? res.json(item) : notFound(res);
});

// prefs, grades, absences, notes, links, pomodoro
router.get('/data/:key', (req, res) => {
  if (!DATA_KEYS.includes(req.params.key)) return notFound(res);
  res.json(userData.get(req.user.id, req.params.key));
});
router.put('/data/:key', (req, res, next) => {
  const key = req.params.key;
  if (!DATA_KEYS.includes(key)) return notFound(res);
  return validateBody(dataSchemas[key])(req, res, (err) => {
    if (err) return next(err);
    res.json(userData.set(req.user.id, key, req.valid));
  });
});

// Respaldo completo (descifrado) para descargar.
router.get('/export', (req, res) => {
  const uid = req.user.id;
  const row = getDb().prepare('SELECT * FROM users WHERE id = ?').get(uid);
  const strip = ({ id, ...rest }) => rest;
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  res.set('Content-Disposition', `attachment; filename="mi-horario-respaldo-${stamp}.json"`);
  res.set('Cache-Control', 'no-store');
  res.json({
    app: 'mi-horario',
    version: APP_VERSION,
    exportedAt: d.toISOString(),
    profile: { name: publicUser(row).name },
    classes: classes.list(uid).map(({ id, start, end, ...c }) => ({ ...c, start, end })),
    exams: exams.list(uid).map(strip),
    tasks: tasks.list(uid).map(({ id, completedAt, ...t }) => t),
    data: userData.all(uid)
  });
});

// Restaurar respaldo: reemplaza todo el contenido. Cada elemento se valida por separado.
router.post('/import', validateBody(importSchema), (req, res) => {
  const uid = req.user.id;
  const backup = req.valid;
  const parsed = { classes: [], exams: [], tasks: [], data: {} };
  try {
    parsed.classes = backup.classes.map((c) => classSchema.parse(c));
    parsed.exams = backup.exams.map((e) => examSchema.parse(e));
    parsed.tasks = backup.tasks.map(({ completed, ...t }) => ({ t: taskSchema.parse(t), completed: completed === true }));
    for (const key of DATA_KEYS) {
      if (backup.data[key] !== undefined) parsed.data[key] = dataSchemas[key].parse(backup.data[key]);
    }
  } catch {
    return res.status(400).json({ error: 'El respaldo tiene datos inválidos o dañados. No se cambió nada.' });
  }
  getDb().transaction(() => {
    wipeUserContent(uid);
    parsed.classes.forEach((c) => classes.create(uid, c));
    parsed.exams.forEach((e) => exams.create(uid, e));
    parsed.tasks.forEach(({ t, completed }) => tasks.create(uid, t, completed ? Date.now() : null));
    Object.entries(parsed.data).forEach(([k, v]) => userData.set(uid, k, v));
  })();
  res.json({ ok: true });
});

// Cargar el horario de ejemplo de 5A INF (reemplaza clases, exámenes y tareas; conserva notas y calificaciones).
router.post('/seed-defaults', (req, res) => {
  const uid = req.user.id;
  const db = getDb();
  db.transaction(() => {
    ['classes', 'exams', 'tasks'].forEach((t) => db.prepare(`DELETE FROM ${t} WHERE user_id = ?`).run(uid));
    seedUser(uid);
  })();
  res.json({ ok: true });
});

// Vaciar contenido (conserva la cuenta).
router.post('/reset', (req, res) => {
  getDb().transaction(() => wipeUserContent(req.user.id))();
  res.json({ ok: true });
});

export default router;

// Validación estricta de todo lo que entra a la API (zod).
// Objetos estrictos: cualquier campo inesperado se rechaza.
import { z } from 'zod';

// Mensajes de error en español por defecto.
z.config(z.locales.es());

const text = (max, min = 0) =>
  z.string().trim()
    .min(min, min === 1 ? 'Este campo es obligatorio.' : `Escribe al menos ${min} caracteres.`)
    .max(max, `Máximo ${max} caracteres.`);
const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Hora inválida (usa HH:MM).');
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Color inválido.');
const epoch = z.number({ error: 'Fecha y hora obligatorias.' }).int().min(946684800000, 'Fecha inválida.').max(4102444800000, 'Fecha inválida.'); // 2000–2100
const dateKey = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const httpUrl = z
  .string()
  .trim()
  .max(500)
  .refine((u) => {
    try {
      const p = new URL(u);
      return (p.protocol === 'https:' || p.protocol === 'http:') && p.hostname.includes('.') && !p.username && !p.password;
    } catch { return false; }
  }, 'Enlace inválido: debe empezar con https://');

const optionalUrl = z.union([z.literal(''), httpUrl]);

const toMin = (s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));

// ---------- Autenticación ----------
const email = z.string().trim().toLowerCase().max(254).pipe(z.email('Correo inválido.'));
const password = z
  .string()
  .min(10, 'La contraseña debe tener al menos 10 caracteres.')
  .refine((p) => Buffer.byteLength(p, 'utf8') <= 72, 'La contraseña es demasiado larga (máximo 72 bytes).');

export const registerSchema = z.strictObject({
  name: text(40),
  email,
  password,
  seedDefaults: z.boolean().default(true)
});
export const loginSchema = z.strictObject({ email, password: z.string().min(1).max(200) });
export const changePasswordSchema = z.strictObject({ currentPassword: z.string().min(1).max(200), newPassword: password });
export const deleteAccountSchema = z.strictObject({ password: z.string().min(1).max(200) });
export const profileSchema = z.strictObject({ name: text(40) });

// ---------- Horario ----------
export const classSchema = z
  .strictObject({
    weekday: z.number().int().min(0).max(6),
    start: hhmm,
    end: hhmm,
    subject: text(80, 1),
    room: text(30),
    color
  })
  .refine((c) => toMin(c.end) > toMin(c.start), { message: 'La hora de fin debe ser posterior al inicio.', path: ['end'] })
  .transform((c) => ({ ...c, startMin: toMin(c.start), endMin: toMin(c.end) }));

export const examSchema = z
  .strictObject({
    startsAt: epoch,
    endsAt: epoch,
    subject: text(80, 1),
    room: text(30),
    color,
    notes: text(500).default('')
  })
  .refine((e) => e.endsAt > e.startsAt, { message: 'El examen debe terminar después de empezar.', path: ['endsAt'] });

export const taskSchema = z
  .strictObject({
    kind: z.enum(['moodle', 'aleks', 'otra']),
    subject: text(80, 1),
    title: text(200, 1),
    color,
    link: optionalUrl.default(''),
    opensAt: epoch,
    dueAt: epoch,
    finalDueAt: epoch.nullable().default(null)
  })
  .refine((t) => t.dueAt >= t.opensAt, { message: 'La entrega no puede ser antes de que abra.', path: ['dueAt'] })
  .refine((t) => t.finalDueAt === null || t.finalDueAt >= t.dueAt, { message: 'El plazo extra debe ser posterior al cierre.', path: ['finalDueAt'] });

export const completeSchema = z.strictObject({ completed: z.boolean() });

// ---------- Datos por usuario (JSON cifrado) ----------
const subjectKey = text(80, 1);
const THEMES = ['azul', 'verde', 'morado', 'rosa', 'naranja', 'aurora', 'atardecer', 'neon', 'oceano', 'galaxia', 'lava', 'grafito'];

export const dataSchemas = {
  prefs: z.strictObject({
    theme: z.enum(THEMES).default('azul'),
    mode: z.enum(['light', 'dark', 'auto']).default('auto'),
    moodleUrl: optionalUrl.default(''),
    sound: z.boolean().default(true),
    notifications: z.boolean().default(false),
    passMin: z.number().min(0).max(100).default(70),
    absLimit: z.number().int().min(1).max(99).default(6),
    recess: z.strictObject({ start: hhmm, end: hhmm }).nullable().default({ start: '10:40', end: '11:30' }),
    examDaysReplaceClasses: z.boolean().default(true),
    semesterWeeks: z.number().int().min(1).max(40).default(10),
    location: z
      .strictObject({ lat: z.number().min(-90).max(90), lon: z.number().min(-180).max(180), label: text(40) })
      .nullable()
      .default(null)
  }),
  grades: z.record(subjectKey, z.array(z.number().min(0).max(100).nullable()).length(3)).refine((o) => Object.keys(o).length <= 40),
  absences: z.record(subjectKey, z.number().int().min(0).max(999)).refine((o) => Object.keys(o).length <= 40),
  notes: z.record(subjectKey, z.string().max(10000)).refine((o) => Object.keys(o).length <= 40),
  links: z.array(z.strictObject({ name: text(40, 1), url: httpUrl })).max(30),
  pomodoro: z.strictObject({ date: dateKey, count: z.number().int().min(0).max(500) })
};
export const DATA_KEYS = Object.keys(dataSchemas);
export const defaultPrefs = () => dataSchemas.prefs.parse({});

export const importSchema = z.strictObject({
  app: z.literal('mi-horario'),
  version: z.string().max(20),
  exportedAt: z.string().max(40).optional(),
  profile: z.strictObject({ name: text(40) }).optional(),
  classes: z.array(z.any()).max(200).default([]),
  exams: z.array(z.any()).max(200).default([]),
  tasks: z.array(z.any()).max(1000).default([]),
  data: z.record(z.string(), z.any()).default({})
});

/** Middleware: valida req.body con el esquema y deja el resultado limpio en req.valid. */
export const validateBody = (schema) => (req, _res, next) => {
  const r = schema.safeParse(req.body ?? {});
  if (!r.success) {
    const issue = r.error.issues[0];
    const err = new Error(issue?.message || 'Datos inválidos.');
    err.status = 400;
    err.field = issue?.path?.join('.') || undefined;
    return next(err);
  }
  req.valid = r.data;
  next();
};

export const idParam = (raw) => {
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < 1) {
    const err = new Error('Identificador inválido.');
    err.status = 400;
    throw err;
  }
  return n;
};

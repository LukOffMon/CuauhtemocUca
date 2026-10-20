// Lógica del horario: qué toca ahora, qué sigue y qué tan urgente es cada entrega.
import { state } from '../store.js';
import { toMin, minToHHMM, startOfDay, addDays, sameDay, atMinutes, nowMin, HOUR } from './time.js';

export function examsOn(date) {
  return state.exams.filter((e) => sameDay(e.startsAt, date)).sort((a, b) => a.startsAt - b.startsAt);
}

/** Bloques de un día: exámenes si ese día hay examen (y la preferencia está activa), si no, clases. */
export function itemsForDate(date) {
  const exams = examsOn(date);
  const replace = state.data.prefs.examDaysReplaceClasses !== false;
  const examItems = exams.map((e) => {
    const s = new Date(e.startsAt), en = new Date(e.endsAt);
    const sm = s.getHours() * 60 + s.getMinutes();
    const em = sameDay(s, en) ? en.getHours() * 60 + en.getMinutes() : 1440;
    return { key: 'e' + e.id, isExam: true, ref: e, subject: e.subject, room: e.room, color: e.color, startMin: sm, endMin: em, start: minToHHMM(sm), end: minToHHMM(Math.min(em, 1439)) };
  });
  if (exams.length && replace) return examItems;
  const wd = new Date(date).getDay();
  const classItems = state.classes
    .filter((c) => c.weekday === wd)
    .map((c) => ({ key: 'c' + c.id, isExam: false, ref: c, subject: c.subject, room: c.room, color: c.color, startMin: toMin(c.start), endMin: toMin(c.end), start: c.start, end: c.end }));
  return [...classItems, ...(replace ? [] : examItems)].sort((a, b) => a.startMin - b.startMin);
}

export const isExamDay = (date) => examsOn(date).length > 0 && state.data.prefs.examDaysReplaceClasses !== false;

export function recessFor(date) {
  const r = state.data.prefs.recess;
  if (!r || isExamDay(date)) return null;
  const wd = new Date(date).getDay();
  if (!state.classes.some((c) => c.weekday === wd)) return null;
  return { startMin: toMin(r.start), endMin: toMin(r.end), start: r.start, end: r.end };
}

/** Siguiente bloque a partir de ahora (hasta 21 días adelante). */
export function nextItem(now = new Date()) {
  const nm = nowMin(now);
  for (let off = 0; off <= 21; off++) {
    const day = addDays(startOfDay(now), off);
    const items = itemsForDate(day);
    const found = items.find((it) => off > 0 || it.startMin > nm);
    if (found) return { item: found, day, at: atMinutes(day, found.startMin) };
  }
  return null;
}

/**
 * Estado actual:
 *  class | recess | before | gap | after | weekend | free
 */
export function currentStatus(now = new Date()) {
  const items = itemsForDate(now);
  const nm = nowMin(now);
  const next = nextItem(now);
  const dow = now.getDay();
  const recess = recessFor(now);
  if (!items.length) return { state: dow === 0 || dow === 6 ? 'weekend' : 'free', items, next };
  if (recess && nm >= recess.startMin && nm < recess.endMin) return { state: 'recess', items, recess, next };
  const cur = items.find((it) => nm >= it.startMin && nm < it.endMin);
  if (cur) return { state: 'class', items, current: cur, next };
  if (nm < items[0].startMin) return { state: 'before', items, next };
  if (items.some((it) => it.startMin > nm)) return { state: 'gap', items, next };
  return { state: 'after', items, next };
}

// ---------- Entregas ----------
export function effective(t, now = Date.now()) {
  const inExtra = t.kind === 'aleks' && t.finalDueAt && now > t.dueAt;
  return { ...t, due: inExtra ? t.finalDueAt : t.dueAt, inExtra: Boolean(inExtra) };
}
export function deadlines(now = Date.now()) {
  return state.tasks.map((t) => effective(t, now)).sort((a, b) => a.due - b.due);
}
export const pending = (now = Date.now()) => deadlines(now).filter((d) => !d.completed);
export const openPending = (now = Date.now()) => pending(now).filter((d) => d.opensAt <= now);

/** ok > 72 h, warn < 72 h, hot < 24 h, crit < 3 h, over vencida */
export function level(ms) {
  if (ms <= 0) return 'over';
  const h = ms / HOUR;
  if (h < 3) return 'crit';
  if (h < 24) return 'hot';
  if (h < 72) return 'warn';
  return 'ok';
}

export function nextDeadline(now = Date.now()) {
  return openPending(now).find((d) => d.due > now) || pending(now).find((d) => d.due > now) || null;
}

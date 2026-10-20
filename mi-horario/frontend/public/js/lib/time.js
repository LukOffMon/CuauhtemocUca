export const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
export const HOUR = 3600_000;
export const DAY = 24 * HOUR;

export const pad = (n) => String(n).padStart(2, '0');
export const toMin = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
export const minToHHMM = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
export const nowMin = (d = new Date()) => d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;

export const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
export const sameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const atMinutes = (day, mins) => { const x = startOfDay(day); x.setMinutes(mins); return x; };

/** Lunes de la semana de la fecha dada. */
export function mondayOf(d) {
  const x = startOfDay(d);
  const dow = x.getDay();
  return addDays(x, dow === 0 ? -6 : 1 - dow);
}

export function fmtDuration(ms) {
  const s = Math.floor(Math.abs(ms) / 1000);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (d > 0) return `${d} d ${h} h`;
  if (h > 0) return `${h} h ${pad(m)} min`;
  return `${m}:${pad(sec)} min`;
}
export function fmtMinutes(mins) {
  mins = Math.max(0, Math.round(mins));
  const h = Math.floor(mins / 60), m = mins % 60;
  if (h && m) return `${h} h ${m} min`;
  if (h) return `${h} h`;
  return `${m} min`;
}

const loc = 'es-MX';
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const fmtDate = (ms) => new Date(ms).toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtDateLong = (ms) => cap(new Date(ms).toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' }));
export const fmtTime = (ms) => new Date(ms).toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit', hour12: false });
export const fmtDateTime = (ms) => `${fmtDate(ms)}, ${fmtTime(ms)}`;
export const todayLabel = () => cap(new Date().toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));

/** Para <input type="datetime-local">: ms → "2026-10-19T07:00". */
export function toLocalInput(ms) {
  const d = new Date(ms);
  return `${dateKey(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function fromLocalInput(v) {
  if (!v) return null;
  const ms = new Date(v).getTime();
  return Number.isNaN(ms) ? null : ms;
}
export function relativeDay(ms) {
  const diff = Math.round((startOfDay(ms) - startOfDay(new Date())) / DAY);
  if (diff === 0) return 'hoy';
  if (diff === 1) return 'mañana';
  if (diff === -1) return 'ayer';
  return fmtDateLong(ms).toLowerCase();
}

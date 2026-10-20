// Exportación a calendario (.ics) para Google Calendar, Apple Calendar u Outlook.
import { state } from './store.js';
import { pending } from './lib/schedule.js';
import { pad, toMin, startOfDay, addDays } from './lib/time.js';
import { downloadFile, toast } from './ui.js';

const escape = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const utc = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
const stamp = () => utc(Date.now());

// Las líneas de más de 75 octetos se deben "doblar" (RFC 5545).
function fold(line) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out = [];
  let cur = '';
  let len = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (len + n > (out.length ? 74 : 75)) { out.push(cur); cur = ''; len = 0; }
    cur += ch;
    len += n;
  }
  out.push(cur);
  return out.join('\r\n ');
}
const wrap = (events) =>
  ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mi Horario Escolar//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...events.flat(), 'END:VCALENDAR']
    .map(fold).join('\r\n') + '\r\n';
const alarm = (trigger, text) => ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escape(text)}`, `TRIGGER:${trigger}`, 'END:VALARM'];

export function exportDeadlines() {
  const list = pending().filter((d) => d.due > Date.now());
  if (!list.length) return toast('No hay entregas pendientes por exportar.', 'warn');
  const events = list.map((d) => {
    const name = `${d.subject}: ${d.title}`;
    return ['BEGIN:VEVENT', `UID:tarea-${d.id}-${d.due}@mi-horario`, `DTSTAMP:${stamp()}`,
      `DTSTART:${utc(d.due)}`, `DTEND:${utc(d.due + 15 * 60_000)}`,
      `SUMMARY:${escape('Entrega: ' + name)}`,
      `DESCRIPTION:${escape('Márcala como entregada en Mi Horario cuando la termines.')}`,
      ...alarm('-P1D', 'Mañana vence: ' + name), ...alarm('-PT3H', 'En 3 horas vence: ' + name), ...alarm('-PT30M', 'En 30 minutos vence: ' + name),
      'END:VEVENT'];
  });
  downloadFile('entregas-pendientes.ics', wrap(events), 'text/calendar');
  toast('Calendario descargado. Ábrelo para agregar tus entregas.', 'ok');
}

export function exportClasses() {
  if (!state.classes.length) return toast('Aún no tienes clases en tu horario.', 'warn');
  const weeks = state.data.prefs.semesterWeeks || 10;
  const local = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const events = state.classes.map((c) => {
    let first = startOfDay(new Date());
    while (first.getDay() !== c.weekday) first = addDays(first, 1);
    const s = new Date(first); s.setMinutes(toMin(c.start));
    const e = new Date(first); e.setMinutes(toMin(c.end));
    return ['BEGIN:VEVENT', `UID:clase-${c.id}@mi-horario`, `DTSTAMP:${stamp()}`,
      `DTSTART:${local(s)}`, `DTEND:${local(e)}`, `RRULE:FREQ=WEEKLY;COUNT=${weeks}`,
      `SUMMARY:${escape(c.subject)}`, ...(c.room ? [`LOCATION:${escape('Aula ' + c.room)}`] : []),
      ...alarm('-PT15M', 'Clase en 15 min: ' + c.subject),
      'END:VEVENT'];
  });
  downloadFile('horario-de-clases.ics', wrap(events), 'text/calendar');
  toast(`Horario exportado: se repite ${weeks} semanas.`, 'ok');
}

export function exportExams() {
  const list = state.exams.filter((e) => e.endsAt > Date.now());
  if (!list.length) return toast('No hay exámenes próximos para exportar.', 'warn');
  const events = list.map((e) => ['BEGIN:VEVENT', `UID:examen-${e.id}@mi-horario`, `DTSTAMP:${stamp()}`,
    `DTSTART:${utc(e.startsAt)}`, `DTEND:${utc(e.endsAt)}`,
    `SUMMARY:${escape('Examen: ' + e.subject)}`, ...(e.room ? [`LOCATION:${escape('Aula ' + e.room)}`] : []),
    `DESCRIPTION:${escape(e.notes || 'Confirma aula e indicaciones con tu docente o Coordinación.')}`,
    ...alarm('-P1D', 'Mañana: examen de ' + e.subject), ...alarm('-PT1H', 'En 1 hora: examen de ' + e.subject),
    'END:VEVENT']);
  downloadFile('examenes.ics', wrap(events), 'text/calendar');
  toast('Exámenes exportados a tu calendario.', 'ok');
}

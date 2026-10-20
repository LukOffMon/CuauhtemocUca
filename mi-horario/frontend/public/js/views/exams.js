// Vista "Exámenes": próximo examen con cuenta regresiva y lista por día.
import { html, icon, cssColor } from '../lib/html.js';
import { fmtDateLong, fmtTime, startOfDay, sameDay } from '../lib/time.js';
import { state, setPrefs } from '../store.js';
import { on, examChip } from '../ui.js';
import { exportExams } from '../ics.js';

let showPast = false;
on({
  'export-exams': () => exportExams(),
  'toggle-past-exams': () => { showPast = !showPast; document.dispatchEvent(new CustomEvent('mh:rerender')); },
  'toggle-exam-replace': (el) => setPrefs({ examDaysReplaceClasses: el.checked }, { delay: 0 })
});

export function renderExams() {
  const now = Date.now();
  const upcoming = state.exams.filter((e) => e.endsAt > now);
  const past = state.exams.filter((e) => e.endsAt <= now);
  const list = showPast ? state.exams : upcoming;
  const next = upcoming[0];

  const toolbar = html`
    <div class="toolbar">
      <button class="btn btn-primary" data-action="new-exam">${icon('plus')} Agregar examen</button>
      <span class="spacer"></span>
      ${past.length ? html`<button class="btn btn-ghost" data-action="toggle-past-exams">${showPast ? 'Ocultar presentados' : `Ver presentados (${past.length})`}</button>` : ''}
      <button class="btn btn-ghost" data-action="export-exams">${icon('calendar-plus')} Exportar .ics</button>
    </div>`;

  if (!state.exams.length || (!upcoming.length && !showPast)) {
    return html`${toolbar}
      <div class="empty empty-big">
        ${icon('calendar-xmark', 'empty-icon')}
        <h2>${state.exams.length ? 'Ya presentaste todos tus exámenes' : 'Sin exámenes programados'}</h2>
        <p>Cuando Coordinación publique nuevas fechas, agrégalas aquí para ver la cuenta regresiva y recibir recordatorios.</p>
        <button class="btn btn-primary" data-action="new-exam">${icon('plus')} Agregar examen</button>
      </div>`;
  }

  // Agrupa por día.
  const days = [];
  for (const e of list) {
    const key = startOfDay(e.startsAt).getTime();
    let g = days.find((d) => d.key === key);
    if (!g) days.push((g = { key, items: [] }));
    g.items.push(e);
  }

  return html`
    ${toolbar}
    ${next ? html`
      <section class="hero hero-exam" style="--subject:${cssColor(next.color)}">
        <p class="hero-kicker">Próximo examen: ${fmtDateLong(next.startsAt).toLowerCase()} a las ${fmtTime(next.startsAt)}</p>
        <h1 class="hero-title">${next.subject}</h1>
        <div class="hero-row">${examChip(next)}${next.room ? html`<span class="muted">${icon('door-open')} Aula ${next.room}</span>` : ''}</div>
      </section>` : ''}
    <div class="exam-days">
      ${days.map((g) => html`
        <section class="exam-day ${sameDay(g.key, now) ? 'is-today' : ''}">
          <h2 class="day-title">${fmtDateLong(g.key)}${sameDay(g.key, now) ? html` <small>Hoy</small>` : ''}</h2>
          <ul class="exam-list">
            ${g.items.map((e) => html`
              <li class="exam ${e.endsAt <= now ? 'is-done' : ''}" style="--subject:${cssColor(e.color)}">
                <div class="exam-time">${fmtTime(e.startsAt)}<span class="muted">${fmtTime(e.endsAt)}</span></div>
                <div class="exam-main">
                  <p class="exam-subject">${e.subject}</p>
                  <p class="muted small">${e.room ? `Aula ${e.room}` : 'Aula por confirmar'}${e.notes ? `. ${e.notes}` : ''}</p>
                  ${examChip(e)}
                </div>
                <button type="button" class="icon-btn icon-btn-sm" data-action="edit-exam" data-id="${e.id}" aria-label="Editar examen" title="Editar">${icon('pen')}</button>
              </li>`)}
          </ul>
        </section>`)}
    </div>
    <label class="check-line">
      <input type="checkbox" data-change="toggle-exam-replace" ${state.data.prefs.examDaysReplaceClasses !== false ? 'checked' : ''}>
      En días de examen, mostrar solo los exámenes en “Hoy” (sin clases normales)
    </label>
    <p class="callout callout-warn">${icon('triangle-exclamation')} Confirma cualquier indicación adicional de docente, aula o Coordinación.</p>`;
}

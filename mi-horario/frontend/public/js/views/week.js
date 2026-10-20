// Vista "Semana": tabla de horario proporcional (escritorio) y lista por día (móvil).
import { html, icon, cssColor } from '../lib/html.js';
import { DAYS, toMin, minToHHMM, nowMin } from '../lib/time.js';
import { state } from '../store.js';
import { on } from '../ui.js';
import { exportClasses } from '../ics.js';

on({
  'print-week': () => window.print(),
  'export-classes': () => exportClasses()
});

export function renderWeek() {
  const today = new Date().getDay();
  const used = new Set(state.classes.map((c) => c.weekday));
  const days = [1, 2, 3, 4, 5, ...(used.has(6) ? [6] : []), ...(used.has(0) ? [0] : [])];
  const upcomingExams = state.exams.some((e) => e.endsAt > Date.now() && e.startsAt - Date.now() < 14 * 86400_000);

  const toolbar = html`
    <div class="toolbar no-print">
      <button class="btn btn-primary" data-action="new-class">${icon('plus')} Agregar clase</button>
      <span class="spacer"></span>
      <button class="btn btn-ghost" data-action="export-classes">${icon('calendar-plus')} Exportar .ics</button>
      <button class="btn btn-ghost" data-action="print-week">${icon('print')} Imprimir</button>
    </div>`;

  if (!state.classes.length) {
    return html`${toolbar}
      <div class="empty empty-big">
        ${icon('calendar-week', 'empty-icon')}
        <h2>Tu horario está vacío</h2>
        <p>Agrega tus clases una por una, o carga el horario de 5A INF desde Ajustes.</p>
        <div class="row-gap"><button class="btn btn-primary" data-action="new-class">${icon('plus')} Agregar clase</button>
        <a class="btn btn-ghost" href="#/ajustes">Ir a Ajustes</a></div>
      </div>`;
  }

  const start = Math.floor(Math.min(...state.classes.map((c) => toMin(c.start))) / 60) * 60;
  const end = Math.ceil(Math.max(...state.classes.map((c) => toMin(c.end))) / 60) * 60;
  const k = 1.05;
  const y = (m) => ((m - start) * k).toFixed(1);
  const hours = [];
  for (let m = start; m <= end; m += 60) hours.push(m);
  const nm = nowMin();
  const r = state.data.prefs.recess;

  const grid = html`
    <div class="week-grid" style="--cols:${days.length};--h:${((end - start) * k).toFixed(0)}px">
      <div class="week-axis" aria-hidden="true">
        <div class="week-colhead"></div>
        <div class="week-body">${hours.map((m) => html`<span class="week-hour" style="top:${y(m)}px">${minToHHMM(m)}</span>`)}</div>
      </div>
      ${days.map((d) => {
        const list = state.classes.filter((c) => c.weekday === d);
        return html`
          <div class="week-col ${d === today ? 'is-today' : ''}">
            <div class="week-colhead"><span>${DAYS[d]}</span>${d === today ? html`<small>Hoy</small>` : ''}</div>
            <div class="week-body">
              ${hours.map((m) => html`<span class="week-line" style="top:${y(m)}px"></span>`)}
              ${r && list.length ? html`<span class="week-recess" style="top:${y(toMin(r.start))}px;height:${((toMin(r.end) - toMin(r.start)) * k).toFixed(1)}px" title="Receso"></span>` : ''}
              ${list.map((c) => html`
                <button type="button" class="week-block ${toMin(c.end) - toMin(c.start) <= 60 ? 'is-short' : ''}" data-action="edit-class" data-id="${c.id}"
                  style="top:${y(toMin(c.start))}px;height:${((toMin(c.end) - toMin(c.start)) * k - 3).toFixed(1)}px;--subject:${cssColor(c.color)}"
                  aria-label="${DAYS[d]}, ${c.subject}, ${c.start} a ${c.end}">
                  <span class="wb-time">${c.start}</span>
                  <span class="wb-subject">${c.subject}</span>
                  ${c.room ? html`<span class="wb-room">${c.room}</span>` : ''}
                </button>`)}
              ${d === today && nm >= start && nm <= end ? html`<span class="week-now" style="top:${y(nm)}px"></span>` : ''}
            </div>
          </div>`;
      })}
    </div>`;

  const list = html`
    <div class="week-list">
      ${days.map((d) => {
        const items = state.classes.filter((c) => c.weekday === d);
        return html`
          <section class="day-section ${d === today ? 'is-today' : ''}">
            <h2 class="day-title">${DAYS[d]}${d === today ? html` <small>Hoy</small>` : ''}</h2>
            ${items.length ? html`<ul class="class-list">${items.map((c) => html`
              <li><button type="button" class="class-row" data-action="edit-class" data-id="${c.id}" style="--subject:${cssColor(c.color)}">
                <span class="cr-time">${c.start}<br><span class="muted">${c.end}</span></span>
                <span class="cr-main"><span class="cr-subject">${c.subject}</span>${c.room ? html`<span class="muted small">Aula ${c.room}</span>` : ''}</span>
                ${icon('pen', 'muted')}
              </button></li>`)}</ul>`
              : html`<p class="muted small">Sin clases.</p>`}
          </section>`;
      })}
    </div>`;

  return html`
    ${toolbar}
    ${upcomingExams ? html`<a class="callout callout-danger callout-link no-print" href="#/examenes">${icon('file-signature')} Se acerca semana de exámenes. Toca para ver fechas y horas.</a>` : ''}
    <p class="muted small no-print">Toca una clase para editarla o eliminarla.</p>
    ${grid}
    ${list}`;
}

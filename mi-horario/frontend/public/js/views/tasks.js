// Vista "Pendientes": entregas de Moodle, ALEKS y otras con cuenta regresiva en vivo.
import { html, icon, cssColor, safeUrl, plural } from '../lib/html.js';
import { fmtDateTime, HOUR, fmtDate } from '../lib/time.js';
import { deadlines, level } from '../lib/schedule.js';
import { state, setTaskCompleted, setPrefs } from '../store.js';
import { on, countdownChip, toast } from '../ui.js';
import { requestPermission, notifSupported, notifEnabled, notify } from '../alerts.js';
import { exportDeadlines } from '../ics.js';

const filters = { kind: 'all', subject: 'all', show: 'pending' };
const KIND_LABEL = { moodle: 'Moodle', aleks: 'ALEKS', otra: 'Otra' };
const rerender = () => document.dispatchEvent(new CustomEvent('mh:rerender'));

on({
  'filter-kind': (el) => { filters.kind = el.value; filters.subject = 'all'; rerender(); },
  'filter-subject': (el) => { filters.subject = el.value; rerender(); },
  'filter-show': (el) => { filters.show = el.value; rerender(); },
  'toggle-task': async (el) => {
    const done = el.checked;
    await setTaskCompleted(Number(el.dataset.id), done);
    if (done) toast('Marcaste la tarea como entregada.', 'ok', 2500);
  },
  'enable-notifs': async () => {
    const ok = await requestPermission();
    if (ok) {
      await setPrefs({ notifications: true }, { delay: 0 });
      toast('Listo: te avisaremos antes de cada entrega mientras la página esté abierta.', 'ok');
      notify('Mi Horario', 'Las alertas están activadas.', 'test');
    }
    rerender();
  },
  'export-deadlines': () => exportDeadlines(),
  'open-moodle': () => {
    const url = safeUrl(state.data.prefs.moodleUrl);
    if (url) return window.open(url, '_blank', 'noopener,noreferrer');
    toast('Aún no guardas el enlace de Moodle. Agrégalo en Ajustes.', 'warn');
    location.hash = '#/ajustes?f=moodle';
  }
});

function badgeFor(d, now) {
  const ms = d.due - now;
  if (d.completed) return ['Entregada', 'badge-ok'];
  if (ms <= 0) return ['Vencida', 'badge-danger'];
  if (d.opensAt > now) return ['Aún no abre', 'badge-muted'];
  if (d.inExtra) return ['Plazo extra', 'badge-warn'];
  if (ms <= 24 * HOUR) return ['Vence pronto', 'badge-warn'];
  if (ms <= 168 * HOUR) return ['Esta semana', 'badge-info'];
  return ['Con tiempo', 'badge-muted'];
}

function progress(d, now) {
  if (d.completed || now < d.opensAt) return '';
  const pct = Math.max(0, Math.min(100, ((now - d.opensAt) / Math.max(1, d.due - d.opensAt)) * 100));
  return html`<div class="bar" title="Tiempo transcurrido del plazo"><span class="bar-${level(d.due - now)}" style="width:${pct.toFixed(1)}%"></span></div>`;
}

export function taskRow(d, now = Date.now()) {
  const [badge, badgeCls] = badgeFor(d, now);
  const link = safeUrl(d.link);
  const open = d.kind === 'moodle' && !link
    ? html`<button type="button" class="link-btn" data-action="open-moodle">${icon('arrow-up-right-from-square')} Abrir Moodle</button>`
    : link ? html`<a class="link-btn" href="${link}" target="_blank" rel="noopener noreferrer">${icon('arrow-up-right-from-square')} Abrir ${d.kind === 'aleks' ? 'ALEKS' : 'actividad'}</a>` : '';
  return html`
    <li class="task ${d.completed ? 'is-done' : ''}" style="--subject:${cssColor(d.color)}">
      <label class="task-check">
        <input type="checkbox" ${d.completed ? 'checked' : ''} data-change="toggle-task" data-id="${d.id}">
        <span class="sr-only">Marcar como entregada</span>
      </label>
      <div class="task-main">
        <div class="task-top">
          <span class="task-subject">${d.subject}</span>
          <span class="badge ${badgeCls}">${badge}</span>
          <span class="badge badge-plain">${KIND_LABEL[d.kind]}</span>
        </div>
        <p class="task-title">${d.title}</p>
        <p class="task-dates">
          <span>${icon('calendar-plus')} Abre ${fmtDateTime(d.opensAt)}</span>
          <span>${icon('flag-checkered')} ${d.kind === 'aleks' ? 'Cierra' : 'Entrega'} ${fmtDateTime(d.dueAt)}</span>
          ${d.finalDueAt ? html`<span class="${d.inExtra ? 'text-warn' : ''}">${icon('hourglass-end')} Entrega final ${fmtDateTime(d.finalDueAt)}</span>` : ''}
        </p>
        <div class="task-foot">
          ${countdownChip(d)}
          <span class="spacer"></span>
          ${open}
          <button type="button" class="icon-btn icon-btn-sm" data-action="edit-task" data-id="${d.id}" aria-label="Editar tarea" title="Editar">${icon('pen')}</button>
        </div>
        ${progress(d, now)}
      </div>
    </li>`;
}

export function renderTasks() {
  const now = Date.now();
  const all = deadlines(now);
  const byKind = filters.kind === 'all' ? all : all.filter((d) => d.kind === filters.kind);
  const subjectsInKind = [...new Set(byKind.map((d) => d.subject))].sort();
  let list = filters.subject === 'all' ? byKind : byKind.filter((d) => d.subject === filters.subject);

  const done = byKind.filter((d) => d.completed).length;
  const pctDone = byKind.length ? Math.round((done / byKind.length) * 100) : 0;
  const next = byKind.filter((d) => !d.completed && d.due > now && d.opensAt <= now)[0] || byKind.find((d) => !d.completed && d.due > now);
  const startP = Math.min(...byKind.map((d) => d.opensAt));
  const endP = Math.max(...byKind.map((d) => d.due));
  const pctTime = byKind.length ? Math.max(0, Math.min(100, Math.round(((now - startP) / Math.max(1, endP - startP)) * 100))) : 0;

  const pendingList = list.filter((d) => !d.completed);
  const groups = [
    ['Vencidas sin entregar', 'triangle-exclamation', 'danger', pendingList.filter((d) => d.due <= now)],
    ['Menos de 24 horas', 'fire', 'hot', pendingList.filter((d) => d.due > now && d.due - now <= 24 * HOUR && d.opensAt <= now)],
    ['Esta semana', 'calendar-week', 'warn', pendingList.filter((d) => d.due - now > 24 * HOUR && d.due - now <= 168 * HOUR && d.opensAt <= now)],
    ['Más adelante', 'calendar', 'info', pendingList.filter((d) => d.due - now > 168 * HOUR && d.opensAt <= now)]
  ];
  const notOpen = pendingList.filter((d) => d.opensAt > now && d.due > now);
  const completed = list.filter((d) => d.completed).sort((a, b) => b.due - a.due);

  let body;
  if (!all.length) {
    body = html`<div class="empty empty-big">${icon('list-check', 'empty-icon')}<h2>No tienes tareas registradas</h2>
      <p>Agrega tus actividades de Moodle, ALEKS o cualquier otra entrega para ver cuánto tiempo te queda.</p>
      <button class="btn btn-primary" data-action="new-task">${icon('plus')} Nueva tarea</button></div>`;
  } else if (filters.show === 'pending') {
    const visible = groups.filter((g) => g[3].length);
    body = html`
      ${visible.length || notOpen.length ? '' : html`<div class="empty">${icon('circle-check', 'empty-icon ok')}<h2>Todo al día</h2><p>No tienes entregas pendientes con este filtro.</p></div>`}
      ${visible.map(([title, ic, tone, items]) => html`
        <section class="group">
          <h2 class="group-title tone-${tone}">${icon(ic)} ${title} <span class="count">${items.length}</span></h2>
          <ul class="task-list">${items.map((d) => taskRow(d, now))}</ul>
        </section>`)}
      ${notOpen.length ? html`<details class="group">
          <summary class="group-title tone-muted">${icon('clock')} Aún no abren <span class="count">${notOpen.length}</span> <span class="muted small">Toca para ver</span></summary>
          <ul class="task-list">${notOpen.map((d) => taskRow(d, now))}</ul></details>` : ''}
      ${completed.length ? html`<details class="group">
          <summary class="group-title tone-ok">${icon('circle-check')} Entregadas <span class="count">${completed.length}</span></summary>
          <ul class="task-list">${completed.map((d) => taskRow(d, now))}</ul></details>` : ''}`;
  } else {
    if (filters.show === 'week') list = list.filter((d) => !d.completed && d.due >= now && d.due - now <= 168 * HOUR);
    if (filters.show === 'overdue') list = list.filter((d) => !d.completed && d.due < now);
    if (filters.show === 'done') list = completed;
    body = list.length
      ? html`<ul class="task-list">${list.map((d) => taskRow(d, now))}</ul>`
      : html`<div class="empty">${icon('clipboard-check', 'empty-icon')}<p>No hay tareas con este filtro.</p></div>`;
  }

  const notifBox = !notifSupported() ? '' : notifEnabled()
    ? html`<span class="muted small">${icon('bell', 'ok')} Alertas del navegador activadas</span>`
    : html`<button class="btn btn-ghost" data-action="enable-notifs">${icon('bell')} Activar alertas</button>`;

  return html`
    <div class="toolbar">
      <div class="segmented" role="radiogroup" aria-label="Plataforma">
        ${[['all', 'Todas'], ['moodle', 'Moodle'], ['aleks', 'ALEKS'], ['otra', 'Otras']].map(([k, l]) => html`
          <label><input type="radio" name="fk" value="${k}" ${filters.kind === k ? 'checked' : ''} data-change="filter-kind"><span>${l}</span></label>`)}
      </div>
      <span class="spacer"></span>
      <button class="btn btn-primary" data-action="new-task" data-kind="${filters.kind === 'all' ? 'moodle' : filters.kind}">${icon('plus')} Nueva tarea</button>
    </div>

    ${byKind.length ? html`
    <div class="stats">
      <div class="stat">
        <p class="stat-label">Próximo vencimiento</p>
        ${next ? html`<p class="stat-text">${next.subject}: ${next.title}</p>${countdownChip(next)}` : html`<p class="stat-text muted">Nada por vencer</p>`}
      </div>
      <div class="stat">
        <p class="stat-label">${filters.kind === 'aleks' ? 'Avance en ALEKS' : 'Entregadas'}</p>
        <p class="stat-number">${done}<span>/${byKind.length}</span></p>
        <div class="bar"><span class="bar-brand" style="width:${pctDone}%"></span></div>
      </div>
      <div class="stat">
        <p class="stat-label">Avance del periodo</p>
        <p class="stat-number">${pctTime}<span>%</span></p>
        <div class="bar"><span class="bar-ink" style="width:${pctTime}%"></span></div>
        <p class="muted small">Del ${fmtDate(startP)} al ${fmtDate(endP)}</p>
      </div>
    </div>` : ''}

    <div class="filters">
      <label class="field-inline"><span class="label">Materia</span>
        <select data-change="filter-subject">
          <option value="all">Todas las materias</option>
          ${subjectsInKind.map((s) => html`<option value="${s}" ${filters.subject === s ? 'selected' : ''}>${s}</option>`)}
        </select></label>
      <label class="field-inline"><span class="label">Mostrar</span>
        <select data-change="filter-show">
          ${[['pending', 'Pendientes por urgencia'], ['week', 'Próximos 7 días'], ['overdue', 'Vencidas'], ['done', 'Entregadas'], ['all', 'Todas']].map(([k, l]) =>
            html`<option value="${k}" ${filters.show === k ? 'selected' : ''}>${l}</option>`)}
        </select></label>
      <span class="spacer"></span>
      <div class="row-gap">
        ${notifBox}
        <button class="btn btn-ghost" data-action="export-deadlines" title="Alarmas 1 día, 3 h y 30 min antes en tu calendario">${icon('calendar-plus')} Exportar .ics</button>
      </div>
    </div>
    <p class="muted small hint-line">Los avisos (24 h, 3 h, 1 h y 15 min antes) funcionan con la página abierta. Para recibirlos con la página cerrada, exporta tus entregas a tu calendario.</p>
    ${filters.kind === 'aleks' ? html`<p class="muted small hint-line">${icon('thumbtack')} La entrega final aplica solo cuando ALEKS da plazo extra tras el cierre. La cuenta regresiva cambia sola a ese plazo.</p>` : ''}
    ${body}`;
}

export function pendingBadgeCount() {
  const now = Date.now();
  return deadlines(now).filter((d) => !d.completed && d.opensAt <= now && d.due - now < 24 * HOUR).length;
}
export const summaryLine = () => {
  const now = Date.now();
  const p = deadlines(now).filter((d) => !d.completed && d.opensAt <= now && d.due > now).length;
  return plural(p, 'entrega abierta', 'entregas abiertas');
};

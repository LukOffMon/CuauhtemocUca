// Herramientas: Pomodoro, promedios, faltas, notas por materia, enlaces y calendario.
import { html, icon, safeUrl, plural, mount } from '../lib/html.js';
import { pad, dateKey } from '../lib/time.js';
import { state, setData, setPrefs, subjects } from '../store.js';
import { on, toast, formData, confirmDialog } from '../ui.js';
import { notify, beep } from '../alerts.js';
import { exportDeadlines, exportClasses, exportExams } from '../ics.js';

const TABS = [
  ['pomodoro', 'Pomodoro', 'stopwatch'],
  ['promedios', 'Promedios', 'calculator'],
  ['faltas', 'Faltas', 'user-xmark'],
  ['notas', 'Notas', 'note-sticky'],
  ['enlaces', 'Enlaces', 'link'],
  ['calendario', 'Calendario y respaldo', 'calendar-plus']
];
let tab = 'pomodoro';
const rerender = () => document.dispatchEvent(new CustomEvent('mh:rerender'));

// ================= Pomodoro =================
const PRESETS = { '25/5': [25, 5, 15], '50/10': [50, 10, 20] };
const LABELS = { focus: 'Concentración', short: 'Descanso corto', long: 'Descanso largo' };
const pomo = { mode: 'focus', preset: '25/5', remaining: 25 * 60, running: false, endAt: 0, cycle: 0, timer: null };

const dur = (mode) => PRESETS[pomo.preset][mode === 'focus' ? 0 : mode === 'short' ? 1 : 2] * 60;
const pomoCount = () => (state.data.pomodoro?.date === dateKey() ? state.data.pomodoro.count : 0);

function pomoTick() {
  if (!pomo.running) return;
  pomo.remaining = Math.max(0, Math.ceil((pomo.endAt - Date.now()) / 1000));
  if (pomo.remaining <= 0) pomoNext(true);
  pomoUI();
}
function pomoNext(completed) {
  clearInterval(pomo.timer);
  pomo.running = false;
  const wasFocus = pomo.mode === 'focus';
  if (wasFocus) {
    if (completed) {
      pomo.cycle++;
      setData('pomodoro', { date: dateKey(), count: pomoCount() + 1 }, { delay: 0 }).catch(() => {});
    }
    pomo.mode = completed && pomo.cycle % 4 === 0 ? 'long' : 'short';
  } else pomo.mode = 'focus';
  pomo.remaining = dur(pomo.mode);
  if (completed) {
    const msg = wasFocus ? 'Bloque terminado. Toma tu descanso.' : 'Terminó el descanso. A concentrarse.';
    toast(msg, 'ok', 8000);
    notify('Pomodoro', msg, 'pomo');
    beep(3, 660);
  }
  pomoUI();
}
export function pomoUI() {
  const m = Math.floor(pomo.remaining / 60), s = pomo.remaining % 60;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('pomo-time', `${pad(m)}:${pad(s)}`);
  set('pomo-mode', LABELS[pomo.mode]);
  set('pomo-count', String(pomoCount()));
  const btn = document.getElementById('pomo-btn');
  if (btn) mount(btn, pomo.running ? html`${icon('pause')} Pausar` : html`${icon('play')} Iniciar`);
  const ring = document.getElementById('pomo-ring');
  if (ring) ring.style.setProperty('--p', String(1 - pomo.remaining / dur(pomo.mode)));
  document.title = pomo.running ? `${pad(m)}:${pad(s)} ${LABELS[pomo.mode]}` : 'Mi Horario';
}
on({
  'pomo-toggle': () => {
    if (pomo.running) { pomoTick(); clearInterval(pomo.timer); pomo.running = false; }
    else { pomo.endAt = Date.now() + pomo.remaining * 1000; pomo.running = true; pomo.timer = setInterval(pomoTick, 250); }
    pomoUI();
  },
  'pomo-reset': () => { clearInterval(pomo.timer); pomo.running = false; pomo.remaining = dur(pomo.mode); pomoUI(); },
  'pomo-skip': () => pomoNext(false),
  'pomo-preset': (el) => {
    clearInterval(pomo.timer);
    Object.assign(pomo, { preset: el.value, cycle: 0, mode: 'focus', running: false });
    pomo.remaining = dur('focus');
    pomoUI();
  }
});

function renderPomodoro() {
  return html`
    <div class="pomo">
      <div class="pomo-ring" id="pomo-ring" style="--p:${1 - pomo.remaining / dur(pomo.mode)}">
        <div class="pomo-inner">
          <p class="pomo-mode" id="pomo-mode">${LABELS[pomo.mode]}</p>
          <p class="pomo-time" id="pomo-time">00:00</p>
        </div>
      </div>
      <div class="row-gap center">
        <button id="pomo-btn" class="btn btn-primary btn-lg" data-action="pomo-toggle"></button>
        <button class="btn btn-ghost btn-lg" data-action="pomo-reset" aria-label="Reiniciar" title="Reiniciar">${icon('rotate-left')}</button>
        <button class="btn btn-ghost btn-lg" data-action="pomo-skip" aria-label="Saltar al siguiente bloque" title="Saltar">${icon('forward-step')}</button>
      </div>
      <div class="segmented center" role="radiogroup" aria-label="Duración">
        ${Object.keys(PRESETS).map((p) => html`<label><input type="radio" name="preset" value="${p}" ${pomo.preset === p ? 'checked' : ''} data-change="pomo-preset"><span>${p} min</span></label>`)}
      </div>
      <p class="muted">Bloques completados hoy: <strong id="pomo-count">0</strong></p>
      <p class="muted small">El temporizador sigue corriendo aunque cambies de sección.</p>
    </div>`;
}

// ================= Promedios =================
function gradeResult(vals, pm) {
  const nums = vals.filter((v) => v !== null && v !== '' && !Number.isNaN(Number(v))).map(Number);
  if (!nums.length) return html`<span class="muted">Escribe tus calificaciones para ver tu promedio.</span>`;
  const sum = nums.reduce((a, b) => a + b, 0), avg = sum / nums.length, left = 3 - nums.length;
  if (!left) return html`Promedio final <strong>${avg.toFixed(1)}</strong>: ${avg >= pm ? html`<span class="text-ok">aprobada</span>` : html`<span class="text-danger">por debajo de ${pm}</span>`}`;
  const need = (pm * 3 - sum) / left;
  if (need <= 0) return html`Promedio actual <strong>${avg.toFixed(1)}</strong>. <span class="text-ok">Ya aseguras ${pm}.</span>`;
  if (need > 100) return html`Promedio actual <strong>${avg.toFixed(1)}</strong>. <span class="text-danger">Ni con 100 en lo que falta llegarías a ${pm}.</span>`;
  return html`Promedio actual <strong>${avg.toFixed(1)}</strong>. Necesitas <strong>${need.toFixed(1)}</strong> en ${plural(left, 'parcial', 'parciales')} para llegar a ${pm}.`;
}
on({
  grade: (el) => {
    const subject = el.dataset.subject;
    const grades = { ...state.data.grades };
    const row = [...(grades[subject] || [null, null, null])];
    const v = el.value === '' ? null : Math.max(0, Math.min(100, Number(el.value)));
    row[Number(el.dataset.idx)] = Number.isNaN(v) ? null : v;
    grades[subject] = row;
    setData('grades', grades).catch((e) => toast(e.message, 'danger'));
    const out = el.closest('.grade-card').querySelector('.grade-result');
    mount(out, gradeResult(row, state.data.prefs.passMin));
  },
  'pass-min': (el) => {
    const n = Math.max(0, Math.min(100, Number(el.value) || 70));
    setPrefs({ passMin: n }).catch((e) => toast(e.message, 'danger'));
    document.querySelectorAll('.grade-card').forEach((card) => {
      const row = state.data.grades[card.dataset.subject] || [null, null, null];
      mount(card.querySelector('.grade-result'), gradeResult(row, n));
    });
  }
});
function renderGrades() {
  const subs = subjects();
  if (!subs.length) return html`<div class="empty"><p>Agrega clases a tu horario para calcular promedios por materia.</p></div>`;
  const pm = state.data.prefs.passMin ?? 70;
  return html`
    <div class="tool-intro">
      <p>Escribe tus calificaciones de 0 a 100. Se supone que los <strong>3 parciales pesan igual</strong>; ajusta la mínima aprobatoria según tu reglamento.</p>
      <label class="field-inline"><span class="label">Mínima aprobatoria</span>
        <input type="number" min="0" max="100" value="${pm}" class="input-num" data-input="pass-min"></label>
    </div>
    <div class="cards-2">
      ${subs.map((s) => {
        const row = state.data.grades[s] || [null, null, null];
        return html`
          <div class="tool-card grade-card" data-subject="${s}">
            <p class="tool-card-title">${s}</p>
            <div class="grade-inputs">
              ${[0, 1, 2].map((j) => html`
                <label class="field"><span class="label">Parcial ${j + 1}</span>
                  <input type="number" inputmode="decimal" min="0" max="100" step="0.1" value="${row[j] ?? ''}" data-input="grade" data-subject="${s}" data-idx="${j}"></label>`)}
            </div>
            <p class="grade-result small">${gradeResult(row, pm)}</p>
          </div>`;
      })}
    </div>`;
}

// ================= Faltas =================
on({
  absence: (el) => {
    const s = el.dataset.subject;
    const ab = { ...state.data.absences };
    ab[s] = Math.max(0, (ab[s] || 0) + Number(el.dataset.delta));
    setData('absences', ab, { delay: 300 }).catch((e) => toast(e.message, 'danger'));
    rerender();
  },
  'abs-limit': (el) => {
    setPrefs({ absLimit: Math.max(1, Math.min(99, parseInt(el.value, 10) || 6)) }, { delay: 300 }).then(rerender).catch((e) => toast(e.message, 'danger'));
  }
});
function renderAbsences() {
  const subs = subjects();
  if (!subs.length) return html`<div class="empty"><p>Agrega clases a tu horario para llevar el conteo de faltas.</p></div>`;
  const lim = state.data.prefs.absLimit || 6;
  return html`
    <div class="tool-intro">
      <p>Lleva el conteo de tus faltas por materia. Pon el límite que marque tu reglamento.</p>
      <label class="field-inline"><span class="label">Límite por materia</span>
        <input type="number" min="1" max="99" value="${lim}" class="input-num" data-change="abs-limit"></label>
    </div>
    <div class="cards-2">
      ${subs.map((s) => {
        const n = state.data.absences[s] || 0;
        const tone = n >= lim ? 'danger' : n >= lim - 1 ? 'warn' : 'ok';
        return html`
          <div class="tool-card">
            <div class="abs-row">
              <p class="tool-card-title">${s}</p>
              <div class="stepper">
                <button class="icon-btn" data-action="absence" data-subject="${s}" data-delta="-1" aria-label="Quitar una falta de ${s}" ${n === 0 ? 'disabled' : ''}>${icon('minus')}</button>
                <span class="stepper-n" aria-live="polite">${n}</span>
                <button class="icon-btn icon-btn-brand" data-action="absence" data-subject="${s}" data-delta="1" aria-label="Agregar una falta a ${s}">${icon('plus')}</button>
              </div>
            </div>
            <div class="bar"><span class="bar-${tone === 'danger' ? 'over' : tone}" style="width:${Math.min(100, (n / lim) * 100)}%"></span></div>
            <p class="small text-${tone}">${n >= lim ? 'Llegaste al límite de faltas' : `${plural(lim - n, 'falta disponible', 'faltas disponibles')}`}</p>
          </div>`;
      })}
    </div>`;
}

// ================= Notas =================
on({
  note: (el) => {
    const notes = { ...state.data.notes, [el.dataset.subject]: el.value };
    setData('notes', notes, { delay: 800 }).catch((e) => toast(e.message, 'danger'));
  }
});
function renderNotes() {
  const subs = subjects();
  if (!subs.length) return html`<div class="empty"><p>Agrega clases a tu horario para tomar notas por materia.</p></div>`;
  return html`
    <p class="tool-intro muted">Apuntes rápidos por materia. Se guardan cifrados en tu cuenta mientras escribes.</p>
    <div class="notes">
      ${subs.map((s) => {
        const v = state.data.notes[s] || '';
        return html`
          <details class="note" ${v.trim() ? 'open' : ''}>
            <summary>${s}${v.trim() ? html`${icon('note-sticky', 'note-flag')}` : ''}</summary>
            <textarea rows="5" maxlength="10000" placeholder="Apuntes, dudas o pendientes de esta materia" data-input="note" data-subject="${s}" aria-label="Notas de ${s}">${v}</textarea>
          </details>`;
      })}
    </div>`;
}

// ================= Enlaces =================
on({
  'add-link': (form) => {
    const d = formData(form);
    const url = safeUrl(/^https?:\/\//i.test(d.url.trim()) ? d.url.trim() : 'https://' + d.url.trim());
    if (!d.name.trim() || !url) return toast('Escribe un nombre y un enlace válido.', 'warn');
    setData('links', [...state.data.links, { name: d.name.trim(), url }], { delay: 0 })
      .then(() => { toast('Enlace agregado.', 'ok', 2500); rerender(); })
      .catch((e) => toast(e.message, 'danger'));
  },
  'remove-link': async (el) => {
    const i = Number(el.dataset.i);
    const ok = await confirmDialog({ title: '¿Quitar este enlace?', body: state.data.links[i]?.name || '', confirm: 'Quitar', danger: true });
    if (!ok) return;
    await setData('links', state.data.links.filter((_, k) => k !== i), { delay: 0 });
    rerender();
  }
});
function renderLinks() {
  const moodle = safeUrl(state.data.prefs.moodleUrl);
  const tile = (ic, cls, name, sub, action) => html`
    <div class="link-tile">
      <span class="link-icon ${cls}">${icon(ic)}</span>
      <div class="link-text"><p class="tool-card-title">${name}</p><p class="muted small truncate">${sub}</p></div>
      ${action}
    </div>`;
  const openBtn = (u) => html`<a class="btn btn-ghost btn-sm" href="${u}" target="_blank" rel="noopener noreferrer">Abrir</a>`;
  return html`
    <div class="cards-2">
      ${tile('graduation-cap', 'li-moodle', 'Moodle de la prepa', moodle || 'Aún sin configurar', moodle ? openBtn(moodle) : html`<a class="btn btn-ghost btn-sm" href="#/ajustes?f=moodle">Configurar</a>`)}
      ${tile('laptop-code', 'li-aleks', 'ALEKS', 'https://www.aleks.com/', openBtn('https://www.aleks.com/'))}
      ${state.data.links.map((l, i) => tile('link', 'li-custom', l.name, l.url, html`
        <div class="row-gap">${safeUrl(l.url) ? openBtn(safeUrl(l.url)) : ''}
          <button class="icon-btn icon-btn-sm" data-action="remove-link" data-i="${i}" aria-label="Quitar ${l.name}">${icon('trash')}</button></div>`))}
    </div>
    <form class="tool-card add-link" data-submit="add-link" novalidate>
      <p class="tool-card-title">Agregar un enlace</p>
      <div class="add-link-row">
        <input name="name" maxlength="40" placeholder="Nombre (Biblioteca, Drive…)" aria-label="Nombre del enlace" required>
        <input name="url" maxlength="500" placeholder="https://" inputmode="url" aria-label="Dirección del enlace" required>
        <button class="btn btn-primary" type="submit">Agregar</button>
      </div>
    </form>`;
}

// ================= Calendario y respaldo =================
on({
  'export-classes-tool': () => exportClasses(),
  'export-deadlines-tool': () => exportDeadlines(),
  'export-exams-tool': () => exportExams(),
  'set-weeks': (el) => setPrefs({ semesterWeeks: Math.max(1, Math.min(40, parseInt(el.value, 10) || 10)) })
});
function renderCalendar() {
  return html`
    <div class="cards-2">
      <div class="tool-card">
        <p class="tool-card-title">${icon('calendar-plus')} Llévalo a tu calendario</p>
        <p class="muted small">Archivos .ics para Google Calendar, Apple Calendar u Outlook. Las entregas llevan alarmas 1 día, 3 horas y 30 minutos antes, así tu teléfono te avisa aunque esta página esté cerrada.</p>
        <div class="row-gap wrap">
          <button class="btn btn-primary btn-sm" data-action="export-deadlines-tool">Entregas pendientes</button>
          <button class="btn btn-ghost btn-sm" data-action="export-classes-tool">Horario de clases</button>
          <button class="btn btn-ghost btn-sm" data-action="export-exams-tool">Exámenes</button>
        </div>
        <label class="field-inline"><span class="label">Semanas que se repiten las clases</span>
          <input type="number" min="1" max="40" class="input-num" value="${state.data.prefs.semesterWeeks || 10}" data-change="set-weeks"></label>
      </div>
      <div class="tool-card">
        <p class="tool-card-title">${icon('print')} Imprimir horario</p>
        <p class="muted small">Abre la semana completa en una vista limpia para imprimir o guardar como PDF.</p>
        <a class="btn btn-ghost btn-sm" href="#/semana?print=1">Imprimir semana</a>
      </div>
      <div class="tool-card">
        <p class="tool-card-title">${icon('cloud-arrow-down')} Respaldo de tus datos</p>
        <p class="muted small">Descarga un archivo con tu horario, tareas, notas, calificaciones y ajustes. Guárdalo en un lugar seguro: el archivo no va cifrado.</p>
        <div class="row-gap wrap">
          <button class="btn btn-primary btn-sm" data-action="backup-export">Descargar respaldo</button>
          <label class="btn btn-ghost btn-sm">Restaurar respaldo<input type="file" accept="application/json,.json" class="sr-only" data-change="backup-import"></label>
        </div>
      </div>
    </div>`;
}

on({ 'tools-tab': (el) => { tab = el.value; rerender(); } });

export function renderTools(params) {
  if (params?.get('tab') && TABS.some((t) => t[0] === params.get('tab'))) tab = params.get('tab');
  const body = { pomodoro: renderPomodoro, promedios: renderGrades, faltas: renderAbsences, notas: renderNotes, enlaces: renderLinks, calendario: renderCalendar }[tab]();
  return html`
    <div class="tabs" role="radiogroup" aria-label="Herramienta">
      ${TABS.map(([k, l, ic]) => html`<label class="tab"><input type="radio" name="tool" value="${k}" ${tab === k ? 'checked' : ''} data-change="tools-tab"><span>${icon(ic)} ${l}</span></label>`)}
    </div>
    <div class="tool-body">${body}</div>`;
}
export const afterToolsRender = () => { if (tab === 'pomodoro') pomoUI(); };

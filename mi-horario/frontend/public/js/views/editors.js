// Formularios para crear y editar clases, exámenes y tareas.
import { html, icon } from '../lib/html.js';
import { DAYS, toLocalInput, fromLocalInput, startOfDay, HOUR } from '../lib/time.js';
import { state, createItem, updateItem, deleteItem, subjects } from '../store.js';
import { on, openModal, closeModal, formData, showFormError, withBusy, toast, confirmDialog } from '../ui.js';

export const PALETTE = [
  '#0f766e', '#16a34a', '#15803d', '#059669', '#0891b2', '#2563eb', '#1e40af',
  '#3730a3', '#7c3aed', '#c026d3', '#db2777', '#e11d48', '#dc2626', '#ea580c', '#d97706', '#475569'
];

function colorField(current) {
  const val = PALETTE.includes(current) ? current : current || PALETTE[5];
  return html`
    <fieldset class="field">
      <legend class="label">Color</legend>
      <div class="swatches">
        ${PALETTE.map((c) => html`
          <label class="swatch" style="--sw:${c}">
            <input type="radio" name="color" value="${c}" ${c === val ? 'checked' : ''}>
            <span aria-label="${c}"></span>
          </label>`)}
        <label class="swatch swatch-custom" title="Otro color">
          <input type="radio" name="color" value="custom" ${PALETTE.includes(val) ? '' : 'checked'}>
          <input type="color" name="customColor" value="${val}" aria-label="Elegir otro color">
        </label>
      </div>
    </fieldset>`;
}
const pickColor = (d) => (d.color === 'custom' ? d.customColor : d.color);

function subjectList() {
  const set = new Set([...subjects(), ...state.tasks.map((t) => t.subject), ...state.exams.map((e) => e.subject)]);
  return html`<datalist id="subject-list">${[...set].map((s) => html`<option value="${s}"></option>`)}</datalist>`;
}
const colorForSubject = (s) =>
  state.classes.find((c) => c.subject === s)?.color || state.tasks.find((t) => t.subject === s)?.color || state.exams.find((e) => e.subject === s)?.color;

const head = (title) => html`
  <div class="modal-head"><h2>${title}</h2>
    <button type="button" class="icon-btn" data-action="modal-close" aria-label="Cerrar">${icon('xmark')}</button></div>`;

const actionsRow = (kind, item, saveLabel) => html`
  <p class="form-error" role="alert" hidden></p>
  <div class="modal-actions">
    ${item ? html`<button type="button" class="btn btn-ghost-danger" data-action="editor-delete" data-kind="${kind}" data-id="${item.id}">${icon('trash')} Eliminar</button>` : ''}
    <span class="spacer"></span>
    <button type="button" class="btn btn-ghost" data-action="modal-close">Cancelar</button>
    <button type="submit" class="btn btn-primary">${saveLabel}</button>
  </div>`;

// ---------- Clase ----------
export function openClassEditor(item = null, defaults = {}) {
  const c = item || { weekday: defaults.weekday ?? 1, start: '07:00', end: '09:00', subject: '', room: '', color: PALETTE[5] };
  openModal(html`
    <form data-submit="save-class" data-id="${item?.id || ''}" novalidate>
      ${head(item ? 'Editar clase' : 'Agregar clase')}
      <div class="form-grid">
        <div class="field span-2"><label class="label" for="f-subject">Materia</label>
          <input id="f-subject" name="subject" list="subject-list" required maxlength="80" value="${c.subject}" data-input="autocolor" autocomplete="off"></div>
        <div class="field"><label class="label" for="f-day">Día</label>
          <select id="f-day" name="weekday">${[1, 2, 3, 4, 5, 6, 0].map((d) => html`<option value="${d}" ${d === c.weekday ? 'selected' : ''}>${DAYS[d]}</option>`)}</select></div>
        <div class="field"><label class="label" for="f-room">Aula</label>
          <input id="f-room" name="room" maxlength="30" value="${c.room}" placeholder="411B"></div>
        <div class="field"><label class="label" for="f-start">Empieza</label><input id="f-start" type="time" name="start" required value="${c.start}"></div>
        <div class="field"><label class="label" for="f-end">Termina</label><input id="f-end" type="time" name="end" required value="${c.end}"></div>
        <div class="span-2">${colorField(c.color)}</div>
      </div>
      ${subjectList()}
      ${actionsRow('classes', item, item ? 'Guardar cambios' : 'Agregar clase')}
    </form>`);
}

// ---------- Examen ----------
export function openExamEditor(item = null) {
  const base = startOfDay(Date.now()).getTime() + 24 * HOUR + 7 * HOUR;
  const e = item || { startsAt: base, endsAt: base + 2 * HOUR, subject: '', room: '', color: PALETTE[12], notes: '' };
  openModal(html`
    <form data-submit="save-exam" data-id="${item?.id || ''}" novalidate>
      ${head(item ? 'Editar examen' : 'Agregar examen')}
      <div class="form-grid">
        <div class="field span-2"><label class="label" for="f-subject">Materia</label>
          <input id="f-subject" name="subject" list="subject-list" required maxlength="80" value="${e.subject}" data-input="autocolor" autocomplete="off"></div>
        <div class="field"><label class="label" for="f-start">Empieza</label><input id="f-start" type="datetime-local" name="startsAt" required value="${toLocalInput(e.startsAt)}"></div>
        <div class="field"><label class="label" for="f-end">Termina</label><input id="f-end" type="datetime-local" name="endsAt" required value="${toLocalInput(e.endsAt)}"></div>
        <div class="field span-2"><label class="label" for="f-room">Aula</label><input id="f-room" name="room" maxlength="30" value="${e.room}" placeholder="Por confirmar"></div>
        <div class="field span-2"><label class="label" for="f-notes">Indicaciones</label><textarea id="f-notes" name="notes" rows="2" maxlength="500" placeholder="Material permitido, temas, etc.">${e.notes}</textarea></div>
        <div class="span-2">${colorField(e.color)}</div>
      </div>
      ${subjectList()}
      ${actionsRow('exams', item, item ? 'Guardar cambios' : 'Agregar examen')}
    </form>`);
}

// ---------- Tarea ----------
export function openTaskEditor(item = null, defaults = {}) {
  const now = Date.now();
  const t = item || {
    kind: defaults.kind || 'moodle', subject: '', title: '', color: PALETTE[5], link: '',
    opensAt: now, dueAt: startOfDay(now).getTime() + 7 * 24 * HOUR - 60_000, finalDueAt: null
  };
  openModal(html`
    <form data-submit="save-task" data-id="${item?.id || ''}" novalidate>
      ${head(item ? 'Editar tarea' : 'Nueva tarea')}
      <div class="form-grid">
        <fieldset class="field span-2"><legend class="label">Plataforma</legend>
          <div class="segmented">
            ${[['moodle', 'Moodle'], ['aleks', 'ALEKS'], ['otra', 'Otra']].map(([k, l]) => html`
              <label><input type="radio" name="kind" value="${k}" ${t.kind === k ? 'checked' : ''} data-change="task-kind"><span>${l}</span></label>`)}
          </div></fieldset>
        <div class="field span-2"><label class="label" for="f-title">Título</label>
          <input id="f-title" name="title" required maxlength="200" value="${t.title}" placeholder="3.1 Mapa conceptual"></div>
        <div class="field span-2"><label class="label" for="f-subject">Materia</label>
          <input id="f-subject" name="subject" list="subject-list" required maxlength="80" value="${t.subject}" data-input="autocolor" autocomplete="off"></div>
        <div class="field"><label class="label" for="f-open">Abre</label><input id="f-open" type="datetime-local" name="opensAt" required value="${toLocalInput(t.opensAt)}"></div>
        <div class="field"><label class="label" for="f-due">${t.kind === 'aleks' ? 'Cierra' : 'Entrega'}</label><input id="f-due" type="datetime-local" name="dueAt" required value="${toLocalInput(t.dueAt)}"></div>
        <div class="field span-2 ${t.kind === 'aleks' ? '' : 'is-hidden'}" data-aleks-only>
          <label class="label" for="f-final">Entrega final con plazo extra <span class="hint">(opcional)</span></label>
          <input id="f-final" type="datetime-local" name="finalDueAt" value="${t.finalDueAt ? toLocalInput(t.finalDueAt) : ''}"></div>
        <div class="field span-2"><label class="label" for="f-link">Enlace a la actividad <span class="hint">(opcional)</span></label>
          <input id="f-link" type="url" name="link" maxlength="500" value="${t.link}" placeholder="https://"></div>
        <div class="span-2">${colorField(t.color)}</div>
      </div>
      ${subjectList()}
      ${actionsRow('tasks', item, item ? 'Guardar cambios' : 'Agregar tarea')}
    </form>`);
}

// ---------- Acciones ----------
const label = { classes: 'la clase', exams: 'el examen', tasks: 'la tarea' };

async function save(form, kind, payload) {
  const id = Number(form.dataset.id) || null;
  const btn = form.querySelector('button[type=submit]');
  try {
    await withBusy(btn, () => (id ? updateItem(kind, id, payload) : createItem(kind, payload)));
    closeModal(true);
    toast(id ? 'Cambios guardados.' : `Agregaste ${label[kind]}.`, 'ok', 2500);
  } catch (e) {
    showFormError(form, e);
  }
}

on({
  'save-class': (form) => {
    const d = formData(form);
    return save(form, 'classes', { weekday: Number(d.weekday), start: d.start, end: d.end, subject: d.subject.trim(), room: d.room.trim(), color: pickColor(d) });
  },
  'save-exam': (form) => {
    const d = formData(form);
    return save(form, 'exams', {
      startsAt: fromLocalInput(d.startsAt), endsAt: fromLocalInput(d.endsAt),
      subject: d.subject.trim(), room: d.room.trim(), notes: d.notes.trim(), color: pickColor(d)
    });
  },
  'save-task': (form) => {
    const d = formData(form);
    return save(form, 'tasks', {
      kind: d.kind, title: d.title.trim(), subject: d.subject.trim(), link: d.link.trim(), color: pickColor(d),
      opensAt: fromLocalInput(d.opensAt), dueAt: fromLocalInput(d.dueAt),
      finalDueAt: d.kind === 'aleks' ? fromLocalInput(d.finalDueAt) : null
    });
  },
  'task-kind': (el) => {
    const form = el.form;
    form.querySelector('[data-aleks-only]').classList.toggle('is-hidden', el.value !== 'aleks');
    form.querySelector('label[for=f-due]').textContent = el.value === 'aleks' ? 'Cierra' : 'Entrega';
  },
  autocolor: (el) => {
    const c = colorForSubject(el.value.trim());
    if (!c) return;
    const radio = el.form.querySelector(`input[name=color][value="${CSS.escape(c)}"]`);
    if (radio) radio.checked = true;
    else {
      el.form.querySelector('input[name=color][value=custom]').checked = true;
      el.form.querySelector('input[name=customColor]').value = c;
    }
  },
  'editor-delete': async (el) => {
    const kind = el.dataset.kind;
    const id = Number(el.dataset.id);
    const ok = await confirmDialog({ title: `¿Eliminar ${label[kind]}?`, body: 'Esta acción no se puede deshacer.', confirm: 'Eliminar', danger: true });
    if (!ok) return;
    await deleteItem(kind, id);
    toast('Eliminado.', 'ok', 2500);
  },
  'edit-class': (el) => openClassEditor(state.classes.find((c) => c.id === Number(el.dataset.id))),
  'new-class': (el) => openClassEditor(null, { weekday: el.dataset.day ? Number(el.dataset.day) : undefined }),
  'edit-exam': (el) => openExamEditor(state.exams.find((x) => x.id === Number(el.dataset.id))),
  'new-exam': () => openExamEditor(),
  'edit-task': (el) => openTaskEditor(state.tasks.find((x) => x.id === Number(el.dataset.id))),
  'new-task': (el) => openTaskEditor(null, { kind: el.dataset.kind })
});

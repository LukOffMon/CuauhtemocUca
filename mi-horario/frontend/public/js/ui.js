// Utilidades de interfaz: acciones delegadas (sin onclick en línea, compatible con CSP),
// avisos, ventanas modales, confirmaciones y cuentas regresivas.
import { html, mount, icon } from './lib/html.js';
import { fmtDuration } from './lib/time.js';
import { level } from './lib/schedule.js';

// ---------- Acciones delegadas ----------
const actions = Object.create(null);
export const on = (map) => Object.assign(actions, map);

export function installDelegation(root = document) {
  const run = (attr) => (ev) => {
    const el = ev.target.closest(`[${attr}]`);
    if (!el) return;
    const name = el.getAttribute(attr);
    const fn = actions[name];
    if (!fn) return;
    if (attr === 'data-submit') ev.preventDefault();
    if (attr === 'data-action' && (el.tagName === 'A' && !el.hasAttribute('href'))) ev.preventDefault();
    Promise.resolve(fn(el, ev)).catch((e) => toast(e.message || 'Algo salió mal.', 'danger'));
  };
  root.addEventListener('click', run('data-action'));
  root.addEventListener('change', run('data-change'));
  root.addEventListener('input', run('data-input'));
  root.addEventListener('submit', run('data-submit'));
}

// ---------- Avisos (toasts) ----------
export function toast(message, type = 'info', ms = 6000) {
  const wrap = document.getElementById('toasts');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.setAttribute('role', type === 'danger' ? 'alert' : 'status');
  const text = document.createElement('p');
  text.textContent = message; // textContent: nunca interpreta HTML
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'toast-close';
  btn.setAttribute('aria-label', 'Cerrar aviso');
  btn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  btn.addEventListener('click', () => el.remove());
  el.append(text, btn);
  wrap.append(el);
  setTimeout(() => el.remove(), ms);
}

// ---------- Ventana modal ----------
let modalResolve = null;
export function openModal(template, { wide = false, onClose } = {}) {
  const dlg = document.getElementById('modal');
  dlg.classList.toggle('modal-wide', wide);
  mount(dlg.querySelector('.modal-body'), template);
  dlg._onClose = onClose;
  if (!dlg.open) dlg.showModal();
  const first = dlg.querySelector('[autofocus], input:not([type=hidden]), select, textarea, button.btn-primary');
  first?.focus();
  return dlg;
}
export function closeModal(result) {
  const dlg = document.getElementById('modal');
  if (dlg.open) dlg.close();
  dlg._onClose?.(result);
  dlg._onClose = null;
}

export function confirmDialog({ title, body, confirm = 'Confirmar', danger = false }) {
  return new Promise((resolve) => {
    modalResolve = resolve;
    openModal(html`
      <div class="modal-head"><h2>${title}</h2></div>
      <p class="modal-text">${body}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-action="confirm-no">Cancelar</button>
        <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm-yes">${confirm}</button>
      </div>`, { onClose: (r) => { modalResolve?.(r === true); modalResolve = null; } });
  });
}
on({
  'confirm-yes': () => closeModal(true),
  'confirm-no': () => closeModal(false),
  'modal-close': () => closeModal(false)
});

// ---------- Formularios ----------
export function formData(form) {
  const out = {};
  for (const el of form.elements) {
    if (!el.name || el.disabled) continue;
    if (el.type === 'checkbox') out[el.name] = el.checked;
    else if (el.type === 'radio') { if (el.checked) out[el.name] = el.value; }
    else out[el.name] = el.value;
  }
  return out;
}
export function showFormError(form, err) {
  form.querySelectorAll('.field-error').forEach((n) => n.remove());
  form.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
  const box = form.querySelector('.form-error');
  const fieldName = err.field?.split('.').pop();
  const input = fieldName && form.querySelector(`[name="${CSS.escape(fieldName)}"]`);
  if (input) {
    input.setAttribute('aria-invalid', 'true');
    const p = document.createElement('p');
    p.className = 'field-error';
    p.textContent = err.message;
    input.closest('.field')?.append(p);
    input.focus();
    if (box) box.hidden = true;
  } else if (box) {
    box.textContent = err.message;
    box.hidden = false;
  } else {
    toast(err.message, 'danger');
  }
}
export async function withBusy(btn, fn) {
  if (!btn) return fn();
  const prev = btn.innerHTML;
  btn.disabled = true;
  btn.classList.add('is-busy');
  try { return await fn(); } finally {
    btn.disabled = false;
    btn.classList.remove('is-busy');
    btn.innerHTML = prev;
  }
}

// ---------- Cuentas regresivas ----------
function deadlineChip(opens, due, completed) {
  const now = Date.now();
  if (completed) return { cls: 'chip-done', text: 'Entregada', ic: 'circle-check' };
  if (now < opens) return { cls: 'chip-soon', text: `Abre en ${fmtDuration(opens - now)}`, ic: 'calendar-plus' };
  const ms = due - now;
  const lv = level(ms);
  if (lv === 'over') return { cls: 'chip-over', text: `Venció hace ${fmtDuration(ms)}`, ic: 'triangle-exclamation' };
  return { cls: 'chip-' + lv, text: `Faltan ${fmtDuration(ms)}`, ic: 'hourglass-half' };
}
function examChipState(start, end) {
  const now = Date.now();
  if (now >= end) return { cls: 'chip-done', text: 'Presentado', ic: 'circle-check' };
  if (now >= start) return { cls: 'chip-crit', text: `En curso, termina en ${fmtDuration(end - now)}`, ic: 'pen' };
  return { cls: 'chip-' + level(start - now), text: `Faltan ${fmtDuration(start - now)}`, ic: 'hourglass-half' };
}
const chipHtml = (st) => html`${icon(st.ic)}<span>${st.text}</span>`;

export function countdownChip(d) {
  const st = deadlineChip(d.opensAt, d.due, d.completed);
  return html`<span class="chip ${st.cls}" data-cd="task" data-opens="${d.opensAt}" data-due="${d.due}" data-done="${d.completed ? 1 : 0}">${chipHtml(st)}</span>`;
}
export function examChip(e) {
  const st = examChipState(e.startsAt, e.endsAt);
  return html`<span class="chip ${st.cls}" data-cd="exam" data-start="${e.startsAt}" data-end="${e.endsAt}">${chipHtml(st)}</span>`;
}
export function tickCountdowns(root = document) {
  root.querySelectorAll('[data-cd]').forEach((el) => {
    const st = el.dataset.cd === 'exam'
      ? examChipState(+el.dataset.start, +el.dataset.end)
      : deadlineChip(+el.dataset.opens, +el.dataset.due, el.dataset.done === '1');
    el.className = 'chip ' + st.cls;
    mount(el, chipHtml(st));
  });
}

export function downloadFile(name, content, mime) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

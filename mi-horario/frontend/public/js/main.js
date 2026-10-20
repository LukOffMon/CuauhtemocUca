// Punto de entrada: sesión, navegación, estructura de la app y reloj de actualización.
import { html, icon, mount } from './lib/html.js';
import { todayLabel, fmtDuration } from './lib/time.js';
import { nextDeadline, openPending, level } from './lib/schedule.js';
import * as http from './api.js';
import { state, loadAll, clearState, subscribe, setPrefs, onSaveStatus } from './store.js';
import { installDelegation, on, toast, tickCountdowns, openModal, closeModal } from './ui.js';
import { checkAlerts } from './alerts.js';
import { applyLook, isDark } from './theme.js';
import { renderAuth, setRegistrationOpen } from './views/auth.js';
import { renderToday } from './views/today.js';
import { renderWeek } from './views/week.js';
import { renderTasks, pendingBadgeCount } from './views/tasks.js';
import { renderExams } from './views/exams.js';
import { renderTools, afterToolsRender } from './views/tools.js';
import { renderSettings } from './views/settings.js';
import './views/editors.js';

const APP_VERSION = '3.0.0';
const VIEWS = {
  hoy: { title: 'Hoy', icon: 'calendar-day', render: renderToday },
  semana: { title: 'Semana', icon: 'calendar-week', render: renderWeek },
  pendientes: { title: 'Pendientes', icon: 'list-check', render: renderTasks, badge: true },
  examenes: { title: 'Exámenes', icon: 'file-signature', render: renderExams },
  herramientas: { title: 'Herramientas', icon: 'toolbox', render: renderTools, after: afterToolsRender },
  ajustes: { title: 'Ajustes', icon: 'gear', render: renderSettings, hideInTabbar: true }
};
const CHANGELOG = [
  ['user-lock', 'Tu cuenta, en cualquier dispositivo', 'Inicia sesión y encuentra tu horario, tareas, notas y calificaciones en tu celular o en la computadora.'],
  ['shield-halved', 'Datos cifrados', 'Tus notas, calificaciones, tareas y horario se guardan cifrados en el servidor. Las contraseñas se protegen con bcrypt.'],
  ['pen-to-square', 'Edita todo', 'Agrega o cambia clases, exámenes y tareas desde la app, sin tocar código.'],
  ['timeline', 'Nuevo “Hoy”', 'Ve qué clase toca, cuánto falta y tu día completo con la línea de la hora actual.'],
  ['bell', 'Pendientes con cuenta regresiva', 'Moodle, ALEKS y otras entregas juntas, ordenadas por urgencia, con avisos antes de cada fecha.'],
  ['file-signature', 'Exámenes', 'Fechas, aulas e indicaciones con cuenta regresiva y exportación a tu calendario.']
];

let route = { name: '', params: new URLSearchParams() };
let shellMounted = false;

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [name, qs] = h.split('?');
  return { name: name || '', params: new URLSearchParams(qs || '') };
}
const isTyping = () => {
  const a = document.activeElement;
  return a && ['INPUT', 'SELECT', 'TEXTAREA'].includes(a.tagName) && document.getElementById('view')?.contains(a);
};

// ---------------- Estructura ----------------
function navLinks(cls) {
  return Object.entries(VIEWS)
    .filter(([, v]) => !(cls === 'tab' && v.hideInTabbar))
    .map(([k, v]) => html`
      <a href="#/${k}" class="${cls}-link" data-route="${k}">
        ${icon(v.icon)}<span>${cls === 'tab' && k === 'herramientas' ? 'Más' : v.title}</span>
        ${v.badge ? html`<span class="nav-badge" data-badge hidden></span>` : ''}
      </a>`);
}

function renderShell() {
  mount(document.getElementById('root'), html`
    <a class="skip-link" href="#view">Saltar al contenido</a>
    <div class="shell">
      <aside class="sidebar" aria-label="Navegación principal">
        <a class="brand" href="#/hoy">${icon('graduation-cap')}<span>Mi Horario</span></a>
        <nav class="side-nav">${navLinks('side')}</nav>
        <div class="side-foot">
          <button class="btn btn-moodle btn-block" data-action="open-moodle">${icon('arrow-up-right-from-square')} Abrir Moodle</button>
          <div class="side-user">
            <span class="avatar" data-avatar></span>
            <span class="side-user-name" data-username></span>
            <button class="icon-btn icon-btn-sm" data-action="logout" aria-label="Cerrar sesión" title="Cerrar sesión">${icon('right-from-bracket')}</button>
          </div>
        </div>
      </aside>
      <div class="main-col">
        <header class="topbar">
          <div class="topbar-title">
            <a class="brand brand-mobile" href="#/hoy" aria-label="Mi Horario, ir a Hoy">${icon('graduation-cap')}</a>
            <div><h1 id="view-title" class="view-title"></h1><p class="view-date">${todayLabel()}</p></div>
          </div>
          <div class="topbar-actions">
            <span class="save-status" id="save-status" aria-live="polite"></span>
            <button class="icon-btn mobile-only" data-action="open-moodle" aria-label="Abrir Moodle" title="Abrir Moodle">${icon('arrow-up-right-from-square')}</button>
            <button class="icon-btn" data-action="toggle-dark" aria-label="Cambiar modo claro u oscuro" title="Claro u oscuro"><i data-mode-icon class="fa-solid fa-moon" aria-hidden="true"></i></button>
            <button class="icon-btn" data-action="show-changelog" aria-label="Novedades" title="Novedades">${icon('gift')}</button>
            <a class="icon-btn mobile-only" href="#/ajustes" aria-label="Ajustes" title="Ajustes">${icon('gear')}</a>
          </div>
        </header>
        <a id="urgent" class="urgent" href="#/pendientes" hidden></a>
        <main id="view" class="view" tabindex="-1"></main>
      </div>
      <nav class="tabbar" aria-label="Navegación">${navLinks('tab')}</nav>
    </div>`);
  shellMounted = true;
  updateUserBits();
  applyLook(state.data.prefs);
}

function updateUserBits() {
  const name = state.user?.name || 'Estudiante';
  document.querySelectorAll('[data-username]').forEach((el) => { el.textContent = name; });
  document.querySelectorAll('[data-avatar]').forEach((el) => { el.textContent = name.trim().charAt(0).toUpperCase() || 'E'; });
}

function updateBadges() {
  const n = pendingBadgeCount();
  document.querySelectorAll('[data-badge]').forEach((b) => { b.hidden = n === 0; b.textContent = String(n); });
}

function updateUrgent() {
  const bar = document.getElementById('urgent');
  if (!bar) return;
  const now = Date.now();
  const next = nextDeadline(now);
  const overdue = openPending(now).filter((d) => d.due <= now).length;
  if (next && next.opensAt <= now && next.due - now < 72 * 3600_000) {
    const lv = level(next.due - now);
    bar.className = `urgent urgent-${lv}`;
    mount(bar, html`${icon('bell', lv === 'crit' ? 'fa-shake' : '')}<span class="urgent-text"><strong>${next.subject}</strong>: ${next.title}</span><strong class="urgent-time">${fmtDuration(next.due - now)}</strong>`);
    bar.hidden = false;
  } else if (overdue) {
    bar.className = 'urgent urgent-over';
    mount(bar, html`${icon('triangle-exclamation')}<span class="urgent-text">Tienes ${overdue} ${overdue === 1 ? 'tarea vencida sin marcar' : 'tareas vencidas sin marcar'}</span>`);
    bar.hidden = false;
  } else bar.hidden = true;
}

// ---------------- Vistas ----------------
function renderRoute({ scrollTop = false } = {}) {
  route = parseHash();
  if (!state.user) {
    document.body.classList.add('is-auth');
    shellMounted = false;
    mount(document.getElementById('root'), renderAuth(route.name === 'registro' ? 'register' : 'login'));
    document.getElementById('root').querySelector('[autofocus]')?.focus();
    document.title = 'Mi Horario';
    return;
  }
  document.body.classList.remove('is-auth');
  if (!VIEWS[route.name]) { location.replace('#/hoy'); return; }
  if (!shellMounted) renderShell();
  const v = VIEWS[route.name];
  document.getElementById('view-title').textContent = v.title;
  document.querySelectorAll('[data-route]').forEach((a) => {
    const active = a.dataset.route === route.name;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const view = document.getElementById('view');
  mount(view, v.render(route.params));
  view.dataset.view = route.name;
  v.after?.();
  tickCountdowns(view);
  updateBadges();
  updateUrgent();
  applyLook(state.data.prefs);
  if (scrollTop) { window.scrollTo({ top: 0 }); view.focus({ preventScroll: true }); }
  if (route.name === 'semana' && route.params.get('print') === '1') {
    history.replaceState(null, '', '#/semana');
    setTimeout(() => window.print(), 300);
  }
  if (route.name === 'ajustes' && route.params.get('f') === 'moodle') document.getElementById('s-moodle')?.focus();
}

// ---------------- Sesión ----------------
async function startSession() {
  await loadAll();
  applyLook(state.data.prefs);
  shellMounted = false;
  if (!VIEWS[parseHash().name]) location.replace('#/hoy');
  renderRoute({ scrollTop: true });
  setTimeout(checkAlerts, 1500);
  try {
    if (localStorage.getItem('mh_seen') !== APP_VERSION) setTimeout(showChangelog, 600);
  } catch { /* sin almacenamiento */ }
}

function toLogin() {
  clearState();
  http.setCsrf('');
  shellMounted = false;
  closeModal();
  if (!['entrar', 'registro'].includes(parseHash().name)) location.replace('#/entrar');
  renderRoute();
}

function showChangelog() {
  openModal(html`
    <div class="changelog">
      <div class="changelog-head">
        <p class="changelog-kicker">Versión ${APP_VERSION}</p>
        <h2>Novedades</h2>
      </div>
      <ul class="changelog-list">
        ${CHANGELOG.map(([ic, t, d]) => html`<li>${icon(ic, 'cl-icon')}<div><p class="cl-title">${t}</p><p class="muted small">${d}</p></div></li>`)}
      </ul>
      <div class="modal-actions"><button class="btn btn-primary btn-block" data-action="close-changelog">Entendido</button></div>
    </div>`, { onClose: () => { try { localStorage.setItem('mh_seen', APP_VERSION); } catch { /* */ } } });
}

on({
  logout: async () => {
    try { await http.post('/auth/logout', {}); } catch { /* igual salimos */ }
    toLogin();
    toast('Cerraste sesión.', 'info', 2500);
  },
  'toggle-dark': () => {
    const mode = isDark() ? 'light' : 'dark';
    setPrefs({ mode });
    applyLook(state.data.prefs);
  },
  'show-changelog': () => showChangelog(),
  'close-changelog': () => closeModal(true)
});

// ---------------- Arranque ----------------
async function boot() {
  installDelegation();
  try { applyLook(JSON.parse(localStorage.getItem('mh_look') || '{}')); } catch { applyLook({}); }

  const dlg = document.getElementById('modal');
  dlg.addEventListener('close', () => { const fn = dlg._onClose; dlg._onClose = null; fn?.(false); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeModal(false); }); // clic fuera

  http.setUnauthorizedHandler(() => { if (state.user) { toast('Tu sesión terminó. Inicia sesión de nuevo.', 'warn'); toLogin(); } });

  window.addEventListener('hashchange', () => renderRoute({ scrollTop: true }));
  document.addEventListener('mh:rerender', () => state.user && renderRoute());
  document.addEventListener('mh:login', async (e) => {
    state.user = e.detail.user;
    if (!VIEWS[parseHash().name]) history.replaceState(null, '', '#/hoy');
    await startSession();
    toast(e.detail.isNew ? `Bienvenido, ${state.user.name || 'estudiante'}.` : `Hola, ${state.user.name || 'de nuevo'}.`, 'ok', 3000);
  });
  document.addEventListener('mh:logout', toLogin);
  subscribe(() => { if (state.user && shellMounted) { updateUserBits(); renderRoute(); } });

  onSaveStatus((s) => {
    const el = document.getElementById('save-status');
    if (!el) return;
    el.dataset.state = s;
    el.textContent = s === 'saving' ? 'Guardando…' : s === 'saved' ? 'Guardado' : 'No se pudo guardar';
    if (s === 'saved') setTimeout(() => { if (el.dataset.state === 'saved') el.textContent = ''; }, 2000);
  });

  // Conexión
  const offline = document.getElementById('offline');
  const syncNet = () => { offline.hidden = navigator.onLine; };
  window.addEventListener('online', () => { syncNet(); toast('De nuevo en línea.', 'ok', 2500); });
  window.addEventListener('offline', syncNet);
  syncNet();

  // Reloj: cuentas regresivas cada segundo, alertas cada 30 s, vistas cada minuto.
  let n = 0;
  setInterval(() => {
    if (!state.user) return;
    n++;
    tickCountdowns();
    updateUrgent();
    if (n % 30 === 0) checkAlerts();
    if (n % 60 === 0) {
      updateBadges();
      const t = document.querySelector('.view-date');
      if (t) t.textContent = todayLabel();
      if (['hoy', 'semana', 'pendientes', 'examenes'].includes(route.name) && !isTyping() && !document.getElementById('modal').open) renderRoute();
    }
  }, 1000);

  // ¿Ya hay sesión?
  try {
    const me = await http.get('/auth/me');
    if (!me.user) {
      setRegistrationOpen(me.registrationOpen);
      return toLogin();
    }
    state.user = me.user;
    await startSession();
  } catch (e) {
    if (e.status === 0) {
      mount(document.getElementById('root'), html`<div class="boot-error">${icon('wifi')}<h1>No hay conexión con el servidor</h1>
        <p>Revisa tu internet y vuelve a cargar la página.</p><button class="btn btn-primary" data-action="reload">Volver a intentar</button></div>`);
      return;
    }
    setRegistrationOpen(e.data?.registrationOpen);
    toLogin();
  }
}
on({ reload: () => location.reload() });

boot();

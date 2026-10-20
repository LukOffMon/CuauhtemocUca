// Ajustes: perfil, apariencia, Moodle, alertas, horario, datos y seguridad de la cuenta.
import { html, icon } from '../lib/html.js';
import { state, setPrefs, loadAll, notify as notifyStore } from '../store.js';
import * as http from '../api.js';
import { on, toast, formData, showFormError, withBusy, confirmDialog, downloadFile } from '../ui.js';
import { requestPermission, notifSupported, notify } from '../alerts.js';
import { applyLook, THEMES } from '../theme.js';

const rerender = () => document.dispatchEvent(new CustomEvent('mh:rerender'));
const goLogin = () => document.dispatchEvent(new CustomEvent('mh:logout'));

on({
  'save-profile': async (form) => {
    const d = formData(form);
    try {
      const r = await withBusy(form.querySelector('[type=submit]'), () => http.put('/auth/profile', { name: d.name.trim() }));
      state.user = r.user;
      toast('Nombre guardado.', 'ok', 2500);
      notifyStore();
    } catch (e) { showFormError(form, e); }
  },
  'save-moodle': async (form) => {
    let url = formData(form).moodleUrl.trim();
    if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
    try {
      await withBusy(form.querySelector('[type=submit]'), () => setPrefs({ moodleUrl: url }, { delay: 0 }));
      toast(url ? 'Enlace de Moodle guardado.' : 'Quitaste el enlace de Moodle.', 'ok', 2500);
      rerender();
    } catch (e) {
      showFormError(form, { ...e, message: 'Ese enlace no es válido. Ejemplo: https://moodle.miprepa.edu.mx', field: 'moodleUrl' });
    }
  },
  'set-mode': (el) => { setPrefs({ mode: el.value }); applyLook(state.data.prefs); },
  'set-theme': (el) => { setPrefs({ theme: el.value }); applyLook(state.data.prefs); },
  'set-sound': (el) => setPrefs({ sound: el.checked }),
  'set-notifs': async (el) => {
    if (el.checked) {
      const ok = await requestPermission();
      if (!ok) { el.checked = false; return; }
      await setPrefs({ notifications: true }, { delay: 0 });
      notify('Mi Horario', 'Así se verá una alerta.', 'test');
    } else await setPrefs({ notifications: false }, { delay: 0 });
  },
  'set-recess': (el) => {
    const form = el.closest('[data-recess]');
    const enabled = form.querySelector('[name=recessOn]').checked;
    const start = form.querySelector('[name=recessStart]').value;
    const end = form.querySelector('[name=recessEnd]').value;
    form.querySelectorAll('input[type=time]').forEach((i) => { i.disabled = !enabled; });
    if (enabled && (!start || !end || end <= start)) return toast('El receso debe terminar después de empezar.', 'warn');
    setPrefs({ recess: enabled ? { start, end } : null }).catch((e) => toast(e.message, 'danger'));
  },
  'set-exam-replace': (el) => setPrefs({ examDaysReplaceClasses: el.checked }),

  'backup-export': async () => {
    const data = await http.get('/export');
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    downloadFile(`mi-horario-respaldo-${stamp}.json`, JSON.stringify(data, null, 2), 'application/json');
    toast('Respaldo descargado. Guárdalo en un lugar seguro.', 'ok');
  },
  'backup-import': async (input) => {
    const f = input.files?.[0];
    input.value = '';
    if (!f) return;
    if (f.size > 500_000) return toast('Ese archivo es demasiado grande para ser un respaldo.', 'danger');
    let obj;
    try { obj = JSON.parse(await f.text()); } catch { return toast('Ese archivo no es un respaldo válido.', 'danger'); }
    if (obj?.app !== 'mi-horario') return toast('Ese archivo no es un respaldo de Mi Horario.', 'danger');
    const ok = await confirmDialog({
      title: '¿Restaurar este respaldo?',
      body: 'Se reemplazarán tu horario, exámenes, tareas, notas, calificaciones y ajustes actuales por los del archivo.',
      confirm: 'Restaurar', danger: true
    });
    if (!ok) return;
    const { profile, ...rest } = obj;
    await http.post('/import', rest);
    await loadAll();
    applyLook(state.data.prefs);
    notifyStore();
    toast('Respaldo restaurado.', 'ok');
  },
  'seed-defaults': async () => {
    const ok = await confirmDialog({
      title: '¿Cargar el horario de 5A INF?',
      body: 'Se reemplazarán tus clases, exámenes y tareas por el horario de ejemplo. Tus notas, calificaciones y faltas se conservan.',
      confirm: 'Cargar horario'
    });
    if (!ok) return;
    await http.post('/seed-defaults', {});
    await loadAll();
    notifyStore();
    toast('Horario de 5A INF cargado.', 'ok');
  },
  'reset-content': async () => {
    const ok = await confirmDialog({
      title: '¿Vaciar todo tu contenido?',
      body: 'Se borrarán tu horario, exámenes, tareas, notas, calificaciones, faltas, enlaces y ajustes. Tu cuenta sigue activa.',
      confirm: 'Vaciar todo', danger: true
    });
    if (!ok) return;
    await http.post('/reset', {});
    await loadAll();
    applyLook(state.data.prefs);
    notifyStore();
    toast('Tu contenido se vació.', 'ok');
  },

  'change-password': async (form) => {
    const d = formData(form);
    if (d.newPassword !== d.newPassword2) return showFormError(form, { message: 'Las contraseñas nuevas no coinciden.', field: 'newPassword2' });
    try {
      await withBusy(form.querySelector('[type=submit]'), () => http.post('/auth/password', { currentPassword: d.currentPassword, newPassword: d.newPassword }));
      form.reset();
      toast('Contraseña actualizada. Cerramos tus sesiones en otros dispositivos.', 'ok');
    } catch (e) { showFormError(form, e); }
  },
  'logout-all': async () => {
    const ok = await confirmDialog({ title: '¿Cerrar sesión en todos tus dispositivos?', body: 'Tendrás que volver a iniciar sesión en cada uno, incluido este.', confirm: 'Cerrar sesiones' });
    if (!ok) return;
    await http.post('/auth/logout-all', {});
    goLogin();
  },
  'delete-account': async (form) => {
    const d = formData(form);
    const ok = await confirmDialog({
      title: '¿Eliminar tu cuenta para siempre?',
      body: 'Se borrarán tu cuenta y todos tus datos del servidor. No se puede deshacer. Descarga un respaldo antes si lo quieres conservar.',
      confirm: 'Eliminar cuenta', danger: true
    });
    if (!ok) return;
    try {
      await http.post('/auth/delete-account', { password: d.password });
      toast('Tu cuenta y tus datos se eliminaron.', 'ok');
      goLogin();
    } catch (e) { showFormError(form, e); }
  }
});

export function renderSettings(params) {
  const p = state.data.prefs;
  const focusMoodle = params?.get('f') === 'moodle';
  const perm = notifSupported() ? Notification.permission : 'unsupported';
  return html`
    <div class="settings">
      <section class="set-section">
        <h2 class="set-title">Perfil</h2>
        <form class="set-card" data-submit="save-profile" novalidate>
          <div class="form-grid">
            <div class="field"><label class="label" for="s-name">Nombre</label>
              <input id="s-name" name="name" maxlength="40" value="${state.user?.name || ''}" autocomplete="nickname"></div>
            <div class="field"><label class="label" for="s-email">Correo</label>
              <input id="s-email" value="${state.user?.email || ''}" disabled></div>
          </div>
          <p class="form-error" hidden></p>
          <div class="set-actions"><button class="btn btn-primary" type="submit">Guardar nombre</button></div>
        </form>
      </section>

      <section class="set-section">
        <h2 class="set-title">Apariencia</h2>
        <div class="set-card">
          <p class="label">Modo</p>
          <div class="segmented" role="radiogroup" aria-label="Modo de color">
            ${[['light', 'sun', 'Claro'], ['dark', 'moon', 'Oscuro'], ['auto', 'circle-half-stroke', 'Automático']].map(([k, ic, l]) => html`
              <label><input type="radio" name="mode" value="${k}" ${p.mode === k ? 'checked' : ''} data-change="set-mode"><span>${icon(ic)} ${l}</span></label>`)}
          </div>
          <p class="label">Tema de color</p>
          <div class="themes" role="radiogroup" aria-label="Tema de color">
            ${Object.entries(THEMES).map(([k, t]) => html`
              <label class="theme-opt" style="--a:${t.light};--b:${t.dark};--c:${t.deep}">
                <input type="radio" name="theme" value="${k}" ${p.theme === k ? 'checked' : ''} data-change="set-theme">
                <span class="theme-dot"></span><span class="theme-name">${t.label}</span>
              </label>`)}
          </div>
        </div>
      </section>

      <section class="set-section">
        <h2 class="set-title">Moodle</h2>
        <form class="set-card" data-submit="save-moodle" novalidate>
          <div class="field"><label class="label" for="s-moodle">Enlace de Moodle de tu prepa</label>
            <input id="s-moodle" name="moodleUrl" type="url" inputmode="url" maxlength="500" value="${p.moodleUrl}" placeholder="https://moodle.tuprepa.edu.mx" ${focusMoodle ? 'autofocus' : ''}></div>
          <p class="muted small">Se usa en los botones “Abrir Moodle”.</p>
          <p class="form-error" hidden></p>
          <div class="set-actions"><button class="btn btn-primary" type="submit">Guardar enlace</button></div>
        </form>
      </section>

      <section class="set-section">
        <h2 class="set-title">Alertas</h2>
        <div class="set-card">
          <label class="switch-line">
            <span><strong>Notificaciones del navegador</strong>
              <span class="muted small block">${perm === 'unsupported' ? 'Tu navegador no las permite; los avisos saldrán dentro de la página.'
                : perm === 'denied' ? 'Están bloqueadas en tu navegador. Actívalas en los permisos del sitio.'
                : 'Te avisa 24 h, 3 h, 1 h y 15 min antes de cada entrega mientras la página esté abierta.'}</span></span>
            <input type="checkbox" class="switch" data-change="set-notifs" ${p.notifications && perm === 'granted' ? 'checked' : ''} ${perm === 'unsupported' || perm === 'denied' ? 'disabled' : ''}>
          </label>
          <label class="switch-line">
            <span><strong>Sonido</strong><span class="muted small block">En alertas y al terminar cada bloque de Pomodoro.</span></span>
            <input type="checkbox" class="switch" data-change="set-sound" ${p.sound ? 'checked' : ''}>
          </label>
        </div>
      </section>

      <section class="set-section">
        <h2 class="set-title">Horario</h2>
        <div class="set-card" data-recess>
          <label class="switch-line">
            <span><strong>Receso diario</strong><span class="muted small block">Durante el receso, “Hoy” lo muestra sin importar la clase programada.</span></span>
            <input type="checkbox" class="switch" name="recessOn" data-change="set-recess" ${p.recess ? 'checked' : ''}>
          </label>
          <div class="form-grid">
            <div class="field"><label class="label" for="s-rs">Empieza</label><input id="s-rs" type="time" name="recessStart" value="${p.recess?.start || '10:40'}" data-change="set-recess" ${p.recess ? '' : 'disabled'}></div>
            <div class="field"><label class="label" for="s-re">Termina</label><input id="s-re" type="time" name="recessEnd" value="${p.recess?.end || '11:30'}" data-change="set-recess" ${p.recess ? '' : 'disabled'}></div>
          </div>
          <label class="switch-line">
            <span><strong>Días de examen</strong><span class="muted small block">Mostrar solo los exámenes en “Hoy” cuando hay examen ese día.</span></span>
            <input type="checkbox" class="switch" data-change="set-exam-replace" ${p.examDaysReplaceClasses !== false ? 'checked' : ''}>
          </label>
        </div>
      </section>

      <section class="set-section">
        <h2 class="set-title">Tus datos</h2>
        <div class="set-card">
          <p class="muted small">${icon('lock')} Tus notas, calificaciones, tareas y horario se guardan cifrados en el servidor.</p>
          <div class="row-gap wrap">
            <button class="btn btn-ghost" data-action="backup-export">${icon('download')} Descargar respaldo</button>
            <label class="btn btn-ghost">${icon('upload')} Restaurar respaldo<input type="file" accept="application/json,.json" class="sr-only" data-change="backup-import"></label>
            <button class="btn btn-ghost" data-action="seed-defaults">${icon('calendar-days')} Cargar horario de 5A INF</button>
            <button class="btn btn-ghost-danger" data-action="reset-content">${icon('eraser')} Vaciar contenido</button>
          </div>
        </div>
      </section>

      <section class="set-section">
        <h2 class="set-title">Seguridad</h2>
        <form class="set-card" data-submit="change-password" novalidate>
          <p class="set-sub">Cambiar contraseña</p>
          <div class="form-grid">
            <div class="field span-2"><label class="label" for="s-cp">Contraseña actual</label>
              <input id="s-cp" type="password" name="currentPassword" autocomplete="current-password" required></div>
            <div class="field"><label class="label" for="s-np">Nueva contraseña</label>
              <input id="s-np" type="password" name="newPassword" autocomplete="new-password" minlength="10" required></div>
            <div class="field"><label class="label" for="s-np2">Repite la nueva</label>
              <input id="s-np2" type="password" name="newPassword2" autocomplete="new-password" minlength="10" required></div>
          </div>
          <p class="muted small">Mínimo 10 caracteres. Al cambiarla se cierran tus sesiones en otros dispositivos.</p>
          <p class="form-error" hidden></p>
          <div class="set-actions"><button class="btn btn-primary" type="submit">Cambiar contraseña</button></div>
        </form>
        <div class="set-card">
          <p class="set-sub">Sesiones</p>
          <p class="muted small">¿Iniciaste sesión en una computadora de la escuela y olvidaste salir?</p>
          <div class="set-actions"><button class="btn btn-ghost" data-action="logout-all">${icon('right-from-bracket')} Cerrar sesión en todos los dispositivos</button></div>
        </div>
        <form class="set-card set-danger" data-submit="delete-account" novalidate>
          <p class="set-sub">Eliminar cuenta</p>
          <p class="muted small">Borra tu cuenta y todos tus datos del servidor de forma permanente.</p>
          <div class="field"><label class="label" for="s-dp">Confirma con tu contraseña</label>
            <input id="s-dp" type="password" name="password" autocomplete="current-password" required></div>
          <p class="form-error" hidden></p>
          <div class="set-actions"><button class="btn btn-danger" type="submit">Eliminar mi cuenta</button></div>
        </form>
      </section>
    </div>`;
}

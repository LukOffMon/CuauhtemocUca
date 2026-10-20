// Pantallas de inicio de sesión y registro.
import { html, icon, raw } from '../lib/html.js';
import * as http from '../api.js';
import { on, formData, showFormError, withBusy } from '../ui.js';

let registrationOpen = true;
export const setRegistrationOpen = (v) => { registrationOpen = v !== false; };

function strength(p) {
  let s = 0;
  if (p.length >= 10) s++;
  if (p.length >= 14) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.min(4, s);
}
const STRENGTH = ['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Muy buena'];

on({
  'login-submit': async (form) => {
    const d = formData(form);
    try {
      const r = await withBusy(form.querySelector('[type=submit]'), () => http.post('/auth/login', { email: d.email.trim(), password: d.password }));
      document.dispatchEvent(new CustomEvent('mh:login', { detail: r }));
    } catch (e) {
      form.querySelector('[name=password]').value = '';
      showFormError(form, { message: e.message });
    }
  },
  'register-submit': async (form) => {
    const d = formData(form);
    if (d.password !== d.password2) return showFormError(form, { message: 'Las contraseñas no coinciden.', field: 'password2' });
    try {
      const r = await withBusy(form.querySelector('[type=submit]'), () =>
        http.post('/auth/register', { name: d.name.trim(), email: d.email.trim(), password: d.password, seedDefaults: d.seedDefaults }));
      document.dispatchEvent(new CustomEvent('mh:login', { detail: { ...r, isNew: true } }));
    } catch (e) { showFormError(form, e); }
  },
  'pw-strength': (el) => {
    const s = strength(el.value);
    const meter = el.closest('form').querySelector('.pw-meter');
    meter.dataset.level = el.value ? s : '';
    meter.querySelector('.pw-label').textContent = el.value ? STRENGTH[s] : 'Mínimo 10 caracteres';
  },
  'toggle-pw': (el) => {
    const input = el.closest('.pw-wrap').querySelector('input');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    el.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
    el.querySelector('i').className = `fa-solid fa-${show ? 'eye-slash' : 'eye'}`;
  }
});

const pwField = (id, name, label, autocomplete, extra = '') => html`
  <div class="field"><label class="label" for="${id}">${label}</label>
    <div class="pw-wrap">
      <input id="${id}" type="password" name="${name}" autocomplete="${autocomplete}" required maxlength="200" ${extra ? raw(extra) : ''}>
      <button type="button" class="pw-toggle" data-action="toggle-pw" aria-label="Mostrar contraseña">${icon('eye')}</button>
    </div></div>`;

const sample = [
  ['07:00', 'Filosofía', '#0f766e', 2],
  ['09:00', 'Redes Computacionales', '#db2777', 1],
  ['11:00', 'Videojuegos', '#ea580c', 1],
  ['13:00', 'Cálculo Diferencial', '#16a34a', 2]
];

export function renderAuth(mode = 'login') {
  const isLogin = mode === 'login' || !registrationOpen;
  return html`
    <div class="auth">
      <section class="auth-brand" aria-hidden="true">
        <div class="auth-brand-inner">
          <p class="auth-logo">${icon('graduation-cap')} Mi Horario</p>
          <p class="auth-lede">Tu horario, tus exámenes y cada entrega de Moodle y ALEKS, con la cuenta regresiva a la vista.</p>
          <div class="auth-sample">
            ${sample.map(([t, s, c, h]) => html`<div class="as-block" style="--subject:${c};--h:${h}"><span>${t}</span>${s}</div>`)}
            <div class="as-now"><span>Ahora</span></div>
          </div>
        </div>
      </section>
      <section class="auth-form-wrap">
        <div class="auth-card">
          <p class="auth-logo auth-logo-sm">${icon('graduation-cap')} Mi Horario</p>
          ${registrationOpen ? html`
          <nav class="auth-tabs" aria-label="Acceso">
            <a href="#/entrar" class="${isLogin ? 'is-active' : ''}" ${isLogin ? raw('aria-current="page"') : ''}>Iniciar sesión</a>
            <a href="#/registro" class="${!isLogin ? 'is-active' : ''}" ${!isLogin ? raw('aria-current="page"') : ''}>Crear cuenta</a>
          </nav>` : ''}
          ${isLogin ? html`
            <form data-submit="login-submit" novalidate>
              <h1 class="auth-title">Hola de nuevo</h1>
              <div class="field"><label class="label" for="a-email">Correo</label>
                <input id="a-email" type="email" name="email" autocomplete="email" required maxlength="254" autofocus></div>
              ${pwField('a-pw', 'password', 'Contraseña', 'current-password')}
              <p class="form-error" role="alert" hidden></p>
              <button class="btn btn-primary btn-block btn-lg" type="submit">Iniciar sesión</button>
            </form>` : html`
            <form data-submit="register-submit" novalidate>
              <h1 class="auth-title">Crea tu cuenta</h1>
              <div class="field"><label class="label" for="r-name">Nombre</label>
                <input id="r-name" name="name" autocomplete="given-name" maxlength="40" required autofocus></div>
              <div class="field"><label class="label" for="r-email">Correo</label>
                <input id="r-email" type="email" name="email" autocomplete="email" required maxlength="254"></div>
              ${pwField('r-pw', 'password', 'Contraseña', 'new-password', 'minlength="10" data-input="pw-strength"')}
              <div class="pw-meter" data-level=""><span></span><span></span><span></span><span></span><p class="pw-label small muted">Mínimo 10 caracteres</p></div>
              ${pwField('r-pw2', 'password2', 'Repite la contraseña', 'new-password', 'minlength="10"')}
              <label class="check-line"><input type="checkbox" name="seedDefaults" checked> Empezar con el horario de 5A INF (puedes editarlo después)</label>
              <p class="form-error" role="alert" hidden></p>
              <button class="btn btn-primary btn-block btn-lg" type="submit">Crear cuenta</button>
            </form>`}
          <p class="auth-foot muted small">${icon('lock')} Tus notas, calificaciones y tareas se guardan cifradas en el servidor.</p>
        </div>
      </section>
    </div>`;
}

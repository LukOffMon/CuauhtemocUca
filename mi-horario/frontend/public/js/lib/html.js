// Plantillas seguras contra XSS: todo lo que se interpola se escapa por defecto.
// Solo lo marcado explícitamente con raw() (o el resultado de otra plantilla html``) se inserta tal cual.

class Safe {
  constructor(s) { this.s = s; }
  toString() { return this.s; }
}

const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };
export const esc = (v) => String(v).replace(/[&<>"'`]/g, (c) => MAP[c]);

/** Marca HTML confiable (generado por la propia app, nunca datos del usuario). */
export const raw = (s) => new Safe(String(s));

function render(v) {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Safe) return v.s;
  if (Array.isArray(v)) return v.map(render).join('');
  return esc(v);
}

export function html(strings, ...values) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) out += render(values[i]);
  });
  return new Safe(out);
}

export function mount(el, template) {
  if (!el) return;
  el.innerHTML = render(template);
}

/** Solo acepta colores #rrggbb; cualquier otra cosa se reemplaza por gris (evita inyección en style=""). */
export const cssColor = (c) => (/^#[0-9a-fA-F]{6}$/.test(String(c)) ? c : '#64748b');

/** Solo enlaces http(s); devuelve '' si no es seguro. */
export function safeUrl(u) {
  try {
    const p = new URL(String(u));
    return p.protocol === 'https:' || p.protocol === 'http:' ? p.href : '';
  } catch { return ''; }
}

export const icon = (name, extra = '') => raw(`<i class="fa-solid fa-${name.replace(/[^a-z0-9-]/g, '')} ${extra.replace(/[^a-z0-9- ]/g, '')}" aria-hidden="true"></i>`);
export const iconR = (name, extra = '') => raw(`<i class="fa-regular fa-${name.replace(/[^a-z0-9-]/g, '')} ${extra.replace(/[^a-z0-9- ]/g, '')}" aria-hidden="true"></i>`);

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

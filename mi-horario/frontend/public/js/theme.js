// Temas de color (los valores reales viven en app.css, aquí solo nombres y muestras).
export const THEMES = {
  azul: { label: 'Azul', dark: '#1e3a8a', light: '#3b82f6', deep: '#172554' },
  verde: { label: 'Verde', dark: '#065f46', light: '#10b981', deep: '#022c22' },
  morado: { label: 'Morado', dark: '#4c1d95', light: '#8b5cf6', deep: '#2e1065' },
  rosa: { label: 'Rosa', dark: '#9d174d', light: '#ec4899', deep: '#500724' },
  naranja: { label: 'Naranja', dark: '#7c2d12', light: '#f97316', deep: '#431407' },
  aurora: { label: 'Aurora', dark: '#0f766e', light: '#2dd4bf', deep: '#4c1d95' },
  atardecer: { label: 'Atardecer', dark: '#be123c', light: '#fb7185', deep: '#4c1d95' },
  neon: { label: 'Neón', dark: '#701a75', light: '#d946ef', deep: '#0e7490' },
  oceano: { label: 'Océano', dark: '#075985', light: '#06b6d4', deep: '#0f172a' },
  galaxia: { label: 'Galaxia', dark: '#312e81', light: '#818cf8', deep: '#020617' },
  lava: { label: 'Lava', dark: '#991b1b', light: '#f97316', deep: '#1c0a05' },
  grafito: { label: 'Grafito', dark: '#1f2937', light: '#64748b', deep: '#030712' }
};

const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
let current = { theme: 'azul', mode: 'auto' };

export function applyLook({ theme, mode } = {}) {
  current = { theme: THEMES[theme] ? theme : 'azul', mode: ['light', 'dark', 'auto'].includes(mode) ? mode : 'auto' };
  const dark = current.mode === 'dark' || (current.mode === 'auto' && mq?.matches);
  const root = document.documentElement;
  root.dataset.theme = current.theme;
  root.classList.toggle('dark', Boolean(dark));
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#0d121c' : THEMES[current.theme].dark);
  document.querySelectorAll('[data-mode-icon]').forEach((i) => {
    i.className = `fa-solid fa-${dark ? 'sun' : 'moon'}`;
  });
}
export const isDark = () => document.documentElement.classList.contains('dark');
mq?.addEventListener?.('change', () => { if (current.mode === 'auto') applyLook(current); });

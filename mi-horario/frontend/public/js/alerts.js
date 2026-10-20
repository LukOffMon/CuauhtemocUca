// Avisos antes de cada entrega: 24 h, 3 h, 1 h y 15 min (mientras la página esté abierta).
import { state } from './store.js';
import { openPending } from './lib/schedule.js';
import { HOUR } from './lib/time.js';
import { toast } from './ui.js';

const STEPS = [
  { ms: 24 * HOUR, label: '24 horas' },
  { ms: 3 * HOUR, label: '3 horas' },
  { ms: HOUR, label: '1 hora' },
  { ms: 15 * 60_000, label: '15 minutos' }
];
const KEY = 'mh_notified';

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const save = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* sin almacenamiento */ } };

export const notifSupported = () => 'Notification' in window;
export const notifEnabled = () => notifSupported() && Notification.permission === 'granted' && state.data.prefs.notifications;

export function notify(title, body, tag) {
  if (!notifEnabled()) return;
  try { new Notification(title, { body, tag }); } catch { /* algunos móviles requieren service worker */ }
}

let audio = null;
export function beep(times = 2, freq = 880) {
  if (!state.data.prefs.sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < times; i++) {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      o.connect(g).connect(audio.destination);
      const t0 = audio.currentTime + i * 0.25;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      o.start(t0);
      o.stop(t0 + 0.2);
    }
  } catch { /* audio no disponible sin interacción previa */ }
}

export async function requestPermission() {
  if (!notifSupported()) {
    toast('Tu navegador no permite notificaciones. Los avisos aparecerán dentro de la página.', 'warn');
    return false;
  }
  if (Notification.permission === 'denied') {
    toast('Las notificaciones están bloqueadas. Actívalas en los permisos del sitio de tu navegador.', 'warn', 9000);
    return false;
  }
  const p = await Notification.requestPermission();
  return p === 'granted';
}

export function checkAlerts() {
  if (!state.loaded) return;
  const now = Date.now();
  const sent = load();
  let changed = false;
  for (const d of openPending(now)) {
    const rem = d.due - now;
    if (rem <= 0) continue;
    const crossed = STEPS.filter((s) => rem <= s.ms);
    if (!crossed.length) continue;
    const smallest = crossed[crossed.length - 1];
    const base = `${d.id}:${d.due}:`;
    if (sent[base + smallest.ms]) continue;
    crossed.forEach((s) => { sent[base + s.ms] = now; });
    changed = true;
    const label = `${d.subject}: ${d.title}`;
    toast(`${label} vence en menos de ${smallest.label}.`, smallest.ms <= HOUR ? 'danger' : 'warn', 12000);
    notify(`Vence en menos de ${smallest.label}`, label, `task-${d.id}-${smallest.ms}`);
    beep(smallest.ms <= HOUR ? 3 : 2);
  }
  if (changed) {
    // Limpia registros de más de 60 días.
    for (const [k, v] of Object.entries(sent)) if (now - v > 60 * 24 * HOUR) delete sent[k];
    save(sent);
  }
}

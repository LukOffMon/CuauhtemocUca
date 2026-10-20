// Estado de la app en memoria + sincronización con el servidor.
import * as http from './api.js';

export const state = {
  user: null,
  classes: [],
  exams: [],
  tasks: [],
  data: { prefs: {}, grades: {}, absences: {}, notes: {}, links: [], pomodoro: { date: '', count: 0 } },
  loaded: false
};

const listeners = new Set();
export const subscribe = (fn) => (listeners.add(fn), () => listeners.delete(fn));
export const notify = () => listeners.forEach((fn) => fn(state));

export async function loadAll() {
  const b = await http.get('/bootstrap');
  Object.assign(state, { user: b.user, classes: b.classes, exams: b.exams, tasks: b.tasks, data: b.data, loaded: true });
  cachePrefs();
  return state;
}

export function clearState() {
  Object.assign(state, { user: null, classes: [], exams: [], tasks: [], loaded: false });
}

// Guarda tema/modo en localStorage (dato no sensible) solo para pintar sin parpadeo al cargar.
export function cachePrefs() {
  try {
    localStorage.setItem('mh_look', JSON.stringify({ theme: state.data.prefs.theme, mode: state.data.prefs.mode }));
  } catch { /* almacenamiento no disponible */ }
}

// ---------- Colecciones ----------
const sortFns = {
  classes: (a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start),
  exams: (a, b) => a.startsAt - b.startsAt,
  tasks: (a, b) => a.dueAt - b.dueAt
};

export async function createItem(kind, payload) {
  const item = await http.post(`/${kind}`, payload);
  state[kind].push(item);
  state[kind].sort(sortFns[kind]);
  notify();
  return item;
}
export async function updateItem(kind, id, payload) {
  const item = await http.put(`/${kind}/${id}`, payload);
  state[kind] = state[kind].map((x) => (x.id === id ? item : x)).sort(sortFns[kind]);
  notify();
  return item;
}
export async function deleteItem(kind, id) {
  await http.del(`/${kind}/${id}`);
  state[kind] = state[kind].filter((x) => x.id !== id);
  notify();
}
export async function setTaskCompleted(id, completed) {
  const t = state.tasks.find((x) => x.id === id);
  if (t) t.completed = completed; // optimista
  notify();
  try {
    const item = await http.patch(`/tasks/${id}/complete`, { completed });
    state.tasks = state.tasks.map((x) => (x.id === id ? item : x));
  } catch (e) {
    if (t) t.completed = !completed;
    notify();
    throw e;
  }
}

// ---------- Datos JSON (prefs, grades, …) con guardado diferido ----------
const timers = {};
const saveListeners = new Set();
export const onSaveStatus = (fn) => saveListeners.add(fn);
const emitSave = (s) => saveListeners.forEach((fn) => fn(s));

export function setData(key, value, { delay = 600 } = {}) {
  state.data[key] = value;
  if (key === 'prefs') cachePrefs();
  clearTimeout(timers[key]);
  emitSave('saving');
  return new Promise((resolve, reject) => {
    timers[key] = setTimeout(async () => {
      try {
        state.data[key] = await http.put(`/data/${key}`, state.data[key]);
        emitSave('saved');
        resolve(state.data[key]);
      } catch (e) {
        emitSave('error');
        reject(e);
      }
    }, delay);
  });
}

export const setPrefs = (patch, opts) => setData('prefs', { ...state.data.prefs, ...patch }, opts);

/** Lista de materias (de las clases y tareas) para promedios, faltas y notas. */
export function subjects() {
  const set = new Set();
  state.classes.forEach((c) => set.add(c.subject));
  return [...set];
}

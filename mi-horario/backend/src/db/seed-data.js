// Horario de ejemplo (5A INF, semestre ago–dic 2026) migrado de la versión original.
// Se carga al registrarse si el alumno marca "Empezar con el horario de 5A INF".
import { config } from '../config.js';
import { classes, exams, tasks } from './repo.js';
import { getDb } from './index.js';

export const COLORS = {
  filosofia: '#0f766e', redes: '#db2777', videojuegos: '#ea580c', calculo: '#16a34a',
  investigacion: '#d97706', frances: '#dc2626', dpp: '#3730a3', ecologia: '#e11d48',
  admin: '#2563eb', innovacion: '#1e40af', foto: '#15803d', aleks: '#059669'
};

const S = {
  filo: ['Filosofía', COLORS.filosofia],
  redes: ['Redes Computacionales', COLORS.redes],
  video: ['Diseño y Creación de Videojuegos', COLORS.videojuegos],
  calc: ['Cálculo Diferencial', COLORS.calculo],
  inv: ['Fundamentos de la Investigación', COLORS.investigacion],
  fr: ['Francés - Nivel 1 - Básico', COLORS.frances],
  dpp: ['Desarrollo Personal y Profesional', COLORS.dpp],
  eco: ['Ecología', COLORS.ecologia],
  admin: ['Administración', COLORS.admin],
  innov: ['Innovación y Creatividad V', COLORS.innovacion],
  foto: ['Paraescolares - Fotografía', COLORS.foto]
};

// [día, inicio, fin, materia, aula]
const CLASSES = [
  [1, '07:00', '09:00', S.filo, '411B'], [1, '09:00', '10:00', S.redes, '411B'], [1, '11:00', '12:00', S.video, '411B'], [1, '13:00', '15:00', S.calc, '411B'],
  [2, '07:00', '09:00', S.filo, '411B'], [2, '09:00', '11:00', S.video, '411B'], [2, '11:00', '13:00', S.inv, '411B'], [2, '13:00', '15:00', S.fr, '409B'],
  [3, '07:00', '09:00', S.dpp, '411B'], [3, '09:00', '11:00', S.calc, '411B'], [3, '11:00', '13:00', S.eco, '411B'], [3, '13:00', '15:00', S.admin, '411B'],
  [4, '07:00', '09:00', S.innov, '411B'], [4, '09:00', '11:00', S.video, '411B'], [4, '11:00', '13:00', S.redes, '411B'], [4, '13:00', '15:00', S.fr, '409B'],
  [5, '07:00', '09:00', S.redes, '411B'], [5, '09:00', '11:00', S.eco, '411B'], [5, '11:00', '13:00', S.admin, '411B'], [5, '13:00', '15:00', S.foto, '409B']
];

// Semana de exámenes del segundo parcial: 19–23 de octubre de 2026. [fecha, inicio, fin, materia]
const EXAMS = [
  ['2026-10-19', '07:00', '09:00', S.filo], ['2026-10-19', '13:00', '15:00', S.calc],
  ['2026-10-20', '11:00', '13:00', S.inv], ['2026-10-20', '13:00', '15:00', ['Lengua Extranjera V', COLORS.frances]],
  ['2026-10-21', '07:00', '09:00', S.dpp], ['2026-10-21', '13:00', '15:00', S.admin],
  ['2026-10-22', '07:00', '09:00', S.innov], ['2026-10-22', '09:00', '11:00', S.video], ['2026-10-22', '11:00', '13:00', S.redes],
  ['2026-10-23', '09:00', '11:00', S.eco], ['2026-10-23', '13:00', '15:00', ['Educación Física y Artística V', COLORS.foto]]
];

// ALEKS: [nombre, abre, cierra, entrega final]
const ALEKS = [
  ['Tarea 5', '2026-09-28 00:00', '2026-10-11 23:59', '2026-10-18 23:59'],
  ['Tarea 6', '2026-10-05 00:00', '2026-10-18 23:59', null],
  ['Tarea 7', '2026-10-12 00:00', '2026-10-18 23:59', null],
  ['Tarea 8', '2026-10-26 00:00', '2026-11-08 23:59', '2026-11-22 23:59'],
  ['Tarea 9', '2026-11-02 00:00', '2026-11-15 23:59', '2026-11-22 23:59'],
  ['Tarea 10', '2026-11-09 00:00', '2026-11-22 23:59', null],
  ['Tarea 11', '2026-11-16 00:00', '2026-11-22 23:59', null]
];

const W1 = ['2026-10-26 06:00', '2026-11-01 22:59'];
const W2 = ['2026-11-02 06:00', '2026-11-08 22:59'];
const W3 = ['2026-11-09 06:00', '2026-11-15 22:59'];
const W4 = ['2026-11-16 06:00', '2026-11-22 22:59'];
// Moodle, tercer parcial: [materia, título, semana]
const MOODLE = [
  [S.admin, '3.1. Simulación de un proceso administrativo', W1],
  [S.admin, '3.2. Análisis comparativo de estructuras organizacionales', W2],
  [S.admin, '3.3. Diseño de indicadores para el control administrativo', W3],
  [S.calc, '3.1 Evidencias. Comportamiento de una función', W1],
  [S.calc, '3.2 Evidencia de Actividades Semanales en ALEKS', W4],
  [S.calc, '3.3 Evaluación sumativa de la Unidad III: Ejercicios guía para el examen parcial', W4],
  [S.dpp, '3.1 Reconoce tus fortalezas personales', W1],
  [S.dpp, '3.2 Identifica tus intereses y valores personales', W2],
  [S.dpp, '3.3 Construye tu proyecto de vida académico y profesional', W3],
  [S.eco, '3.1 Investigación y reflexión. Contaminación del suelo y del agua en mi comunidad', W1],
  [S.eco, '3.2 Línea del tiempo y análisis del crecimiento poblacional', W2],
  [S.eco, '3.3 Adaptación al cambio climático: Propuesta para una comunidad más resiliente', W3],
  [S.filo, '3.1 Mapa conceptual: Modernidad y Posmodernidad', W1],
  [S.filo, '3.2 Análisis de caso: La existencia auténtica e inauténtica', W2],
  [S.filo, '3.3. Ensayo argumentativo: El poder y la construcción de la identidad', W3],
  [S.inv, '3.1. Comparando el método inductivo y deductivo', W1],
  [S.inv, '3.2. Modelos cualitativo y cuantitativo en la investigación', W2],
  [S.inv, '3.3. Selección del método y modelo de investigación para un caso', W3]
];

/** "2026-10-26 06:00" en la zona del semestre → milisegundos UTC. */
function local(s) {
  const iso = s.replace(' ', 'T') + ':00' + config.seedTzOffset;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) throw new Error('Fecha de ejemplo inválida: ' + s);
  return ms;
}
const toMin = (s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));

export function seedUser(userId) {
  const db = getDb();
  db.transaction(() => {
    for (const [weekday, start, end, [subject, color], room] of CLASSES) {
      classes.create(userId, { weekday, start, end, startMin: toMin(start), endMin: toMin(end), subject, room, color });
    }
    for (const [date, start, end, [subject, color]] of EXAMS) {
      exams.create(userId, {
        startsAt: local(`${date} ${start}`), endsAt: local(`${date} ${end}`),
        subject, color, room: '', notes: ''
      });
    }
    for (const [name, opens, closes, final] of ALEKS) {
      tasks.create(userId, {
        kind: 'aleks', subject: 'Cálculo Diferencial (ALEKS)', title: name, color: COLORS.aleks, link: 'https://www.aleks.com/',
        opensAt: local(opens), dueAt: local(closes), finalDueAt: final ? local(final) : null
      });
    }
    for (const [[subject, color], title, [opens, due]] of MOODLE) {
      tasks.create(userId, { kind: 'moodle', subject, title, color, link: '', opensAt: local(opens), dueAt: local(due), finalDueAt: null });
    }
  })();
}

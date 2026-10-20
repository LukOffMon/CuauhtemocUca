// Vista "Hoy": qué toca ahora y el riel del día con la línea de la hora actual.
import { html, icon, cssColor, plural } from '../lib/html.js';
import { DAYS, fmtMinutes, nowMin, addDays, startOfDay, minToHHMM, relativeDay, sameDay, fmtTime } from '../lib/time.js';
import { currentStatus, itemsForDate, recessFor, openPending, examsOn, isExamDay } from '../lib/schedule.js';
import { state, setPrefs } from '../store.js';
import { countdownChip, on, toast } from '../ui.js';
import * as http from '../api.js';

const DEFAULT_GEO = { lat: 21.8853, lon: -102.2916, label: 'Aguascalientes' };

function heroFor(st, now) {
  const nm = nowMin(now);
  const nextLine = st.next
    ? html`<p class="hero-next">${icon('arrow-turn-down', 'fa-rotate-270')} Después: <strong>${st.next.item.subject}</strong>
        ${sameDay(st.next.day, now) ? '' : relativeDay(st.next.day.getTime()) + ','} a las ${st.next.item.start}
        <span class="muted">(en ${fmtMinutes((st.next.at - now) / 60000)})</span></p>`
    : '';

  if (st.state === 'class') {
    const c = st.current;
    const pct = ((nm - c.startMin) / (c.endMin - c.startMin)) * 100;
    return html`
      <section class="hero" style="--subject:${cssColor(c.color)}" aria-live="polite">
        <p class="hero-kicker">${c.isExam ? 'Estás en examen' : 'Estás en clase'}, hasta las ${c.end}${c.room ? html`, aula <strong>${c.room}</strong>` : ''}</p>
        <h1 class="hero-title">${c.subject}</h1>
        <div class="hero-progress" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance de la clase">
          <span style="width:${pct.toFixed(1)}%"></span></div>
        <p class="hero-meta">Quedan ${fmtMinutes(c.endMin - nm)}</p>
        ${nextLine}
      </section>`;
  }
  const simple = (kicker, title, tone = '') => html`
    <section class="hero ${tone}" aria-live="polite">
      <p class="hero-kicker">${kicker}</p>
      <h1 class="hero-title">${title}</h1>
      ${nextLine}
    </section>`;
  switch (st.state) {
    case 'recess': return simple(`Hasta las ${st.recess.end}`, 'Receso', 'hero-recess');
    case 'before': return simple(`Hoy entras a las ${st.items[0].start}`, 'Aún no empiezan tus clases', 'hero-calm');
    case 'gap': return simple('Hora libre', 'No tienes clase ahorita', 'hero-calm');
    case 'after': return simple(isExamDay(now) ? 'Presentaste tus exámenes de hoy' : 'Buen trabajo hoy', 'Terminaste por hoy', 'hero-calm');
    case 'weekend': return simple(`Es ${DAYS[now.getDay()].toLowerCase()}`, 'Sin clases, disfruta el fin de semana', 'hero-calm');
    default: return simple('Hoy', 'Sin clases registradas', 'hero-calm');
  }
}

function rail(day, now) {
  const items = itemsForDate(day);
  if (!items.length) {
    return html`<div class="empty"><p>No hay clases este día.</p>
      <button class="btn btn-ghost" data-action="new-class" data-day="${day.getDay()}">${icon('plus')} Agregar clase</button></div>`;
  }
  const recess = recessFor(day);
  const first = Math.min(...items.map((i) => i.startMin), recess?.startMin ?? 1440);
  const last = Math.max(...items.map((i) => i.endMin), recess?.endMin ?? 0);
  const start = Math.floor(first / 60) * 60;
  const end = Math.ceil(last / 60) * 60;
  const k = 1.15; // px por minuto
  const y = (m) => ((m - start) * k).toFixed(1);
  const isToday = sameDay(day, now);
  const nm = nowMin(now);
  const hours = [];
  for (let m = start; m <= end; m += 60) hours.push(m);

  return html`
    <div class="rail" style="height:${((end - start) * k).toFixed(0)}px">
      ${hours.map((m) => html`<div class="rail-hour" style="top:${y(m)}px"><span>${minToHHMM(m)}</span></div>`)}
      ${recess ? html`<div class="rail-recess" style="top:${y(recess.startMin)}px;height:${((recess.endMin - recess.startMin) * k).toFixed(1)}px">
          <span>${icon('mug-hot')} Receso ${recess.start}–${recess.end}</span></div>` : ''}
      ${items.map((it) => {
        const active = isToday && nm >= it.startMin && nm < it.endMin;
        const past = isToday && nm >= it.endMin;
        const h = (it.endMin - it.startMin) * k;
        return html`
          <button type="button" class="rail-block ${active ? 'is-now' : ''} ${past ? 'is-past' : ''} ${h < 60 ? 'is-short' : ''}"
            style="top:${y(it.startMin)}px;height:${(h - 4).toFixed(1)}px;--subject:${cssColor(it.color)}"
            data-action="${it.isExam ? 'edit-exam' : 'edit-class'}" data-id="${it.ref.id}"
            aria-label="${it.subject}, ${it.start} a ${it.end}${active ? ', ahora' : ''}">
            <span class="rail-time">${it.start}–${it.end}</span>
            <span class="rail-subject">${it.isExam ? html`${icon('file-signature')} ` : ''}${it.subject}</span>
            ${it.room ? html`<span class="rail-room">${icon('door-open')} ${it.room}</span>` : ''}
          </button>`;
      })}
      ${isToday && nm >= start && nm <= end ? html`<div class="rail-now" style="top:${y(nm)}px" aria-hidden="true"><span>${minToHHMM(Math.floor(nm))}</span></div>` : ''}
    </div>`;
}

function upcomingList(now) {
  const list = openPending(now.getTime()).slice(0, 4);
  if (!list.length) {
    return html`<div class="side-card"><h2 class="side-title">Entregas</h2>
      <p class="muted">${icon('circle-check', 'ok')} No tienes entregas pendientes.</p></div>`;
  }
  return html`
    <div class="side-card">
      <h2 class="side-title">Próximas entregas</h2>
      <ul class="mini-list">
        ${list.map((d) => html`
          <li style="--subject:${cssColor(d.color)}">
            <a href="#/pendientes" class="mini-item">
              <span class="mini-subject">${d.subject}</span>
              <span class="mini-title">${d.title}</span>
              ${countdownChip(d)}
            </a>
          </li>`)}
      </ul>
      <a class="link-more" href="#/pendientes">Ver todas las entregas</a>
    </div>`;
}

function examNotice(now) {
  const soon = state.exams.filter((e) => e.endsAt > now.getTime() && e.startsAt - now.getTime() < 7 * 86400_000);
  if (!soon.length) return '';
  const today = examsOn(now).filter((e) => e.endsAt > now.getTime());
  return html`
    <a class="side-card notice-exam" href="#/examenes">
      <p class="side-title">${icon('file-signature')} Semana de exámenes</p>
      <p>${today.length ? `Hoy presentas ${plural(today.length, 'examen', 'exámenes')}.` : `Tienes ${plural(soon.length, 'examen', 'exámenes')} en los próximos 7 días.`}</p>
      <span class="link-more">Ver horario de exámenes</span>
    </a>`;
}

// ---------- Clima ----------
let weatherCache = { key: '', at: 0, data: null, failed: false };
function weatherInfo(code) {
  if (code === 0) return ['sun', 'Despejado'];
  if (code <= 2) return ['cloud-sun', 'Parcialmente nublado'];
  if (code === 3) return ['cloud', 'Nublado'];
  if (code <= 48) return ['smog', 'Neblina'];
  if (code <= 57) return ['cloud-rain', 'Llovizna'];
  if (code <= 67) return ['cloud-showers-heavy', 'Lluvia'];
  if (code <= 77) return ['snowflake', 'Nieve'];
  if (code <= 82) return ['cloud-showers-heavy', 'Chubascos'];
  if (code <= 86) return ['snowflake', 'Nevada'];
  return ['cloud-bolt', 'Tormenta'];
}
function weatherCard() {
  const geo = state.data.prefs.location || DEFAULT_GEO;
  const key = `${geo.lat},${geo.lon}`;
  if (weatherCache.key !== key || Date.now() - weatherCache.at > 10 * 60_000) {
    weatherCache = { key, at: Date.now(), data: null, failed: false };
    http.get(`/weather?lat=${encodeURIComponent(geo.lat)}&lon=${encodeURIComponent(geo.lon)}`)
      .then((d) => { weatherCache.data = d; document.dispatchEvent(new CustomEvent('mh:rerender')); })
      .catch(() => { weatherCache.failed = true; });
  }
  const d = weatherCache.data;
  if (!d) return '';
  const now = Date.now();
  const maxP = Math.max(0, ...d.hourly.filter((h) => h.t >= now - 3600_000 && h.t <= now + 6 * 3600_000).map((h) => h.p));
  const [ic, desc] = weatherInfo(d.code);
  return html`
    <div class="side-card weather">
      <div class="weather-row">
        ${icon(ic, 'weather-icon')}
        <div>
          <p class="weather-temp">${Math.round(d.temperature)}°C <span class="muted">${desc}</span></p>
          <p class="muted small">${geo.label}. Lluvia en las próximas 6 h: ${maxP}%</p>
        </div>
        <button type="button" class="icon-btn" data-action="toggle-geo"
          aria-label="${state.data.prefs.location ? 'Volver a ' + DEFAULT_GEO.label : 'Usar mi ubicación'}"
          title="${state.data.prefs.location ? 'Volver a ' + DEFAULT_GEO.label : 'Usar mi ubicación'}">
          ${icon(state.data.prefs.location ? 'rotate-left' : 'location-crosshairs')}</button>
      </div>
      ${maxP >= 50 ? html`<p class="weather-warn">${icon('umbrella')} Hay buena probabilidad de lluvia: lleva paraguas.</p>` : ''}
    </div>`;
}

on({
  'toggle-geo': () => {
    if (state.data.prefs.location) return setPrefs({ location: null }, { delay: 0 }).then(() => document.dispatchEvent(new CustomEvent('mh:rerender')));
    if (!navigator.geolocation) return toast('Tu navegador no permite obtener la ubicación.', 'warn');
    navigator.geolocation.getCurrentPosition(
      (pos) => setPrefs({ location: { lat: +pos.coords.latitude.toFixed(2), lon: +pos.coords.longitude.toFixed(2), label: 'Mi ubicación' } }, { delay: 0 })
        .then(() => document.dispatchEvent(new CustomEvent('mh:rerender'))),
      () => toast('No se pudo obtener tu ubicación.', 'warn')
    );
  }
});

export function renderToday() {
  const now = new Date();
  const st = currentStatus(now);
  // Fin de semana o día sin clases: el riel muestra el siguiente día con clases.
  let railDay = startOfDay(now);
  let railNote = '';
  if (!itemsForDate(railDay).length) {
    for (let i = 1; i <= 7; i++) {
      const d = addDays(railDay, i);
      if (itemsForDate(d).length) { railDay = d; railNote = `Mostrando ${relativeDay(d.getTime())}`; break; }
    }
  }
  const exam = isExamDay(railDay);
  return html`
    <div class="today-grid">
      <div class="today-main">
        ${heroFor(st, now)}
        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">${railNote ? DAYS[railDay.getDay()] : 'Tu día'}</h2>
            <span class="muted small">${railNote || (exam ? 'Día de examen: no hay clases normales' : `Actualizado ${fmtTime(now.getTime())}`)}</span>
          </div>
          ${exam ? html`<p class="callout callout-danger">${icon('file-signature')} Hoy presentas examen. Confirma aula e indicaciones con tu docente o Coordinación.</p>` : ''}
          ${rail(railDay, now)}
        </section>
      </div>
      <aside class="today-side">
        ${examNotice(now)}
        ${upcomingList(now)}
        ${weatherCard()}
      </aside>
    </div>`;
}

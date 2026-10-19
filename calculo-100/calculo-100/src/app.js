(function () {
  'use strict';
  var D = window.__DATA__;
  var EX = D.exercises;
  var byId = {};
  EX.forEach(function (e) { byId[e.id] = e; });
  var APPEX = EX.filter(function (e) { return e.group === 'app'; });
  var DEREX = EX.filter(function (e) { return e.group === 'der'; });
  var $app = document.getElementById('app');
  var $tabs = document.getElementById('tabs');

  /* ------------------------------------------------------------------ utils */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function tex(t, display) {
    try { return window.katex.renderToString(t, { displayMode: !!display, throwOnError: false, strict: 'ignore' }); }
    catch (e) { return '<code>' + esc(t) + '</code>'; }
  }
  function plain(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function rich(s) {
    return String(s).split(/(\$[^$]+\$)/g).map(function (p) {
      return (p.length > 2 && p.charAt(0) === '$' && p.charAt(p.length - 1) === '$') ? tex(p.slice(1, -1)) : plain(p);
    }).join('');
  }
  function store(key, val) {
    try {
      if (val === undefined) { var v = window.localStorage.getItem('calc100.' + key); return v ? JSON.parse(v) : null; }
      window.localStorage.setItem('calc100.' + key, JSON.stringify(val));
    } catch (e) { /* almacenamiento no disponible: la app funciona igual */ }
    return null;
  }
  function parseNum(s) {
    s = String(s || '').trim().replace(',', '.').replace(/\s+/g, '');
    var m = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
    return parseFloat(s);
  }
  function fmt(n) {
    if (!isFinite(n)) return String(n);
    var r = Math.round(n * 1e6) / 1e6;
    return String(r);
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function close(a, b) { return Math.abs(a - b) <= Math.max(0.011, 0.002 * Math.abs(b)); }

  /* ------------------------------------------------------------------ state */
  var S = {
    route: 'hub',
    hub: { open: null, step: 1 },
    solver: { id: 'app1', shown: 1 },
    exam: null,
    cheat: { q: '', cat: 'Todas' },
    checks: store('checks') || {}
  };
  var timer = null;
  var TABS = [['hub', 'Mastery Hub'], ['solver', 'Solucionador'], ['exam', 'Simulador 100/100'], ['cheat', 'Formulario']];

  /* ------------------------------------------------------------ shared UI */
  function stepsHTML(e, shown) {
    var out = '<div class="stepper">';
    e.steps.slice(0, shown).forEach(function (s) {
      out += '<div class="step"><h3>' + esc(s.t) + '</h3>' + (s.tex ? tex(s.tex, true) : '') +
        (s.note ? '<div class="callout ' + (s.kind === 'warn' ? 'warn' : '') + '"><b class="k">' + (s.kind === 'warn' ? 'Atención' : 'Tip') + '</b>' + rich(s.note) + '</div>' : '') + '</div>';
    });
    return out + '</div>';
  }
  function answerHTML(e) {
    return '<div class="answer"><span class="pill">Resultado final</span>' + tex((e.group === 'der' ? e.label.replace('(x)', "'(x)") + '=' : '') + e.answer, true) + '</div>';
  }

  /* ------------------------------------------------------------------ HUB */
  function viewHub() {
    var best = store('best_train') || store('best_press');
    var h = '<h1>Mastery Hub</h1><p class="lead">Cada tipo de problema del repaso se resuelve con la misma rutina de 4 pasos: <b>fórmula</b>, <b>partes</b>, <b>sustitución</b> y <b>simplificación</b>. Elige una estrategia y recórrela paso a paso.</p>';
    h += '<div class="stats"><div class="stat"><b>' + EX.length + '</b><span>ejercicios de la guía</span></div><div class="stat"><b>' + D.hub.length + '</b><span>estrategias</span></div><div class="stat"><b>' + D.quiz.length + '</b><span>preguntas de examen</span></div>' +
      (best ? '<div class="stat"><b>' + best + '/100</b><span>mejor simulacro</span></div>' : '') + '</div>';
    if (S.hub.open) {
      var c = D.hub.filter(function (x) { return x.id === S.hub.open; })[0];
      var n = D.hubLabels.length, k = S.hub.step;
      h += '<section class="card" style="margin-bottom:18px"><div class="row" style="justify-content:space-between"><div><span class="pill">Estrategia</span><h2>' + esc(c.title) + '</h2></div><button class="btn ghost" data-a="hub-close">Cerrar</button></div>';
      h += '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + k + '"><i style="width:' + (100 * k / n) + '%"></i></div><div class="stepper mt">';
      c.steps.slice(0, k).forEach(function (s, i) {
        h += '<div class="step"><h3>' + esc(D.hubLabels[i]) + '</h3>' + tex(s[0], true) + '<div class="callout">' + rich(s[1]) + '</div></div>';
      });
      h += '</div><div class="row mt">' +
        (k < n ? '<button class="btn primary" data-a="hub-next">Siguiente paso (' + k + '/' + n + ')</button><button class="btn" data-a="hub-all">Mostrar todo</button>' : '<button class="btn" data-a="hub-reset">Reiniciar</button>') + '</div>';
      h += '<div class="callout warn mt"><b class="k">Errores típicos</b><ul style="margin:6px 0 0;padding-left:18px">' + c.pitfalls.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul></div>';
      h += '<div class="row mt"><span class="muted">Practícalo en el solucionador:</span>' + c.examples.map(function (id) { return '<button class="chip" data-a="open-ex" data-id="' + id + '">' + esc(byId[id].label) + '</button>'; }).join('') + '</div></section>';
    }
    h += '<div class="grid g3">' + D.hub.map(function (c) {
      return '<button class="card hubcard' + (S.hub.open === c.id ? ' on' : '') + '" data-a="hub-open" data-id="' + c.id + '"><div class="glyph">' + tex(c.glyph) + '</div><h3>' + esc(c.title) + '</h3><span class="muted" style="font-size:.88rem">' + rich(c.summary) + '</span></button>';
    }).join('') + '</div>';
    $app.innerHTML = h;
  }

  /* --------------------------------------------------------------- SOLVER */
  function viewSolver() {
    var e = byId[S.solver.id], sh = Math.min(S.solver.shown, e.steps.length), n = e.steps.length;
    function list(arr) {
      return arr.map(function (x) {
        return '<button class="item" data-a="solver-pick" data-id="' + x.id + '"' + (x.id === e.id ? ' aria-current="true"' : '') + '><span>' + esc(x.label) + '</span></button>';
      }).join('');
    }
    var h = '<h1>Solucionador y Verificador</h1><p class="lead">Elige un ejercicio de la guía, intenta resolverlo tú primero y despliega el procedimiento paso a paso. Después verifica tu resultado.</p>';
    h += '<div class="split"><aside class="card side" aria-label="Ejercicios"><h3>Problemas de aplicación</h3><div class="list">' + list(APPEX) + '</div><h3>Derivadas a(x) – r(x)</h3><div class="list">' + list(DEREX) + '</div></aside>';
    h += '<section><div class="card"><span class="pill">' + esc(e.tag) + '</span><h2>' + esc(e.label) + '</h2><div class="statement">' + tex(e.statement, true) + '</div>';
    h += '<div class="progress mt" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + sh + '"><i style="width:' + (100 * sh / n) + '%"></i></div><div class="mt">' + stepsHTML(e, sh) + '</div>';
    h += '<div class="row mt">' + (sh < n ? '<button class="btn primary" data-a="solver-next">Siguiente paso (' + sh + '/' + n + ')</button><button class="btn" data-a="solver-all">Mostrar todo</button>' : '<button class="btn" data-a="solver-reset">Ocultar pasos</button>') + '</div>';
    if (sh >= n) h += answerHTML(e);
    h += '</div>';
    // verificador
    h += '<div class="card verify"><span class="pill">Verificador</span><h3>Comprueba tu resultado</h3>';
    if (e.group === 'der') {
      h += '<p class="muted" style="margin:0 0 10px">Evalúa TU derivada en un punto x₀ y escribe el número. La app lo compara con la derivada correcta y con una derivada numérica independiente.</p>';
      h += '<div class="row"><label>x₀ = <input id="v-x0" type="number" step="any" value="' + e.x0 + '" style="width:110px"></label><label>Tu ' + esc(e.label.replace('(x)', "′(x₀)")) + ' = <input id="v-mine" type="text" inputmode="decimal" placeholder="ej. 12.5" style="width:150px"></label><button class="btn primary" data-a="verify">Verificar</button></div>';
    } else {
      h += '<div class="row"><label>' + esc(e.valLabel) + ' = <input id="v-mine" type="text" inputmode="decimal" placeholder="ej. -7" style="width:150px"></label><button class="btn primary" data-a="verify">Verificar</button></div>';
    }
    h += '<div class="out" id="v-out" role="status"></div></div></section></div>';
    $app.innerHTML = h;
  }
  function doVerify() {
    var e = byId[S.solver.id], out = document.getElementById('v-out');
    var mine = parseNum(document.getElementById('v-mine').value);
    var html = '';
    if (isNaN(mine)) { out.innerHTML = '<div class="callout warn">Escribe un número (puedes usar decimales o fracciones como 3/4).</div>'; return; }
    if (e.group === 'der') {
      var x0 = parseFloat(document.getElementById('v-x0').value);
      var f, df;
      try { f = new Function('return ' + e.js_f)(); df = new Function('return ' + e.js_df)(); } catch (err) { out.textContent = 'Error interno del verificador.'; return; }
      var ref = df(x0), hh = 1e-5, num = (f(x0 + hh) - f(x0 - hh)) / (2 * hh);
      if (!isFinite(ref) || !isFinite(num)) { out.innerHTML = '<div class="callout warn">x₀ = ' + esc(x0) + ' no está en el dominio de la función. Prueba con otro valor.</div>'; return; }
      var ok = close(mine, ref);
      html = '<div class="callout ' + (ok ? 'good' : 'bad') + '">' + (ok ? '✔ ¡Coincide! Tu derivada vale lo mismo que la correcta en x₀.' : '✘ No coincide. Revisa signos, exponentes y la regla de la cadena.') + '</div>' +
        '<div class="mt">Correcto: <b>' + fmt(ref) + '</b> &nbsp;·&nbsp; tú: <b>' + fmt(mine) + '</b> &nbsp;·&nbsp; derivada numérica independiente: <b>' + fmt(num) + '</b></div>';
    } else {
      var okA = close(mine, e.val);
      html = '<div class="callout ' + (okA ? 'good' : 'bad') + '">' + (okA ? '✔ ¡Correcto!' : '✘ No coincide. Despliega los pasos y compara.') + '</div><div class="mt">Correcto: <b>' + fmt(e.val) + '</b> &nbsp;·&nbsp; tú: <b>' + fmt(mine) + '</b></div>';
    }
    out.innerHTML = html;
  }

  /* ----------------------------------------------------------------- EXAM */
  function ri(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function nz(a, b) { var v = 0; while (v === 0) v = ri(a, b); return v; }
  function pick(a) { return a[ri(0, a.length - 1)]; }
  function poly(terms) {
    var s = '';
    terms.forEach(function (t) {
      var c = t[0], p = t[1];
      if (!c) return;
      var a = Math.abs(c), sign = c < 0 ? '-' : (s ? '+' : '');
      var body = p === 0 ? String(a) : ((a === 1 ? '' : String(a)) + 'x' + (p === 1 ? '' : '^{' + p + '}'));
      s += sign + body;
    });
    return s || '0';
  }
  function cleanErrs(list, ans) { return list.filter(function (x) { return !close(x.val, ans) && isFinite(x.val); }); }
  var GENS = [
    function () {
      var a = nz(-4, 4), b = nz(-6, 6), c = ri(-9, 9), x1 = ri(0, 4), dx = pick([0.5, 1, 2]), x2 = x1 + dx;
      var f = function (x) { return a * x * x * x + b * x + c; };
      var ans = (f(x2) - f(x1)) / dx;
      return { id: 'r', kind: 'num', text: 'Tasa de cambio promedio de:', tex: 'f(x)=' + poly([[a, 3], [b, 1], [c, 0]]) + '\\ \\ \\text{de } x=' + x1 + '\\text{ a } x=' + x2,
        correct: ans, errs: cleanErrs([{ val: f(x2) - f(x1), msg: '¡Cuidado! Olvidaste dividir entre $\\Delta x=' + fmt(dx) + '$.' }, { val: -ans, msg: 'Revisa el signo: $f(x_2)-f(x_1)$, en ese orden.' }], ans),
        explain: '$\\frac{f(' + x2 + ')-f(' + x1 + ')}{' + x2 + '-' + x1 + '}=\\frac{' + fmt(f(x2)) + '-(' + fmt(f(x1)) + ')}{' + fmt(dx) + '}=' + fmt(ans) + '$', hint: 'Estrategia: Tasa de cambio promedio.' };
    },
    function () {
      var a = nz(-4, 4), b = ri(-5, 5), c = nz(-8, 8), d = ri(-9, 9), x0 = ri(-3, 3);
      var f = function (x) { return a * x * x * x + b * x * x + c * x + d; };
      var ans = 3 * a * x0 * x0 + 2 * b * x0 + c;
      return { id: 'r', kind: 'num', text: 'Tasa de cambio instantánea en $x=' + x0 + '$ de:', tex: 'f(x)=' + poly([[a, 3], [b, 2], [c, 1], [d, 0]]),
        correct: ans, errs: cleanErrs([{ val: f(x0), msg: 'Evaluaste $f(' + x0 + ')$, pero la tasa instantánea es $f\'(' + x0 + ')$.' }, { val: 3 * a * Math.pow(x0, 3) + 2 * b * x0 * x0 + c, msg: 'Al derivar $x^n$ el exponente baja a $n-1$: $(x^3)\'=3x^2$.' }], ans),
        explain: '$f\'(x)=' + poly([[3 * a, 2], [2 * b, 1], [c, 0]]) + '\\ \\Rightarrow\\ f\'(' + x0 + ')=' + fmt(ans) + '$', hint: 'Estrategia: derivar y evaluar.' };
    },
    function () {
      var a = nz(-4, 4), b = ri(-6, 6), c = ri(-9, 9), x0 = ri(-3, 3);
      var f = function (x) { return a * x * x + b * x + c; };
      var m = 2 * a * x0 + b, y0 = f(x0), ans = y0 - m * x0;
      return { id: 'r', kind: 'num', text: 'Recta tangente en $x=' + x0 + '$. ¿Cuánto vale su ordenada al origen $b$ (en $y=mx+b$)?', tex: 'f(x)=' + poly([[a, 2], [b, 1], [c, 0]]),
        correct: ans, errs: cleanErrs([{ val: y0, msg: 'Usaste $y_0=f(x_0)$ como ordenada al origen. Hay que despejar: $b=y_0-m\\,x_0$.' }, { val: y0 + m * x0, msg: 'Error de signo: $y-y_0=m(x-x_0)\\Rightarrow b=y_0-m\\,x_0$.' }, { val: m, msg: 'Confundiste la pendiente $m$ con la ordenada al origen $b$.' }], ans),
        explain: '$m=f\'(' + x0 + ')=' + fmt(m) + ',\\ y_0=f(' + x0 + ')=' + fmt(y0) + '\\ \\Rightarrow\\ b=y_0-m x_0=' + fmt(ans) + '$', hint: 'Estrategia: Recta tangente.' };
    }
  ];

  function prepQ(q) {
    var o = { q: q };
    if (q.kind === 'mc') {
      var opts = [{ tex: q.correct, ok: true, msg: '' }].concat(q.wrong.map(function (w) { return { tex: w.tex, ok: false, msg: w.msg }; }));
      o.opts = shuffle(opts);
    }
    return o;
  }
  function examStart(mode, count, onlyIds) {
    var pool;
    if (mode === 'random') pool = [];
    else if (onlyIds) pool = D.quiz.filter(function (q) { return onlyIds.indexOf(q.id) >= 0; });
    else pool = D.quiz.slice();
    var qs = mode === 'random' ? [] : shuffle(pool).slice(0, count || pool.length);
    S.exam = { phase: 'run', mode: mode, qs: qs, i: 0, cur: null, answered: false, res: null, showSol: false, hint: false,
      correct: 0, answeredN: 0, points: 0, streak: 0, bestStreak: 0, log: [], limit: 60, t0: Date.now(), tq: Date.now(), tot: mode === 'random' ? 0 : qs.length };
    examNextQ(true);
  }
  function examNextQ(first) {
    var E = S.exam;
    if (!first) E.i++;
    if (E.mode !== 'random' && E.i >= E.qs.length) return examFinish();
    var q = E.mode === 'random' ? GENS[ri(0, GENS.length - 1)]() : E.qs[E.i];
    E.cur = prepQ(q); E.answered = false; E.res = null; E.showSol = false; E.hint = false; E.tq = Date.now();
    E.deadline = Date.now() + E.limit * 1000;
    startTimer();
    render();
    window.scrollTo(0, 0);
  }
  function startTimer() {
    stopTimer();
    timer = setInterval(tick, 100);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function tick() {
    var E = S.exam;
    if (!E || E.phase !== 'run' || E.answered) return;
    var bar = document.getElementById('tbar'), txt = document.getElementById('ttxt');
    if (E.mode === 'press') {
      var rem = Math.max(0, (E.deadline - Date.now()) / 1000);
      if (bar) bar.style.transform = 'scaleX(' + (rem / E.limit) + ')';
      if (txt) txt.textContent = Math.ceil(rem) + ' s';
      if (rem <= 0) examResolve({ timeout: true });
    } else if (txt) {
      var el = Math.floor((Date.now() - E.tq) / 1000);
      txt.textContent = Math.floor(el / 60) + ':' + ('0' + (el % 60)).slice(-2);
    }
  }
  function examResolve(a) {
    var E = S.exam, q = E.cur.q;
    if (E.answered) return;
    var ok = false, msg = '', chosen = '', chosenIdx = -1;
    if (a.timeout) { msg = '¡Se acabó el tiempo! En el examen real también cuenta administrar el tiempo.'; chosen = '(sin respuesta)'; }
    else if (q.kind === 'mc') {
      var o = E.cur.opts[a.idx]; ok = o.ok; msg = o.msg; chosen = o.tex; chosenIdx = a.idx;
    } else {
      var v = a.val; chosen = fmt(v); ok = close(v, q.correct);
      if (!ok) {
        msg = 'No coincide con el resultado correcto. Revisa el procedimiento paso a paso.';
        (q.errs || []).forEach(function (er) { if (close(v, er.val)) msg = er.msg; });
      }
    }
    var used = Math.min(E.limit, (Date.now() - E.tq) / 1000), gain = 0;
    E.answered = true; E.answeredN++; stopTimer();
    if (ok) {
      E.correct++; E.streak++; E.bestStreak = Math.max(E.bestStreak, E.streak);
      gain = (E.hint ? 60 : 100) + (E.mode === 'press' ? Math.round(50 * Math.max(0, (E.limit - used) / E.limit)) : 0) + 10 * Math.min(E.streak - 1, 5);
      E.points += gain;
    } else E.streak = 0;
    E.res = { ok: ok, msg: msg, gain: gain, timeout: !!a.timeout, chosenIdx: chosenIdx };
    E.log.push({ q: q, ok: ok, chosen: chosen });
    render();
  }
  function examFinish() {
    var E = S.exam;
    stopTimer();
    E.phase = 'done'; E.total = Date.now() - E.t0;
    E.grade = E.answeredN ? Math.round(100 * E.correct / E.answeredN) : 0;
    var key = 'best_' + E.mode;
    var prev = store(key);
    E.record = Math.max(prev || 0, E.grade);
    if (E.answeredN >= 6 || E.mode !== 'random') store(key, E.record);
    S.lastWrong = E.log.filter(function (x) { return !x.ok && x.q.id.indexOf('q_') === 0; }).map(function (x) { return x.q.id; });
    render();
  }
  function ringHTML(p, big) { return '<div class="ring' + (big ? ' big' : '') + '" style="--p:' + p + '" role="img" aria-label="Precisión ' + p + '%"><b>' + p + '%</b></div>'; }

  function viewExam() {
    var E = S.exam, h = '';
    if (!E) {
      h = '<h1>Simulador de Examen 100/100</h1><p class="lead">Preguntas basadas exactamente en la guía. Si caes en un error típico, la app te dice cuál fue. Elige tu modo de entrenamiento.</p><div class="modes">';
      h += '<button class="card mode" data-a="exam-go" data-m="train"><div class="big">ENTRENAMIENTO</div><p class="muted">Sin límite de tiempo, con pista y solución paso a paso. Ideal para aprender.</p><span class="pill">' + D.quiz.length + ' preguntas</span></button>';
      h += '<button class="card mode" data-a="exam-go" data-m="press"><div class="big">BAJO PRESIÓN</div><p class="muted">60 segundos por pregunta. Si se acaba el tiempo, cuenta como error. Puntos extra por rapidez.</p><span class="pill">' + D.quiz.length + ' preguntas</span></button>';
      h += '<button class="card mode" data-a="exam-go" data-m="random"><div class="big">ALEATORIO ∞</div><p class="muted">Ejercicios nuevos con números distintos cada vez: tasa promedio, instantánea y tangente.</p><span class="pill">infinito</span></button></div>';
      var br = store('best_train'), bp = store('best_press');
      if (br || bp) h += '<div class="stats mt">' + (br ? '<div class="stat"><b>' + br + '/100</b><span>récord entrenamiento</span></div>' : '') + (bp ? '<div class="stat"><b>' + bp + '/100</b><span>récord bajo presión</span></div>' : '') + '</div>';
      if (S.lastWrong && S.lastWrong.length) h += '<div class="row mt"><button class="btn" data-a="exam-wrong">Repasar solo mis ' + S.lastWrong.length + ' errores del último simulacro</button></div>';
      $app.innerHTML = h; return;
    }
    if (E.phase === 'done') {
      var tm = Math.round(E.total / 1000);
      var msg = E.grade === 100 ? '¡100/100! Estás listo para el examen.' : E.grade >= 90 ? 'Casi perfecto: repasa los errores y lo logras.' : E.grade >= 70 ? 'Buen avance. Repasa las estrategias donde fallaste.' : 'Todavía hay huecos: vuelve al Mastery Hub y practica en modo entrenamiento.';
      h = '<h1>Resultado</h1><div class="card"><div class="result">' + ringHTML(E.grade, true) + '<div><h2 style="font-size:1.6rem;margin:0">' + E.grade + '/100</h2><p style="margin:4px 0 10px">' + msg + '</p>' +
        '<div class="stats" style="margin:0"><div class="stat"><b>' + E.correct + '/' + E.answeredN + '</b><span>correctas</span></div><div class="stat"><b>' + E.points + '</b><span>puntos</span></div><div class="stat"><b>' + E.bestStreak + '</b><span>mejor racha</span></div><div class="stat"><b>' + Math.floor(tm / 60) + ':' + ('0' + (tm % 60)).slice(-2) + '</b><span>tiempo</span></div><div class="stat"><b>' + E.record + '</b><span>récord del modo</span></div></div></div></div>';
      h += '<div class="row mt"><button class="btn primary" data-a="exam-go" data-m="' + E.mode + '">Reintentar</button>' + (S.lastWrong && S.lastWrong.length ? '<button class="btn" data-a="exam-wrong">Repasar mis errores (' + S.lastWrong.length + ')</button>' : '') + '<button class="btn ghost" data-a="exam-menu">Menú</button></div></div>';
      var wr = E.log.filter(function (x) { return !x.ok; });
      if (wr.length) {
        h += '<h2 class="mt" style="margin-top:20px">Para repasar</h2>';
        wr.forEach(function (x) {
          h += '<div class="miss">' + tex(x.q.tex, true) + '<div>Tu respuesta: ' + (x.q.kind === 'mc' ? tex(x.chosen) : '<b>' + esc(x.chosen) + '</b>') + ' &nbsp;→&nbsp; correcta: ' + (x.q.kind === 'mc' ? tex(x.q.correct) : '<b>' + fmt(x.q.correct) + '</b>') + '</div>' +
            (x.q.exid ? '<div class="mt"><button class="chip" data-a="open-ex" data-id="' + x.q.exid + '">Ver solución de ' + esc(byId[x.q.exid].label) + '</button></div>' : '') + '</div>';
        });
      }
      $app.innerHTML = h; return;
    }
    // run
    var q = E.cur.q, pct = E.answeredN ? Math.round(100 * E.correct / E.answeredN) : 0, L = ['A', 'B', 'C', 'D'];
    h = '<div class="hud"><div class="row"><div class="cell"><b>' + (E.mode === 'random' ? (E.answeredN + 1) : (E.i + 1) + '/' + E.tot) + '</b><span>pregunta</span></div><div class="cell"><b>' + E.points + '</b><span>puntos</span></div><div class="cell"><b>' + E.streak + '</b><span>racha</span></div><div class="cell"><b id="ttxt">' + (E.mode === 'press' ? E.limit + ' s' : '0:00') + '</b><span>' + (E.mode === 'press' ? 'tiempo' : 'transcurrido') + '</span></div></div><div class="row">' + ringHTML(pct) + '<div class="muted" style="font-size:.78rem">PRECISIÓN</div></div></div>';
    if (E.mode === 'press') h += '<div class="timebar" role="progressbar" aria-label="Tiempo restante"><i id="tbar"></i></div>';
    h += '<div class="card"><span class="pill">' + (q.kind === 'mc' ? 'Opción múltiple' : 'Respuesta numérica') + '</span><p style="margin:4px 0 0">' + rich(q.text) + '</p><div class="statement" style="margin-top:8px">' + tex(q.tex, true) + '</div>';
    if (q.kind === 'mc') {
      h += '<div class="opts">' + E.cur.opts.map(function (o, i) {
        var cls = E.answered ? (o.ok ? ' ok' : (E.res.chosenIdx === i ? ' no' : '')) : '';
        return '<button class="opt' + cls + '" data-a="pick" data-i="' + i + '"' + (E.answered ? ' disabled' : '') + '><span class="L">' + L[i] + '</span><span>' + tex(o.tex) + '</span></button>';
      }).join('') + '</div>';
    } else if (!E.answered) {
      h += '<div class="numin"><input id="numans" type="text" inputmode="decimal" autocomplete="off" placeholder="Tu respuesta (ej. -253.25 o 3/4)" aria-label="Tu respuesta"><button class="btn primary" data-a="submit-num">Responder</button></div>';
    }
    if (!E.answered && q.hint) h += '<div class="row mt">' + (E.hint ? '<div class="callout" style="margin:0">' + rich(q.hint) + '</div>' : (E.mode === 'press' ? '' : '<button class="chip" data-a="hint">Pista (−40 pts)</button>')) + '</div>';
    if (E.answered) {
      var r = E.res;
      h += '<div role="status" class="callout ' + (r.ok ? 'good' : 'bad') + ' mt"><b class="k">' + (r.ok ? 'Correcto' : 'Incorrecto') + '</b>' + (r.ok ? '¡Bien! +' + r.gain + ' puntos' + (E.streak > 1 ? ' · racha ×' + E.streak : '') : rich(r.msg)) + '</div>';
      if (!r.ok) h += '<div class="callout mt"><b class="k">Respuesta correcta</b>' + (q.kind === 'mc' ? tex(q.correct) : '<b>' + fmt(q.correct) + '</b>') + '</div>';
      if (q.explain && !r.ok) h += '<div class="callout mt"><b class="k">Solución</b>' + rich(q.explain) + '</div>';
      if (q.exid) {
        h += '<div class="row mt"><button class="chip" data-a="toggle-sol">' + (E.showSol ? 'Ocultar' : 'Ver') + ' solución paso a paso</button></div>';
        if (E.showSol) h += '<div class="mt">' + stepsHTML(byId[q.exid], byId[q.exid].steps.length) + '</div>';
      }
      var last = E.mode !== 'random' && E.i + 1 >= E.qs.length;
      h += '<div class="row mt"><button class="btn primary" data-a="next" id="nextbtn">' + (last ? 'Ver resultado' : 'Siguiente') + '</button>' + (!last ? '<button class="btn" data-a="finish">Terminar ahora</button>' : '') + '</div>';
    } else {
      h += '<div class="row mt"><button class="btn ghost" data-a="exam-menu">Abandonar</button>' + (E.answeredN ? '<button class="btn" data-a="finish">Terminar y ver resultado</button>' : '') + '</div>';
    }
    h += '</div>';
    $app.innerHTML = h;
    if (q.kind === 'num' && !E.answered) { var inp = document.getElementById('numans'); if (inp) inp.focus(); }
    if (E.answered) { var nb = document.getElementById('nextbtn'); if (nb) nb.focus(); }
    tick();
  }
  function submitNum() {
    var inp = document.getElementById('numans');
    if (!inp) return;
    var v = parseNum(inp.value);
    if (isNaN(v)) { inp.style.borderColor = 'var(--red)'; inp.placeholder = 'Escribe un número válido'; return; }
    examResolve({ val: v });
  }

  /* ---------------------------------------------------------------- CHEAT */
  function cheatListHTML() {
    var q = S.cheat.q.trim().toLowerCase(), cat = S.cheat.cat, h = '', any = false;
    D.cheat.forEach(function (c) {
      if (cat !== 'Todas' && c.cat !== cat) return;
      var items = c.items.filter(function (i) { return !q || (i.n + ' ' + i.tex + ' ' + (i.note || '') + ' ' + c.cat).toLowerCase().indexOf(q) >= 0; });
      if (!items.length) return;
      any = true;
      h += '<div class="cheat-cat">' + esc(c.cat) + '</div><div class="grid g2">' + items.map(function (i) {
        return '<div class="card cheat-item"><div class="n">' + esc(i.n) + '</div>' + tex(i.tex, true) + (i.note ? '<div class="muted" style="font-size:.88rem">' + rich(i.note) + '</div>' : '') + '</div>';
      }).join('') + '</div>';
    });
    return any ? h : '<p class="muted mt">Sin resultados para “' + esc(S.cheat.q) + '”.</p>';
  }
  function checkHTML() {
    var done = D.checklist.filter(function (_, i) { return S.checks[i]; }).length;
    return '<h3>Lista de verificación antes de entregar <span class="muted">(' + done + '/' + D.checklist.length + ')</span></h3>' + D.checklist.map(function (t, i) {
      return '<label class="check' + (S.checks[i] ? ' done' : '') + '"><input type="checkbox" data-a="chk" data-i="' + i + '"' + (S.checks[i] ? ' checked' : '') + '><span>' + rich(t) + '</span></label>';
    }).join('');
  }
  function viewCheat() {
    var h = '<h1>Cheat Sheet &amp; Formulario</h1><p class="lead">Todas las reglas, leyes de exponentes y propiedades de logaritmos que necesitas para la guía. Busca por palabra o filtra por categoría.</p>';
    h += '<div class="row"><input id="cq" type="search" placeholder="Buscar: cadena, ln, tangente…" value="' + esc(S.cheat.q) + '" aria-label="Buscar en el formulario" style="flex:1 1 240px"></div>';
    h += '<div class="row mt" id="cats">' + ['Todas'].concat(D.cheat.map(function (c) { return c.cat; })).map(function (c) {
      return '<button class="chip" data-a="cat" data-c="' + esc(c) + '" aria-pressed="' + (S.cheat.cat === c) + '">' + esc(c) + '</button>';
    }).join('') + '</div><div id="clist">' + cheatListHTML() + '</div><div class="card mt" id="chk" style="margin-top:26px">' + checkHTML() + '</div>';
    $app.innerHTML = h;
  }

  /* --------------------------------------------------------------- router */
  var VIEWS = { hub: viewHub, solver: viewSolver, exam: viewExam, cheat: viewCheat };
  function renderTabs() {
    $tabs.innerHTML = TABS.map(function (t) {
      return '<button class="tab" data-a="tab" data-r="' + t[0] + '"' + (S.route === t[0] ? ' aria-current="page"' : '') + '>' + t[1] + '</button>';
    }).join('');
  }
  function render() {
    renderTabs();
    VIEWS[S.route]();
  }
  function go(route, keepScroll) {
    if (route !== 'exam' || !S.exam || S.exam.phase !== 'run') stopTimer();
    S.route = route;
    var h = '#' + route + (route === 'solver' ? '/' + S.solver.id : '');
    if (location.hash !== h) { try { history.replaceState(null, '', h); } catch (e) { /* file:// restringido */ } }
    render();
    if (!keepScroll) window.scrollTo(0, 0);
    if (route === 'exam' && S.exam && S.exam.phase === 'run' && !S.exam.answered) startTimer();
  }
  function fromHash() {
    var m = location.hash.replace('#', '').split('/');
    if (VIEWS[m[0]]) { S.route = m[0]; if (m[0] === 'solver' && byId[m[1]]) S.solver = { id: m[1], shown: 1 }; }
  }
  function openEx(id) { S.solver = { id: id, shown: 1 }; go('solver'); }

  /* --------------------------------------------------------------- events */
  var ACTIONS = {
    tab: function (t) { go(t.dataset.r); },
    'hub-open': function (t) { S.hub = { open: t.dataset.id, step: 1 }; render(); window.scrollTo(0, 0); },
    'hub-close': function () { S.hub.open = null; render(); },
    'hub-next': function () { S.hub.step = Math.min(D.hubLabels.length, S.hub.step + 1); render(); },
    'hub-all': function () { S.hub.step = D.hubLabels.length; render(); },
    'hub-reset': function () { S.hub.step = 1; render(); },
    'open-ex': function (t) { openEx(t.dataset.id); },
    'solver-pick': function (t) { S.solver = { id: t.dataset.id, shown: 1 }; go('solver', true); },
    'solver-next': function () { S.solver.shown++; render(); },
    'solver-all': function () { S.solver.shown = byId[S.solver.id].steps.length; render(); },
    'solver-reset': function () { S.solver.shown = 1; render(); },
    verify: doVerify,
    'exam-go': function (t) { examStart(t.dataset.m, 0); },
    'exam-wrong': function () { examStart('train', 0, S.lastWrong); },
    'exam-menu': function () { stopTimer(); S.exam = null; render(); },
    pick: function (t) { if (S.exam && !S.exam.answered) examResolve({ idx: +t.dataset.i }); },
    'submit-num': submitNum,
    hint: function () { S.exam.hint = true; render(); },
    'toggle-sol': function () { S.exam.showSol = !S.exam.showSol; render(); },
    next: function () { examNextQ(false); },
    finish: examFinish,
    cat: function (t) {
      S.cheat.cat = t.dataset.c;
      document.querySelectorAll('#cats .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.c === S.cheat.cat)); });
      document.getElementById('clist').innerHTML = cheatListHTML();
    }
  };
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest ? ev.target.closest('[data-a]') : null;
    if (!t || t.tagName === 'INPUT') return;
    var f = ACTIONS[t.dataset.a];
    if (f) f(t);
  });
  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (t && t.dataset && t.dataset.a === 'chk') {
      S.checks[t.dataset.i] = t.checked; store('checks', S.checks);
      document.getElementById('chk').innerHTML = checkHTML();
    }
  });
  document.addEventListener('input', function (ev) {
    if (ev.target && ev.target.id === 'cq') {
      S.cheat.q = ev.target.value;
      document.getElementById('clist').innerHTML = cheatListHTML();
    }
  });
  document.addEventListener('keydown', function (ev) {
    var E = S.exam;
    if (S.route === 'solver' && ev.key === 'Enter' && ev.target.id && ev.target.id.indexOf('v-') === 0) { ev.preventDefault(); doVerify(); return; }
    if (S.route !== 'exam' || !E || E.phase !== 'run') return;
    var inInput = ev.target && ev.target.tagName === 'INPUT';
    if (ev.key === 'Enter') {
      if (!E.answered && E.cur.q.kind === 'num') { ev.preventDefault(); submitNum(); }
      return;
    }
    if (inInput || E.answered || E.cur.q.kind !== 'mc') return;
    var k = ev.key.toLowerCase(), idx = '1234'.indexOf(k);
    if (idx < 0) idx = 'abcd'.indexOf(k);
    if (idx >= 0 && idx < E.cur.opts.length) examResolve({ idx: idx });
  });
  window.addEventListener('hashchange', function () { fromHash(); render(); });

  fromHash();
  render();
})();

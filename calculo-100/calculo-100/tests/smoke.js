const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + (e.detail || e.message || e)));
vc.on('error', e => errors.push('console.error: ' + e));
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/', virtualConsole: vc });
const w = dom.window, d = w.document;
w.scrollTo = () => {};
const DATA = w.__DATA__;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL:', m); } };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
const tab = r => click($(`[data-a=tab][data-r=${r}]`));
const noKatexErr = m => ok($$('.katex-error').length === 0, m + ': hay errores KaTeX');
const frag = msg => msg.split(/\$[^$]*\$/).sort((a,b)=>b.length-a.length)[0].trim().slice(0, 18);
const norm = h => { const t = d.createElement('div'); t.innerHTML = h; return t.innerHTML; };
const kx = (t, disp) => norm(w.katex.renderToString(t, { displayMode: !!disp, throwOnError: false, strict: 'ignore' }));

(async () => {
  ok($('#app').innerHTML.length > 500, 'hub renderiza'); noKatexErr('hub');
  ok($$('.tab').length === 4, '4 pestañas');

  // HUB
  for (const c of DATA.hub) {
    click($(`[data-a=hub-open][data-id=${c.id}]`));
    ok($$('.step').length === 1, 'hub ' + c.id + ' empieza con 1 paso');
    for (let i = 0; i < 3; i++) click($('[data-a=hub-next]'));
    ok($$('.step').length === 4, 'hub ' + c.id + ' 4 pasos');
    ok($$('[data-a=open-ex]').length === c.examples.length, 'hub ejemplos ' + c.id);
    noKatexErr('hub ' + c.id);
  }

  // SOLVER
  tab('solver');
  ok($$('.item').length === 22, '22 ejercicios en el selector: ' + $$('.item').length);
  for (const e of DATA.exercises) {
    click($(`[data-a=solver-pick][data-id=${e.id}]`));
    click($('[data-a=solver-all]'));
    ok($$('.step').length === e.steps.length, 'pasos ' + e.id);
    ok(!!$('.answer'), 'respuesta final ' + e.id);
    noKatexErr('solver ' + e.id);
    let good;
    if (e.js_df) { const df = eval(e.js_df); good = df(e.x0); $('#v-x0').value = String(e.x0); }
    else good = e.val;
    $('#v-mine').value = String(Math.round(good * 1e6) / 1e6);
    click($('[data-a=verify]'));
    ok(/Coincide|Correcto/.test($('#v-out').textContent), 'verificador acepta correcto ' + e.id + ' -> ' + $('#v-out').textContent.slice(0, 60));
    $('#v-mine').value = String(good + 7.5);
    click($('[data-a=verify]'));
    ok(/No coincide/.test($('#v-out').textContent), 'verificador rechaza incorrecto ' + e.id);
    $('#v-mine').value = 'abc';
    click($('[data-a=verify]'));
    ok(/número/.test($('#v-out').textContent), 'verificador valida entrada ' + e.id);
  }
  // fracciones y dominio
  click($('[data-a=solver-pick][data-id=q]')); $('#v-x0').value = '1'; $('#v-mine').value = '1'; click($('[data-a=verify]'));
  ok(/dominio/.test($('#v-out').textContent), 'q en x0=1 fuera de dominio: ' + $('#v-out').textContent.slice(0, 80));

  // EXAM - entrenamiento, todo correcto
  tab('exam');
  ok($$('[data-a=exam-go]').length === 3, '3 modos');
  async function runAll(mode, correct) {
    click($(`[data-a=exam-go][data-m=${mode}]`));
    let n = 0, wrongMsgOk = 0;
    while ($('[data-a=pick]') || $('#numans')) {
      n++;
      const hud = $('.hud'); ok(!!hud, 'hud');
      const qtex = $('.statement').innerHTML;
      const q = DATA.quiz.find(x => $('.statement').innerHTML === kx(x.tex, true));
      ok(!!q, 'pregunta localizada en datos (#' + n + ')');
      if (q.kind === 'mc') {
        ok($$('.opt').length === 4, 'cuatro opciones');
        const target = correct ? q.correct : q.wrong[0].tex;
        const opt = $$('.opt').find(o => o.innerHTML.includes(kx(target)));
        ok(!!opt, 'opción localizada ' + q.id);
        click(opt);
        if (!correct) {
          const fb = $('[role=status]').textContent;
          ok(/Incorrecto/.test(fb), 'feedback incorrecto ' + q.id);
          const expected = d.createElement('div'); expected.innerHTML = '';
          // el mensaje específico debe aparecer (comparamos un fragmento de texto plano)
          const fr = frag(q.wrong[0].msg);
          if (fb.includes(fr)) wrongMsgOk++; else console.log('  msg no encontrado', q.id, fr, '|', fb.slice(0, 120));
          ok($$('.opt.ok').length === 1 && $$('.opt.no').length === 1, 'resalta correcta y elegida ' + q.id);
        } else ok(/Correcto/.test($('[role=status]').textContent) && $$('.opt.ok').length === 1, 'feedback correcto ' + q.id);
      } else {
        $('#numans').value = correct ? String(q.correct) : String(q.errs[0].val);
        click($('[data-a=submit-num]'));
        const fb = $('[role=status]').textContent;
        if (correct) ok(/Correcto/.test(fb), 'num correcto ' + q.id);
        else { ok(/Incorrecto/.test(fb), 'num incorrecto ' + q.id); const fr = frag(q.errs[0].msg); if (fb.includes(fr)) wrongMsgOk++; else console.log('  msg num no encontrado', q.id, fr, '|', fb.slice(0, 100)); }
      }
      noKatexErr('exam q' + n);
      click($('[data-a=next]'));
    }
    return { n, wrongMsgOk };
  }
  let r = await runAll('train', true);
  ok(r.n === 22, '22 preguntas respondidas, fueron ' + r.n);
  ok(/100\/100/.test($('h2').textContent), 'resultado 100/100: ' + $('h2').textContent);
  ok(/Estás listo/.test($('#app').textContent), 'mensaje de 100');
  noKatexErr('resultado');
  click($('[data-a=exam-menu]'));
  r = await runAll('train', false);
  ok(r.n === 22 && r.wrongMsgOk === 22, `errores típicos: ${r.wrongMsgOk}/22 mensajes específicos`);
  ok(/0\/100/.test($('h2').textContent), 'resultado 0/100: ' + $('h2').textContent);
  ok($$('.miss').length === 22, 'lista de 22 errores para repasar');
  ok(!!$('[data-a=exam-wrong]'), 'botón repasar errores');
  click($('[data-a=exam-wrong]'));
  ok($$('.hud').length === 1 && /1\/22/.test($('.hud').textContent), 'modo repaso de errores 1/22');
  click($('[data-a=exam-menu]'));

  // presión: timeout
  click($('[data-a=exam-go][data-m=press]'));
  ok(!!$('#tbar'), 'barra de tiempo');
  const realNow = w.Date.now.bind(w.Date);
  w.Date.now = () => realNow() + 70000;
  await sleep(350);
  ok(/Incorrecto/.test($('[role=status]').textContent) && /tiempo/.test($('[role=status]').textContent), 'timeout cuenta como error');
  w.Date.now = realNow;
  click($('[data-a=finish]'));
  ok(/Resultado/.test($('h1').textContent), 'terminar anticipado muestra resultado');
  click($('[data-a=exam-menu]'));

  // aleatorio
  click($('[data-a=exam-go][data-m=random]'));
  for (let i = 0; i < 12; i++) {
    ok(!!$('#numans'), 'random numérica'); noKatexErr('random');
    $('#numans').value = '0.123456789'; click($('[data-a=submit-num]'));
    ok(/Incorrecto/.test($('[role=status]').textContent), 'random incorrecto');
    ok(/Solución/.test($('#app').textContent), 'random muestra solución');
    click($('[data-a=next]'));
  }
  click($('[data-a=finish]'));
  ok(/Resultado/.test($('h1').textContent), 'random termina');
  click($('[data-a=exam-menu]'));
  // random: validar el generador con cálculo independiente
  function parsePoly(t) {
    const c = {}; t = t.replace(/\\ .*$/, '').replace(/^f\(x\)=/, '');
    t.split(/(?=[+-])/).forEach(p => { const m = p.match(/^([+-]?)(\d*)(x)?(?:\^\{(\d+)\})?$/); if (!m) throw new Error('poly ' + p); const sg = m[1] === '-' ? -1 : 1; const num = m[2] === '' ? 1 : +m[2]; c[m[3] ? (m[4] ? +m[4] : 1) : 0] = sg * num; });
    return c;
  }
  const ev = (c, x) => Object.entries(c).reduce((a, [p, k]) => a + k * Math.pow(x, +p), 0);
  const dv = (c, x) => Object.entries(c).reduce((a, [p, k]) => a + (+p ? k * (+p) * Math.pow(x, +p - 1) : 0), 0);
  click($('[data-a=exam-go][data-m=random]'));
  const seen = { avg: 0, inst: 0, tan: 0 };
  for (let i = 0; i < 90; i++) {
    const text = $('.card p').textContent, texsrc = $('.statement .katex annotation').textContent;
    $('#numans').value = 'x'; click($('[data-a=submit-num]'));
    ok(!!$('#numans'), 'entrada inválida no consume la pregunta');
    const c = parsePoly(texsrc); let exp;
    if (/promedio/.test(text)) { const m = texsrc.match(/x=(-?\d+)\\text\{ a \} x=(-?[\d.]+)/); const x1 = +m[1], x2 = +m[2]; exp = (ev(c, x2) - ev(c, x1)) / (x2 - x1); seen.avg++; }
    else if (/instant/.test(text)) { const x0 = +text.match(/x=(-?\d+)/)[1]; exp = dv(c, x0); seen.inst++; }
    else { const x0 = +text.match(/x=(-?\d+)/)[1]; const m = dv(c, x0); exp = ev(c, x0) - m * x0; seen.tan++; }
    $('#numans').value = String(exp); click($('[data-a=submit-num]'));
    ok(/Correcto/.test($('[role=status]').textContent), `random acepta valor independiente (${text.slice(0, 30)} | ${texsrc.slice(0, 40)} -> ${exp}): ${$('[role=status]').textContent.slice(0, 60)}`);
    click($('[data-a=next]'));
  }
  ok(seen.avg > 5 && seen.inst > 5 && seen.tan > 5, 'los 3 generadores aparecen: ' + JSON.stringify(seen));
  click($('[data-a=finish]')); click($('[data-a=exam-menu]'));

  // CHEAT
  tab('cheat');
  const total = $$('.cheat-item').length; ok(total >= 35, 'formulario con ' + total + ' fórmulas');
  const q = $('#cq'); q.value = 'cadena'; q.dispatchEvent(new w.Event('input', { bubbles: true }));
  const filtered = $$('.cheat-item').length; ok(filtered > 0 && filtered < total, 'búsqueda filtra: ' + filtered);
  q.value = 'zzzz'; q.dispatchEvent(new w.Event('input', { bubbles: true })); ok(/Sin resultados/.test($('#clist').textContent), 'sin resultados');
  q.value = ''; q.dispatchEvent(new w.Event('input', { bubbles: true }));
  click($('[data-a=cat][data-c="Leyes de los exponentes"]')); ok($$('.cheat-cat').length === 1, 'filtro por categoría');
  const cb = $('input[data-a=chk]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
  ok(/\(1\/8\)/.test($('#chk').textContent), 'checklist cuenta 1/8');
  noKatexErr('cheat');

  // hash routing
  w.location.hash = '#solver/k'; await sleep(50);
  ok(/k\(x\)/.test($('h2').textContent), 'hash #solver/k abre k(x): ' + $('h2').textContent);

  ok(errors.length === 0, 'sin errores de consola/JS: ' + errors.slice(0, 3).join(' | '));
  console.log(`\nPASS ${pass}  FAIL ${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('EXCEPCIÓN', e); process.exit(2); });

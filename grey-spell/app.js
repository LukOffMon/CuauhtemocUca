/* Grey~Spell — motor y app. Todo se guarda en este navegador (localStorage). */
(function () {
'use strict';
const GS = window.GS;

/* ================= utilidades ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = n => Number(n).toLocaleString('es-MX');
const wpick = list => { const tot = list.reduce((s, x) => s + Math.max(0, x[1]), 0); if (tot <= 0) return null; let r = Math.random() * tot; for (const x of list) { r -= Math.max(0, x[1]); if (r <= 0) return x[0]; } return list[list.length - 1][0]; };

const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/œ/g, 'oe').replace(/æ/g, 'ae')
  .replace(/\([^)]*\)/g, ' ').replace(/[.,!?¿¡;:«»"“”—–\-…]/g, ' ').replace(/\s+/g, ' ').trim();
const deacc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const ART = /^(le|la|les|l'|un|une|des|el|los|las|lo|unos|unas|du|de la|de l')\s*/;
function lev(a, b) { const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9; let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
function grade(input, answers) {
  const a = norm(input); if (!a) return { ok: false };
  const N = answers.map(norm);
  if (N.includes(a)) return { ok: true };
  for (let i = 0; i < N.length; i++) if (deacc(a) === deacc(N[i])) return { ok: true, note: 'Cuidado con los acentos: «' + answers[i] + '»' };
  for (let i = 0; i < N.length; i++) { const a2 = a.replace(ART, ''), b2 = N[i].replace(ART, ''); if (a2 && b2 && deacc(a2) === deacc(b2)) return { ok: true, note: 'Recuerda el artículo: «' + answers[i] + '»' }; }
  for (let i = 0; i < N.length; i++) { const b = deacc(N[i]), d = lev(deacc(a), b); if ((b.length >= 5 && d <= 1) || (b.length >= 12 && d <= 2)) return { ok: true, note: 'Casi perfecto, revisa la ortografía: «' + answers[i] + '»' }; }
  return { ok: false };
}
const toks = s => s.replace(/[.,!?¿¡;:«»"“”…]/g, ' ').replace(/\s[—–-]\s/g, ' ').split(/\s+/).filter(Boolean);

/* ================= motor de conjugación ================= */
const IRR = {
  'être': { p: 'suis es est sommes êtes sont', pp: 'été', f: 'ser', im: 'ét', sj: 'sois sois soit soyons soyez soient', ps: 'fu', g: 'étant' },
  'avoir': { p: 'ai as a avons avez ont', pp: 'eu', f: 'aur', sj: 'aie aies ait ayons ayez aient', ps: 'eu', g: 'ayant' },
  'aller': { p: 'vais vas va allons allez vont', pp: 'allé', f: 'ir', sj: 'aille ailles aille allions alliez aillent', e: 1 },
  'faire': { p: 'fais fais fait faisons faites font', pp: 'fait', f: 'fer', sj: 'fasse fasses fasse fassions fassiez fassent', ps: 'fi' },
  'pouvoir': { p: 'peux peux peut pouvons pouvez peuvent', pp: 'pu', f: 'pourr', sj: 'puisse puisses puisse puissions puissiez puissent', ps: 'pu' },
  'vouloir': { p: 'veux veux veut voulons voulez veulent', pp: 'voulu', f: 'voudr', sj: 'veuille veuilles veuille voulions vouliez veuillent', ps: 'voulu' },
  'devoir': { p: 'dois dois doit devons devez doivent', pp: 'dû', f: 'devr', ps: 'du' },
  'savoir': { p: 'sais sais sait savons savez savent', pp: 'su', f: 'saur', sj: 'sache saches sache sachions sachiez sachent', ps: 'su', g: 'sachant' },
  'venir': { p: 'viens viens vient venons venez viennent', pp: 'venu', f: 'viendr', e: 1, ps: 'vin' },
  'tenir': { p: 'tiens tiens tient tenons tenez tiennent', pp: 'tenu', f: 'tiendr', ps: 'tin' },
  'prendre': { p: 'prends prends prend prenons prenez prennent', pp: 'pris', ps: 'pri' },
  'mettre': { p: 'mets mets met mettons mettez mettent', pp: 'mis', ps: 'mi' },
  'voir': { p: 'vois vois voit voyons voyez voient', pp: 'vu', f: 'verr', ps: 'vi' },
  'dire': { p: 'dis dis dit disons dites disent', pp: 'dit', ps: 'di' },
  'partir': { p: 'pars pars part partons partez partent', pp: 'parti', e: 1, ps: 'parti' },
  'sortir': { p: 'sors sors sort sortons sortez sortent', pp: 'sorti', e: 1, ps: 'sorti' },
  'dormir': { p: 'dors dors dort dormons dormez dorment', pp: 'dormi', ps: 'dormi' },
  'sentir': { p: 'sens sens sent sentons sentez sentent', pp: 'senti', ps: 'senti' },
  'mentir': { p: 'mens mens ment mentons mentez mentent', pp: 'menti', ps: 'menti' },
  'boire': { p: 'bois bois boit buvons buvez boivent', pp: 'bu', ps: 'bu' },
  'lire': { p: 'lis lis lit lisons lisez lisent', pp: 'lu', ps: 'lu' },
  'écrire': { p: 'écris écris écrit écrivons écrivez écrivent', pp: 'écrit', ps: 'écrivi' },
  'connaître': { p: 'connais connais connaît connaissons connaissez connaissent', pp: 'connu', ps: 'connu' },
  'disparaître': { p: 'disparais disparais disparaît disparaissons disparaissez disparaissent', pp: 'disparu', ps: 'disparu' },
  'croire': { p: 'crois crois croit croyons croyez croient', pp: 'cru', ps: 'cru' },
  'vivre': { p: 'vis vis vit vivons vivez vivent', pp: 'vécu', ps: 'vécu' },
  'courir': { p: 'cours cours court courons courez courent', pp: 'couru', f: 'courr', ps: 'couru' },
  'mourir': { p: 'meurs meurs meurt mourons mourez meurent', pp: 'mort', f: 'mourr', e: 1, ps: 'mouru' },
  'naître': { p: 'nais nais naît naissons naissez naissent', pp: 'né', e: 1, ps: 'naqui' },
  'recevoir': { p: 'reçois reçois reçoit recevons recevez reçoivent', pp: 'reçu', f: 'recevr', ps: 'reçu' },
  'peindre': { p: 'peins peins peint peignons peignez peignent', pp: 'peint', ps: 'peigni' },
  'acheter': { p: 'achète achètes achète achetons achetez achètent', f: 'achèter' },
  'lever': { p: 'lève lèves lève levons levez lèvent', f: 'lèver' },
  'appeler': { p: 'appelle appelles appelle appelons appelez appellent', f: 'appeller' },
  'préférer': { p: 'préfère préfères préfère préférons préférez préfèrent' },
  'protéger': { p: 'protège protèges protège protégeons protégez protègent' },
  'gérer': { p: 'gère gères gère gérons gérez gèrent' },
  'envoyer': { p: 'envoie envoies envoie envoyons envoyez envoient', f: 'enverr' },
  'essayer': { p: 'essaie essaies essaie essayons essayez essaient', f: 'essaier' }
};
const PREF = { comprendre: ['com', 'prendre'], apprendre: ['ap', 'prendre'], surprendre: ['sur', 'prendre'], devenir: ['de', 'venir'], revenir: ['re', 'venir'], obtenir: ['ob', 'tenir'], permettre: ['per', 'mettre'], promettre: ['pro', 'mettre'], 'élire': ['é', 'lire'], repartir: ['re', 'partir'], 'décrire': ['d', 'écrire'] };
const ESSE = new Set(['aller', 'venir', 'arriver', 'partir', 'sortir', 'entrer', 'rentrer', 'rester', 'tomber', 'naître', 'mourir', 'monter', 'descendre', 'retourner', 'devenir', 'revenir', 'repartir']);
const VOW = /^[aeiouyéèêëâàîïôûùh]/i;
const PR = ['je', 'tu', 'il', 'nous', 'vous', 'ils'], PRF = ['je', 'tu', 'elle', 'nous', 'vous', 'elles'], RF = ['me', 'te', 'se', 'nous', 'vous', 'se'];
const TN = { pres: 'presente', pc: 'passé composé (pretérito)', imp: 'imparfait (copretérito)', fut: 'futuro', cond: 'condicional', subj: 'subjuntivo', pqp: 'plus-que-parfait (había…)', fa: 'futur antérieur (habré…)', condp: 'condicional pasado (habría…)', subjp: 'subjuntivo pasado (haya…)', fp: 'futuro próximo (ir a…)', ger: 'gerundio (en …ant)', ps: 'passé simple (literario)' };
const AUXT = { pc: 'pres', pqp: 'imp', fa: 'fut', condp: 'cond', subjp: 'subj' };
function splitRefl(inf) { inf = inf.trim(); if (inf.startsWith('se ')) return [true, inf.slice(3)]; if (inf.startsWith("s'")) return [true, inf.slice(2)]; return [false, inf]; }
function canConj(inf) { const b = splitRefl(inf)[1]; if (/\s/.test(b)) return false; if (IRR[b] || PREF[b]) return true; if (/(vrir|frir)$/.test(b)) return true; if (/oir$/.test(b)) return false; return /(er|ir|re)$/.test(b); }
function soft(st, end) { if (/^[aoâ]/.test(end)) { if (/g$/.test(st)) return st + 'e' + end; if (/c$/.test(st)) return st.slice(0, -1) + 'ç' + end; } return st + end; }
function circ(st) { const m = { a: 'â', i: 'î', u: 'û' }; for (let i = st.length - 1; i >= 0; i--) if (m[st[i]]) return st.slice(0, i) + m[st[i]] + st.slice(i + 1); return st; }
const iFix = (s, end) => (end[0] === 'i' ? s.replace(/ge$/, 'g').replace(/ç$/, 'c') : s) + end;
const FC = {};
function forms(b) {
  if (FC[b]) return FC[b];
  if (PREF[b]) {
    const [pre, base] = PREF[b], f = forms(base), add = x => Array.isArray(x) ? x.map(y => pre + y) : pre + x;
    return FC[b] = { pres: add(f.pres), pp: add(f.pp), imp: add(f.imp), fut: add(f.fut), cond: add(f.cond), subj: add(f.subj), ps: add(f.ps), ger: pre + f.ger, ess: f.ess || ESSE.has(b) };
  }
  const I = IRR[b] || {}, er = /er$/.test(b), re = /re$/.test(b), vr = /(vrir|frir)$/.test(b), ir = /ir$/.test(b) && !vr, st = b.slice(0, -2);
  let pres;
  if (I.p) pres = I.p.split(' ');
  else if (er || vr) pres = [st + 'e', st + 'es', st + 'e', soft(st, 'ons'), st + 'ez', st + 'ent'];
  else if (ir) pres = [st + 'is', st + 'is', st + 'it', st + 'issons', st + 'issez', st + 'issent'];
  else pres = [st + 's', st + 's', st, st + 'ons', st + 'ez', st + 'ent'];
  const pp = I.pp || (er ? st + 'é' : vr ? st.slice(0, -1) + 'ert' : ir ? st + 'i' : st + 'u');
  const nous = pres[3].replace(/ons$/, ''), impSt = I.im || nous;
  const IE = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], FE = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
  const imp = IE.map(e => iFix(impSt, e));
  const fst = I.f || (re ? b.slice(0, -1) : b);
  const fut = FE.map(e => fst + e), cond = IE.map(e => fst + e);
  let subj;
  if (I.sj) subj = I.sj.split(' ');
  else { const a = pres[5].replace(/ent$/, ''); subj = [a + 'e', a + 'es', a + 'e', iFix(impSt, 'ions'), iFix(impSt, 'iez'), a + 'ent']; }
  let ps;
  if (I.ps || !er) { const s = I.ps || st + 'i'; ps = [s + 's', s + 's', s + 't', circ(s) + 'mes', circ(s) + 'tes', s + 'rent']; }
  else ps = ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'].map(e => soft(st, e));
  return FC[b] = { pres, pp, imp, fut, cond, subj, ps, ger: I.g || nous + 'ant', ess: !!I.e || ESSE.has(b) };
}
const rf = (p, v) => (VOW.test(v) && p !== 3 && p !== 4) ? RF[p][0] + "'" + v : RF[p] + ' ' + v;
const withS = (p, fem, rest) => { const s = (fem ? PRF : PR)[p]; return (s === 'je' && VOW.test(rest)) ? "j'" + rest : s + ' ' + rest; };
function conj(inf, t, p, fem) {
  const [refl, b] = splitRefl(inf), F = forms(b);
  if (t === 'ger') return 'en ' + (refl ? rf(2, F.ger) : F.ger);
  let rest;
  if (t === 'fp') rest = forms('aller').pres[p] + ' ' + (refl ? rf(p, b) : b);
  else if (AUXT[t]) {
    const ess = refl || F.ess, aux = forms(ess ? 'être' : 'avoir')[AUXT[t]][p];
    let pp = F.pp; if (ess) { if (fem) pp += 'e'; if (p >= 3 && !/s$/.test(pp)) pp += 's'; }
    rest = (refl ? rf(p, aux) : aux) + ' ' + pp;
  } else { rest = F[t][p]; if (refl) rest = rf(p, rest); }
  let out = withS(p, fem, rest);
  if (t === 'subj' || t === 'subjp') out = (VOW.test(out) ? "qu'" : 'que ') + out;
  return out;
}

/* ================= números ================= */
const N0 = 'zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf'.split(' ');
const NT = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
function n100(n) { if (n < 20) return N0[n]; if (n < 70) { const t = NT[Math.floor(n / 10)], u = n % 10; return u === 0 ? t : u === 1 ? t + ' et un' : t + '-' + N0[u]; } if (n < 80) return n === 71 ? 'soixante et onze' : 'soixante-' + N0[n - 60]; if (n === 80) return 'quatre-vingts'; return 'quatre-vingt-' + N0[n - 80]; }
function n1000(n) { if (n < 100) return n100(n); const c = Math.floor(n / 100), r = n % 100; const s = c === 1 ? 'cent' : N0[c] + ' cent' + (r === 0 ? 's' : ''); return r ? s + ' ' + n100(r) : s; }
function frNum(n) { if (n < 1000) return n1000(n); const k = Math.floor(n / 1000), r = n % 1000; const s = k === 1 ? 'mille' : n1000(k).replace(/cents$/, 'cent') + ' mille'; return r ? s + ' ' + n1000(r) : s; }

/* ================= datos del curso ================= */
const LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const LVNAME = { A1: 'Principiante', A2: 'Básico', B1: 'Intermedio', B2: 'Intermedio alto', C1: 'Avanzado', C2: 'Maestría' };
const WMAP = {}, SMAP = {};
const UNITS = GS.units.map((u, i) => {
  const words = u.w.trim().split('\n').map((line, j) => {
    const parts = line.split('='), fr = parts[0].trim(), alts = (parts[1] || '').split('/').map(s => s.trim()).filter(Boolean);
    const gender = /^(le|un) /.test(fr) ? 'm' : /^(la|une) /.test(fr) ? 'f' : null;
    const w = { id: i + ':' + j, u: i, fr, es: alts[0], alts, em: parts[2] && parts[2].trim(), gender, g: 0 };
    WMAP[w.id] = w; return w;
  });
  const per = Math.ceil(words.length / 4); words.forEach((w, j) => { w.g = Math.min(3, Math.floor(j / per)); });
  const sents = u.s.trim().split('\n').map((line, j) => { const k = line.indexOf('='); const s = { id: i + ':s' + j, u: i, fr: line.slice(0, k).trim(), es: line.slice(k + 1).trim() }; SMAP[s.id] = s; return s; });
  const verbs = (u.g.v || '').split(',').map(x => { const [f, e] = x.split('='); return { inf: (f || '').trim(), es: (e || '').trim() }; }).filter(v => v.inf && canConj(v.inf));
  const tenses = (u.g.ct || 'pres').split('|');
  const keys = (u.g.k || '').split(/\s+/).filter(Boolean);
  return { i, lv: u.lv, t: u.t, es: u.es, ic: u.ic, gt: u.g.t, note: u.g.n, words, sents, verbs, tenses, keys };
});
const FF = (GS.FF || '').trim().split('\n').map(l => { const [fr, trap, real] = l.split('|'); return { fr, trap, real }; });
const CULT = (GS.CULT || '').trim().split('\n').map(l => { const [q, a, b, c] = l.split('|'); return { q, a, w: [b, c] }; });
const IDIOMS = UNITS.filter(u => /Expressions/.test(u.t)).flatMap(u => u.words);
const NODES = [
  { k: 'vocab', g: 0, n: 'Palabras I' }, { k: 'vocab', g: 1, n: 'Palabras II' }, { k: 'frases', n: 'Frases clave' },
  { k: 'gram', n: 'Gramática' }, { k: 'vocab', g: 2, n: 'Palabras III' }, { k: 'escucha', n: 'Escucha' },
  { k: 'vocab', g: 3, n: 'Palabras IV' }, { k: 'habla', n: 'Pronunciación' }, { k: 'lectura', n: 'Lectura' },
  { k: 'cultura', n: 'Cultura y trampas' }, { k: 'repaso', n: 'Repaso de unidad' }, { k: 'examen', n: 'Examen' }
];
const PER_LEVEL = 10, LEVELS = 5, PER_NODE = PER_LEVEL * LEVELS;
const TOTAL_LESSONS = UNITS.length * NODES.length * PER_NODE;

/* ================= estado ================= */
const KEY = 'greyspell.v1';
const fresh = () => ({
  v: 1, name: '', created: Date.now(), xp: 0, gems: 60, streak: 0, best: 0, last: null, freezes: 1, days: {}, goal: 20,
  nodes: {}, floor: 0, words: {}, mist: [], ach: {}, own: {}, wear: {}, boost: 0, onb: false, offL: 0, offS: 0,
  st: { les: 0, perf: 0, ex: 0, ok: 0, conj: 0, dict: 0, speak: 0, ms: 0, speed: 0, early: 0, night: 0, wknd: 0, goalDays: 0, exam: 0, jump: 0, shop: 0 },
  lg: { week: '', tier: 0, xp: 0, res: null, top3: 0, maxTier: 0 },
  set: { sound: true, rate: 0.9, listen: true, speak: true, theme: 'auto', auto: true }
});
function load() {
  const d = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); const r = Object.assign(d, o); r.st = Object.assign(fresh().st, o.st); r.lg = Object.assign(fresh().lg, o.lg); r.set = Object.assign(fresh().set, o.set); return r; } } catch (e) { /* almacenamiento no disponible */ }
  return d;
}
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento: la sesión sigue en memoria */ } }

const dkey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
const today = () => S.days[dkey()] || { l: 0, x: 0 };
function checkStreak() {
  if (!S.last) return; const t = dkey(), d = dayDiff(S.last, t); if (d <= 1) return;
  const miss = d - 1;
  if (S.streak > 0 && S.freezes >= miss) {
    S.freezes -= miss;
    for (let i = 1; i <= miss; i++) { const dd = new Date(S.last + 'T12:00'); dd.setDate(dd.getDate() + i); const k = dkey(dd); S.days[k] = Object.assign(S.days[k] || { l: 0, x: 0 }, { fz: 1 }); }
    S.last = dkey(new Date(Date.now() - 864e5));
    setTimeout(() => toast('🧊', 'Tu protector salvó la racha', miss + (miss > 1 ? ' días' : ' día') + ' sin practicar'), 600);
  } else if (S.streak > 0) { setTimeout(() => toast('💔', 'Perdiste tu racha de ' + S.streak + ' días', 'Hoy empieza una nueva. ¡Tú puedes!'), 600); S.streak = 0; }
  save();
}

/* ---- nodos y desbloqueo ---- */
const nd = (u, i) => S.nodes[u + '-' + i] || 0;
const unitAvail = u => u === 0 || u <= S.floor || nd(u - 1, NODES.length - 1) >= PER_LEVEL;
const nodeAvail = (u, i) => unitAvail(u) && (i === 0 || u < S.floor || nd(u, i - 1) >= PER_LEVEL);
const unitDone = u => nd(u, NODES.length - 1) >= PER_LEVEL;
function current() { for (let u = 0; u < UNITS.length; u++) { if (!unitAvail(u)) break; for (let i = 0; i < NODES.length; i++) if (nodeAvail(u, i) && nd(u, i) < PER_LEVEL) return [u, i]; } let u = 0; while (u + 1 < UNITS.length && unitAvail(u + 1)) u++; return [u, NODES.length - 1]; }
const unitsDone = () => UNITS.filter((_, u) => unitDone(u)).length;
const lessonsInPath = () => Object.values(S.nodes).reduce((a, b) => a + b, 0);
const learnedWords = () => Object.keys(S.words).filter(id => WMAP[id] && S.words[id][0] >= 1);

/* ---- repetición espaciada ---- */
const IV = [10 * 60e3, 864e5, 2 * 864e5, 4 * 864e5, 8 * 864e5, 16 * 864e5, 32 * 864e5];
function touchWord(id, ok) {
  const r = S.words[id] || [0, 0, 0, 0];
  if (ok) { r[0] = Math.min(6, r[0] + 1); r[1] = Date.now() + IV[r[0]]; } else { r[0] = Math.max(0, r[0] - 2); r[1] = Date.now() + 5 * 60e3; r[3]++; }
  r[2]++; S.words[id] = r;
}
const strength = id => (S.words[id] ? S.words[id][0] : -1);
function addMistake(k, id) { S.mist = S.mist.filter(m => !(m.k === k && m.id === id)); S.mist.unshift({ k, id }); S.mist = S.mist.slice(0, 120); }
function dropMistake(k, id) { S.mist = S.mist.filter(m => !(m.k === k && m.id === id)); }
const dueWords = () => Object.keys(S.words).filter(id => WMAP[id] && S.words[id][1] <= Date.now());

/* ================= audio: voz, micrófono, efectos ================= */
const HAS_TTS = 'speechSynthesis' in window;
let frVoice = null;
function loadVoices() { if (!HAS_TTS) return; const vs = speechSynthesis.getVoices(); frVoice = vs.find(v => /fr[-_]FR/i.test(v.lang) && /google|natural|premium|enhanced|amélie|thomas/i.test(v.name)) || vs.find(v => /fr[-_]FR/i.test(v.lang)) || vs.find(v => /^fr/i.test(v.lang)) || null; }
if (HAS_TTS) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function say(text, slow) {
  if (!HAS_TTS || !text) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(text).replace(/\([^)]*\)/g, '')); u.lang = 'fr-FR'; if (frVoice) u.voice = frVoice; u.rate = slow ? 0.55 : S.set.rate; speechSynthesis.speak(u); } catch (e) { /* voz no disponible */ }
}
const listenOn = () => HAS_TTS && S.set.listen && Date.now() > S.offL;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakOn = () => S.set.speak && Date.now() > S.offS;
let AC = null;
function beep(seq) { if (!S.set.sound) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t0 = AC.currentTime; seq.forEach(([f, d, s = 0, type = 'sine', v = 0.14]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0 + s); g.gain.exponentialRampToValueAtTime(v, t0 + s + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + s + d); o.connect(g).connect(AC.destination); o.start(t0 + s); o.stop(t0 + s + d + 0.05); }); } catch (e) { /* sin audio */ } }
const SFX = {
  ok: () => beep([[659, 0.12], [988, 0.22, 0.08]]),
  bad: () => beep([[233, 0.22, 0, 'triangle', 0.16], [196, 0.3, 0.12, 'triangle', 0.14]]),
  done: () => beep([[523, 0.14], [659, 0.14, 0.11], [784, 0.14, 0.22], [1047, 0.4, 0.33]]),
  tap: () => beep([[600, 0.05, 0, 'sine', 0.05]]),
  match: () => beep([[784, 0.08], [1175, 0.12, 0.06]])
};
function speechSim(a, b) { const A = deacc(norm(a)).split(' '), B = deacc(norm(b)).split(' '); const pool = [...A]; let hit = 0; B.forEach(w => { const i = pool.indexOf(w); if (i >= 0) { hit++; pool.splice(i, 1); } }); return hit / Math.max(B.length, 1); }

/* ================= iconos ================= */
const ICO = {
  path: '<path d="M4 20c4-1 4-6 8-6s4 5 8 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="7" r="3" fill="currentColor"/><circle cx="19" cy="6" r="3" fill="currentColor"/><circle cx="12" cy="10" r="2.2" fill="currentColor"/>',
  dumb: '<path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  cup: '<path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  medal: '<circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M8 3l3 6M16 3l-3 6M12 11.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5zM4 20a2 2 0 0 0 2 2h13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 8h6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  gram: '<path d="M5 4h14v16H5z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M8 9h8M8 13h5M8 17h7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  shop: '<path d="M4 9h16l-1.5 11h-13zM8 9V7a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  vocab: '<path d="M4 6h7v12H4zM13 6h7v12h-7z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><path d="M6.5 10h2M15.5 10h2M6.5 13h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  frases: '<path d="M4 5h16v10H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><path d="M8 9h8M8 12h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  escucha: '<path d="M4 15v-3a8 8 0 0 1 16 0v3" fill="none" stroke="currentColor" stroke-width="2.3"/><rect x="3" y="14" width="5" height="7" rx="2" fill="currentColor"/><rect x="16" y="14" width="5" height="7" rx="2" fill="currentColor"/>',
  habla: '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>',
  lectura: '<path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6zM12 6v14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  cultura: '<path d="M12 2l1 4h-2zM10 6h4l2 15h-3l-1-6-1 6H8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="2"/>',
  repaso: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  examen: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z" fill="currentColor"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  spk: '<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  turtle: '<ellipse cx="12" cy="13" rx="6.5" ry="4.5" fill="currentColor"/><circle cx="20" cy="12" r="2" fill="currentColor"/><path d="M7 17l-1 2M17 17l1 2M5.5 13H3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  jump: '<path d="M5 19h14M12 15V4M7 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
};
const ico = (k, cls = '') => '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '>' + ICO[k] + '</svg>';

/* ================= Grisou, la mascota (pixel art) ================= */
function mascot(opts = {}) {
  const mood = opts.mood || 'idle', wear = opts.wear || S.wear, px = [];
  const P = (x, y, c, cls) => px.push('<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="var(' + c + ')"' + (cls ? ' class="' + cls + '"' : '') + '/>');
  for (let y = 0; y <= 6; y++) for (let x = 2; x <= 13; x++) P(x, y, '--mascot');
  for (let y = 3; y <= 4; y++) { P(0, y, '--mascot'); P(1, y, '--mascot'); P(14, y, '--mascot'); P(15, y, '--mascot'); }
  [3, 5, 10, 12].forEach(x => { P(x, 7, '--mascot-d'); P(x, 8, '--mascot-d'); });
  let eyes = '';
  const E = (x, y) => { eyes += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="var(--pix)"/>'; };
  if (mood === 'happy') { E(4, 3); E(5, 2); E(6, 3); E(9, 3); E(10, 2); E(11, 3); }
  else if (mood === 'sad') { E(5, 3); E(10, 3); E(4, 2); E(11, 2); }
  else if (mood === 'think') { E(6, 1); E(6, 2); E(11, 1); E(11, 2); }
  else { E(5, 2); E(5, 3); E(10, 2); E(10, 3); }
  for (let x = 5; x <= 10; x++) P(x, 4, '--pix'); [3, 4, 11, 12].forEach(x => P(x, 5, '--pix')); P(2, 4, '--pix'); P(13, 4, '--pix');
  if (mood === 'sad') P(6, 5, '--tear');
  const hat = wear.crown ? 'crown' : wear.beret ? 'beret' : null;
  if (hat === 'beret') { for (let x = 3; x <= 12; x++) P(x, -1, '--beret'); for (let x = 4; x <= 11; x++) P(x, -2, '--beret'); P(8, -3, '--beret'); }
  if (hat === 'crown') { for (let x = 4; x <= 11; x++) { P(x, -1, '--gold'); } [4, 6, 9, 11].forEach(x => P(x, -2, '--gold')); P(7, -2, '--gold'); P(8, -2, '--gold'); [4, 7, 11].forEach(x => P(x, -3, '--gold')); P(7, -1, '--red'); }
  if (wear.scarf) { for (let x = 2; x <= 13; x++) P(x, 6, x % 3 === 0 ? '--navy' : x % 3 === 1 ? '--white' : '--red'); P(8, 7, '--red'); P(8, 8, '--navy'); }
  if (wear.mono) { [[9, 1], [10, 1], [11, 1], [9, 4], [11, 4], [11, 2], [11, 3], [9, 2]].forEach(([x, y]) => P(x, y, '--gold')); }
  if (wear.baguette) { [[16, 2], [17, 1], [18, 0], [19, -1], [16, 3]].forEach(([x, y]) => P(x, y, '--tan')); P(17, 0, '--tan'); P(18, -1, '--tan'); }
  const cls = 'masc' + (opts.hop ? ' hop' : '');
  return '<svg class="' + cls + '" viewBox="-1 -4 22 13.2" shape-rendering="crispEdges" role="img" aria-label="Grisou, la mascota de Grey~Spell">' + px.join('') + '<g class="eye">' + eyes + '</g></svg>';
}
const logoHTML = () => mascot({ wear: {} }) + '<span>Grey<span class="tilde">~</span>Spell</span>';

/* ================= generador de ejercicios ================= */
function poolAround(u) { let p = UNITS[u].words.slice(); for (let d = 1; p.length < 12 && d < UNITS.length; d++) { if (UNITS[u - d]) p = p.concat(UNITS[u - d].words); if (UNITS[u + d] && p.length < 12) p = p.concat(UNITS[u + d].words); } return p; }
function distract(correct, pool, key, n = 3) { const seen = new Set([norm(correct)]), out = []; for (const w of shuffle(pool)) { const v = typeof w === 'string' ? w : w[key]; if (!v) continue; const k = norm(v); if (!k || seen.has(k)) continue; seen.add(k); out.push(w); if (out.length >= n) break; } return out; }
function pickWord(ws) { const list = ws.map(w => { const s = strength(w.id); return [w, s < 0 ? 5 : Math.pow(7 - s, 1.6)]; }); return wpick(list); }
const sentPool = u => { let p = UNITS[u].sents.slice(); if (u > 0) p = p.concat(UNITS[u - 1].sents); return p; };

const X = {
  intro: w => ({ t: 'intro', w, key: 'in' + w.id }),
  mcFrEs(w, pool) { const ds = distract(w.es, pool, 'es'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Traduce', q: '¿Qué significa?', big: w.fr, audio: w.fr, opts: shuffle([w.es, ...ds.map(d => d.es)]), ans: w.es, wid: [w.id], key: 'mfe' + w.id }; },
  mcEsFr(w, pool) { const ds = distract(w.fr, pool, 'fr'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Traduce', q: '¿Cómo se dice en francés?', big: w.es, opts: shuffle([w.fr, ...ds.map(d => d.fr)]), optSay: true, ans: w.fr, wid: [w.id], key: 'mef' + w.id }; },
  pic(w, pool) { if (!w.em) return null; const ds = distract(w.fr, pool.filter(x => x.em && x.em !== w.em), 'fr'); if (ds.length < 3) return null; return { t: 'choice', pics: true, kind: 'Palabra nueva', q: 'Selecciona «' + w.es + '»', opts: shuffle([w, ...ds]).map(x => ({ em: x.em, text: x.fr })), optSay: true, ans: w.fr, wid: [w.id], key: 'pic' + w.id }; },
  listenWord(w, pool) { if (!listenOn()) return null; const ds = distract(w.fr, pool, 'fr'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Escucha', listen: true, q: '¿Qué escuchaste?', audio: w.fr, opts: shuffle([w.fr, ...ds.map(d => d.fr)]), ans: w.fr, wid: [w.id], key: 'lw' + w.id }; },
  listenSent(s, pool) { if (!listenOn()) return null; const ds = distract(s.fr, pool, 'fr'); if (ds.length < 2) return null; return { t: 'choice', kind: 'Escucha', listen: true, q: '¿Qué frase escuchaste?', audio: s.fr, opts: shuffle([s.fr, ...ds.map(d => d.fr)]), ans: s.fr, sid: s.id, key: 'ls' + s.id }; },
  typeEsFr: w => ({ t: 'type', kind: 'Escribe', q: 'Escríbelo en francés', big: w.es, answers: [w.fr], lang: 'fr', wid: [w.id], key: 'tef' + w.id }),
  typeFrEs: w => ({ t: 'type', kind: 'Escribe', q: 'Escríbelo en español', big: w.fr, audio: w.fr, answers: w.alts, lang: 'es', wid: [w.id], key: 'tfe' + w.id }),
  dictWord: w => listenOn() ? { t: 'type', kind: 'Dictado', q: 'Escribe lo que escuchas', listen: true, audio: w.fr, answers: [w.fr], lang: 'fr', wid: [w.id], dict: 1, key: 'dw' + w.id } : null,
  dictSent: s => listenOn() ? { t: 'type', kind: 'Dictado', q: 'Escribe la frase que escuchas', listen: true, audio: s.fr, answers: [s.fr], lang: 'fr', sid: s.id, dict: 1, key: 'ds' + s.id } : null,
  tilesEsFr(s, pool) { const ans = toks(s.fr); if (ans.length > 14) return null; const extra = distract('', pool.flatMap(x => toks(x.fr)).filter(t => !ans.map(norm).includes(norm(t))), null, 3); return { t: 'tiles', kind: 'Traduce', q: 'Traduce esta frase', big: s.es, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'fr', sid: s.id, after: s.fr, key: 'tsf' + s.id }; },
  tilesFrEs(s, pool) { const ans = toks(s.es); if (ans.length > 14) return null; const extra = distract('', pool.flatMap(x => toks(x.es)).filter(t => !ans.map(norm).includes(norm(t))), null, 3); return { t: 'tiles', kind: 'Traduce', q: 'Traduce esta frase', big: s.fr, audio: s.fr, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'es', sid: s.id, key: 'tfs' + s.id }; },
  listenTiles(s, pool) { if (!listenOn()) return null; const ans = toks(s.fr); if (ans.length > 14) return null; const extra = distract('', pool.flatMap(x => toks(x.fr)).filter(t => !ans.map(norm).includes(norm(t))), null, 2); return { t: 'tiles', kind: 'Escucha', q: 'Toca lo que escuchas', listen: true, audio: s.fr, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'fr', sid: s.id, key: 'lt' + s.id }; },
  pairs(ws) { const sel = []; const seenF = new Set(), seenE = new Set(); for (const w of shuffle(ws)) { const a = norm(w.fr), b = norm(w.es); if (seenF.has(a) || seenE.has(b)) continue; seenF.add(a); seenE.add(b); sel.push(w); if (sel.length === 5) break; } if (sel.length < 4) return null; return { t: 'pairs', kind: 'Parejas', q: 'Toca los pares', pairs: sel, wid: sel.map(w => w.id), key: 'pr' + sel.map(w => w.id).join() }; },
  gender(w) { if (!w.gender) return null; const noun = w.fr.replace(/^(le|la|un|une) /, ''); const art = /^(un|une) /.test(w.fr) ? ['un', 'une'] : ['le', 'la']; const ans = (w.gender === 'm' ? art[0] : art[1]) + ' ' + noun; return { t: 'choice', kind: 'Género', q: '¿Masculino o femenino?', big: noun, sub: w.es, opts: [art[0] + ' ' + noun, art[1] + ' ' + noun], optSay: true, ans, wid: [w.id], key: 'g' + w.id }; },
  cloze(s, unit) {
    const T = toks(s.fr); const keys = unit.keys.map(norm);
    let idx = T.map((t, i) => keys.includes(norm(t)) ? i : -1).filter(i => i >= 0);
    let opts;
    if (idx.length) { const i = pick(idx); const ds = distract(T[i], unit.keys, null, 3); if (ds.length < 2) idx = []; else opts = [i, ds]; }
    if (!idx.length) { const cand = T.map((t, i) => norm(t).length >= 4 ? i : -1).filter(i => i >= 0); if (!cand.length) return null; const i = pick(cand); const others = sentPool(unit.i).flatMap(x => toks(x.fr)).filter(t => norm(t).length >= 3); const ds = distract(T[i], others, null, 3); if (ds.length < 3) return null; opts = [i, ds]; }
    const [i, ds] = opts; const ans = T[i];
    return { t: 'choice', kind: 'Completa', q: 'Completa la frase', cloze: T.map((t, j) => j === i ? null : t), sub: s.es, opts: shuffle([ans, ...ds]), ans, sid: s.id, after: s.fr, key: 'cz' + s.id + i };
  },
  fixSent(s, unit) {
    const T = toks(s.fr), keys = unit.keys.map(norm); const idx = T.map((t, i) => keys.includes(norm(t)) ? i : -1).filter(i => i >= 0); if (!idx.length) return null;
    const i = pick(idx); const ds = distract(T[i], unit.keys, null, 2); if (ds.length < 2) return null;
    const wrong = ds.map(d => T.map((t, j) => j === i ? d : t).join(' '));
    const right = T.join(' ');
    return { t: 'choice', kind: 'Gramática', q: '¿Cuál frase es correcta?', sub: s.es, opts: shuffle([right, ...wrong]), optSay: true, ans: right, sid: s.id, key: 'fx' + s.id };
  },
  tf(s, pool) { const other = pick(pool.filter(x => x.id !== s.id && norm(x.es) !== norm(s.es))); if (!other) return null; const right = Math.random() < 0.5; return { t: 'choice', kind: 'Comprensión', q: '¿La traducción es correcta?', big: s.fr, audio: s.fr, sub: '«' + (right ? s.es : other.es) + '»', opts: ['Sí, es correcta', 'No, es incorrecta'], ans: right ? 'Sí, es correcta' : 'No, es incorrecta', reveal: s.es, sid: s.id, key: 'tf' + s.id }; },
  speak: (text, es) => speakOn() ? { t: 'speak', kind: 'Pronunciación', q: 'Lee en voz alta', text, es, key: 'sp' + text } : null,
  read(unit) { const ss = unit.sents; if (ss.length < 5) return null; const start = rnd(ss.length - 3), part = ss.slice(start, start + 4), hi = rnd(part.length), s = part[hi]; const ds = distract(s.es, ss.filter(x => x.id !== s.id), 'es', 3); if (ds.length < 3) return null; return { t: 'read', kind: 'Lectura', q: '¿Qué significa la frase resaltada?', passage: part.map(x => x.fr), hi, opts: shuffle([s.es, ...ds.map(d => d.es)]), ans: s.es, sid: s.id, key: 'rd' + s.id }; },
  conj(v, t, typeMode) {
    const p = t === 'ger' ? 2 : rnd(6), fem = (p === 2 || p === 5) && Math.random() < 0.35;
    const ans = conj(v.inf, t, p, fem);
    const answers = [ans]; if ([0, 1, 3, 4].includes(p)) { const alt = conj(v.inf, t, p, true); if (alt !== ans) answers.push(alt); }
    const label = t === 'ger' ? v.inf : (fem ? PRF : PR)[p] + '  ·  ' + v.inf;
    const base = { kind: 'Conjugación', big: label, sub: (v.es ? v.es + ' · ' : '') + TN[t], conj: 1, key: 'cj' + v.inf + t + p + fem };
    if (typeMode) return Object.assign(base, { t: 'type', q: 'Conjuga (escribe la frase completa)', answers, lang: 'fr', hint: answers[0].replace(/[^ ']/g, '·') });
    const ts = ['pres', 'pc', 'imp', 'fut', 'cond', 'subj', 'pqp'].filter(x => x !== t);
    const pool = []; ts.forEach(x => pool.push(conj(v.inf, x, p, fem))); [0, 1, 2, 3, 4, 5].filter(x => x !== p).forEach(q => pool.push(conj(v.inf, t, q, fem && (q === 2 || q === 5))));
    const ds = distract(ans, pool, null, 3); if (ds.length < 3) return null;
    return Object.assign(base, { t: 'choice', q: 'Elige la conjugación correcta', opts: shuffle([ans, ...ds]), optSay: true, ans });
  },
  number(L) { const max = [20, 100, 1000, 10000, 10000][L - 1] || 100; const n = rnd(max); if (listenOn() && Math.random() < 0.6) return { t: 'type', kind: 'Números', q: 'Escribe en cifras el número que escuchas', listen: true, audio: frNum(n), answers: [String(n), frNum(n)], lang: 'num', key: 'nl' + n }; const set = new Set([n]); [1, -1, 10, -10, 20, 100].forEach(d => { if (n + d >= 0) set.add(n + d); }); const ds = shuffle([...set].filter(x => x !== n)).slice(0, 3); return { t: 'choice', kind: 'Números', q: '¿Cómo se escribe este número?', big: fmt(n), opts: shuffle([n, ...ds].map(frNum)), optSay: true, ans: frNum(n), key: 'nc' + n }; },
  ff() { const f = pick(FF); if (Math.random() < 0.5) { const others = FF.filter(x => x !== f).map(x => x.real); const ds = distract(f.real, [f.trap, ...shuffle(others)], null, 3); return { t: 'choice', kind: 'Falso amigo', q: '¿Qué significa realmente?', big: f.fr, audio: f.fr, opts: shuffle([f.real, ...ds]), ans: f.real, key: 'ff' + f.fr }; } const truth = Math.random() < 0.3; return { t: 'choice', kind: 'Falso amigo', q: '¿Verdadero o falso?', big: '«' + f.fr + '» significa «' + (truth ? f.real : f.trap) + '»', audio: f.fr, opts: ['Verdadero', 'Falso'], ans: truth ? 'Verdadero' : 'Falso', reveal: f.fr + ' = ' + f.real, key: 'ffb' + f.fr }; },
  cult() { const c = pick(CULT); return { t: 'choice', kind: 'Cultura', q: c.q, opts: shuffle([c.a, ...c.w]), ans: c.a, key: 'cu' + c.q }; },
  idiom() { const w = pick(IDIOMS); return X.mcFrEs(w, IDIOMS); }
};

/* ---- armado de lecciones ---- */
function genSet(kinds, n, make) { const out = [], used = new Set(); let guard = 0, ks = kinds.slice(); while (out.length < n && guard++ < n * 15) { const k = wpick(ks); if (!k) break; let it = null; try { it = make(k); } catch (e) { it = null; } if (!it) continue; if (used.has(it.key)) continue; used.add(it.key); out.push(it); if (k === 'pairs') ks = ks.filter(x => x[0] !== 'pairs'); } return out; }
function wordItem(k, w, pool, L) {
  switch (k) {
    case 'mfe': return X.mcFrEs(w, pool); case 'mef': return X.mcEsFr(w, pool); case 'pic': return X.pic(w, pool);
    case 'lw': return X.listenWord(w, pool); case 'tef': return X.typeEsFr(w); case 'tfe': return X.typeFrEs(w);
    case 'dw': return X.dictWord(w); case 'gen': return X.gender(w); case 'spw': return X.speak(w.fr, w.es);
    default: return null;
  }
}
function sentItem(k, s, unit, pool) {
  switch (k) {
    case 'tsf': return X.tilesEsFr(s, pool); case 'tfs': return X.tilesFrEs(s, pool); case 'lt': return X.listenTiles(s, pool);
    case 'ds': return X.dictSent(s); case 'tf': return X.tf(s, pool); case 'cz': return X.cloze(s, unit); case 'fx': return X.fixSent(s, unit);
    case 'ls': return X.listenSent(s, pool); case 'sps': return X.speak(s.fr, s.es); default: return null;
  }
}
const WORDK = ['mfe', 'mef', 'pic', 'lw', 'tef', 'tfe', 'dw', 'gen', 'spw', 'pairs'];
function mixed(unit, words, sents, L, n, prodBias = 0) {
  const p = clamp((L - 1) / 4 + prodBias, 0, 1), pool = poolAround(unit.i), spool = sentPool(unit.i);
  const kinds = [['mfe', 3 * (1 - p) + 0.6], ['mef', 2 * (1 - p) + 0.6], ['pic', 1.6 * (1 - p)], ['lw', 1.2], ['pairs', 0.8], ['gen', 0.6],
    ['tef', 3 * p + 0.3], ['tfe', 1.5 * p + 0.2], ['dw', 1.6 * p + 0.2], ['spw', 0.4],
    ['tsf', sents.length ? 2.2 : 0], ['tfs', sents.length ? 1.6 : 0], ['lt', sents.length ? 1.2 : 0], ['ds', sents.length ? 1.4 * p : 0], ['cz', sents.length ? 1 : 0], ['tf', sents.length ? 0.6 : 0]];
  return genSet(kinds, n, k => {
    if (k === 'pairs') return X.pairs(words.length >= 4 ? words : pool);
    if (WORDK.includes(k)) return words.length ? wordItem(k, pickWord(words), pool, L) : null;
    return sents.length ? sentItem(k, pick(sents), unit, spool) : null;
  });
}
function nodeLesson(u, ni) {
  const unit = UNITS[u], node = NODES[ni], done = nd(u, ni), L = Math.min(LEVELS, Math.floor(done / PER_LEVEL) + 1);
  const pool = poolAround(u), spool = sentPool(u), N = node.k === 'examen' ? 15 : 10;
  let items = [];
  const vocabKinds = p => [['mfe', 3 * (1 - p) + 0.5], ['mef', 2 * (1 - p) + 0.5], ['pic', 2 * (1 - p)], ['lw', 1.3], ['pairs', 1], ['gen', 0.9], ['tef', 3 * p + 0.2], ['tfe', 2 * p + 0.2], ['dw', 2 * p], ['spw', 0.4]];
  const p = (L - 1) / 4;
  if (node.k === 'vocab') {
    const ws = unit.words.filter(w => w.g === node.g);
    const unseen = ws.filter(w => !S.words[w.id]).slice(0, 3);
    items = unseen.map(X.intro);
    items = items.concat(genSet(vocabKinds(p), N, k => k === 'pairs' ? X.pairs(ws) : wordItem(k, unseen.length && Math.random() < 0.5 ? pick(unseen) : pickWord(ws), pool, L)));
  } else if (node.k === 'frases') {
    items = genSet([['tsf', 3], ['tfs', 2], ['lt', 2], ['ds', 2 * p + 0.2], ['tf', 1], ['cz', 1.4], ['fx', 0.8], ['sps', 0.5], ['ls', 1]], N, k => sentItem(k, pick(unit.sents), unit, spool));
  } else if (node.k === 'gram') {
    if (done === 0 || done % PER_LEVEL === 0) items.push({ t: 'note', u, key: 'note' + u });
    const hasV = unit.verbs.length > 0;
    items = items.concat(genSet([['cjc', hasV ? 3 * (1 - p) + 1 : 0], ['cjt', hasV ? 3 * p + 0.4 : 0], ['cz', 2.2], ['fx', 2], ['tsf', 1.4], ['ds', p]], N, k => {
      if (k === 'cjc' || k === 'cjt') return X.conj(pick(unit.verbs), pick(unit.tenses), k === 'cjt');
      return sentItem(k, pick(unit.sents), unit, spool);
    }));
  } else if (node.k === 'escucha') {
    items = genSet([['lw', 2], ['ls', 2], ['dw', 2], ['ds', 2 * p + 0.6], ['lt', 2.2], ['num', u < 4 ? 1.5 : 0.5]], N, k => {
      if (k === 'num') return X.number(Math.min(5, L + (u > 3 ? 1 : 0)));
      if (k === 'lw' || k === 'dw') return wordItem(k, pickWord(unit.words), pool, L);
      return sentItem(k, pick(unit.sents), unit, spool);
    });
    if (items.length < 4) items = mixed(unit, unit.words, unit.sents, L, N);
  } else if (node.k === 'habla') {
    items = genSet([['sps', 3], ['spw', 2], ['lt', 2], ['ls', 1], ['tsf', 1]], N, k => k === 'spw' ? X.speak(pickWord(unit.words).fr, null) : sentItem(k, pick(unit.sents), unit, spool));
    if (items.length < 4) items = mixed(unit, unit.words, unit.sents, L, N);
  } else if (node.k === 'lectura') {
    items = genSet([['rd', 4], ['tfs', 2], ['tf', 2], ['mfe', 1], ['cz', 1]], N, k => k === 'rd' ? X.read(unit) : k === 'mfe' ? X.mcFrEs(pickWord(unit.words), pool) : sentItem(k, pick(unit.sents), unit, spool));
  } else if (node.k === 'cultura') {
    items = genSet([['ff', 4], ['cu', 3], ['id', u >= 8 ? 2 : 0.6], ['mfe', 1]], N, k => k === 'ff' ? X.ff() : k === 'cu' ? X.cult() : k === 'id' ? X.idiom() : X.mcFrEs(pickWord(unit.words), pool));
  } else if (node.k === 'repaso') {
    const prev = u > 0 ? UNITS.slice(Math.max(0, u - 4), u).flatMap(x => x.words).filter(w => S.words[w.id]) : [];
    const due = prev.filter(w => S.words[w.id][1] <= Date.now());
    const ws = unit.words.concat(shuffle(due).slice(0, 12));
    items = mixed(unit, ws, unit.sents, L, N, 0.1);
  } else if (node.k === 'examen') {
    items = genSet([['tef', 2], ['tsf', 3], ['tfs', 1.5], ['ds', 1.5], ['dw', 1], ['cjt', unit.verbs.length ? 2 : 0], ['cjc', unit.verbs.length ? 1 : 0], ['cz', 2], ['mfe', 1], ['mef', 1], ['lt', 1.5], ['rd', 1]], N, k => {
      if (k === 'cjt' || k === 'cjc') return X.conj(pick(unit.verbs), pick(unit.tenses), k === 'cjt');
      if (k === 'rd') return X.read(unit);
      if (['tef', 'dw', 'mfe', 'mef'].includes(k)) return wordItem(k, pickWord(unit.words), pool, L);
      return sentItem(k, pick(unit.sents), unit, spool);
    });
  }
  if (items.filter(x => x.t !== 'intro' && x.t !== 'note').length < 5) items = items.concat(mixed(unit, unit.words, unit.sents, L, N - items.length));
  return { items, ctx: { type: 'node', u, ni, L, exam: node.k === 'examen' } };
}
function learnedUnits() { const out = []; for (let u = 0; u < UNITS.length; u++) if (unitAvail(u)) out.push(u); return out.length ? out : [0]; }
function practiceLesson(mode) {
  const us = learnedUnits(), L = 3; let items = [];
  const seenW = Object.keys(S.words).filter(id => WMAP[id]).map(id => WMAP[id]);
  const allW = seenW.length >= 6 ? seenW : us.flatMap(u => UNITS[u].words);
  const allS = us.flatMap(u => UNITS[u].sents);
  const pool = allW.length >= 8 ? allW : poolAround(0);
  if (mode === 'srs') {
    const due = dueWords().map(id => WMAP[id]); const weak = seenW.slice().sort((a, b) => strength(a.id) - strength(b.id)); const ws = (due.length >= 5 ? due : due.concat(weak)).slice(0, 20); const src = ws.length ? ws : allW;
    items = genSet([['mfe', 2], ['mef', 2], ['tef', 2.5], ['tfe', 1], ['lw', 1.2], ['dw', 1.2], ['pairs', 1], ['pic', 1]], 12, k => k === 'pairs' ? X.pairs(src) : wordItem(k, pickWord(src), pool, L));
  } else if (mode === 'errores') {
    const ms = S.mist.slice(0, 30);
    items = genSet([['x', 1]], 12, () => { const m = pick(ms); if (!m) return null; if (m.k === 'w') { const w = WMAP[m.id]; if (!w) return null; return wordItem(pick(['tef', 'mef', 'mfe', 'dw']), w, pool, L); } const s = SMAP[m.id]; if (!s) return null; return sentItem(pick(['tsf', 'tfs', 'cz', 'ds']), s, UNITS[s.u], sentPool(s.u)); });
  } else if (mode === 'escucha') {
    items = genSet([['lw', 2], ['ls', 2], ['dw', 2], ['ds', 2], ['lt', 2], ['num', 1]], 12, k => k === 'num' ? X.number(3) : (k === 'lw' || k === 'dw') ? wordItem(k, pick(allW), pool, L) : sentItem(k, pick(allS), UNITS[0], allS));
  } else if (mode === 'conj') {
    const vs = us.flatMap(u => UNITS[u].verbs.map(v => [v, UNITS[u].tenses])); const extra = [['être', 'ser/estar'], ['avoir', 'tener'], ['aller', 'ir'], ['faire', 'hacer'], ['parler', 'hablar'], ['finir', 'terminar']].map(([inf, es]) => [{ inf, es }, ['pres']]);
    const src = vs.length ? vs.concat(extra) : extra;
    items = genSet([['c', 2], ['t', 1.5]], 12, k => { const [v, ts] = pick(src); return X.conj(v, pick(ts), k === 't'); });
  } else if (mode === 'numeros') {
    items = genSet([['n', 1]], 12, () => X.number(1 + rnd(5)));
  } else if (mode === 'habla') {
    items = genSet([['s', 3], ['w', 1]], 10, k => k === 's' ? (s => X.speak(s.fr, s.es))(pick(allS)) : (w => X.speak(w.fr, w.es))(pick(allW)));
  } else if (mode === 'ff') {
    items = genSet([['f', 1]], 12, () => X.ff());
  } else if (mode === 'cultura') {
    items = genSet([['c', 2], ['i', 2]], 12, k => k === 'c' ? X.cult() : X.idiom());
  }
  if (!items.length) items = mixed(UNITS[us[us.length - 1]], allW, allS, L, 10);
  return { items, ctx: { type: 'practice', mode } };
}
function jumpLesson(u) {
  const from = Math.max(0, u - 6), units = UNITS.slice(from, u);
  const items = genSet([['tef', 2], ['tsf', 3], ['mef', 1], ['cz', 2], ['cj', 2], ['ds', 1]], 15, k => {
    const unit = pick(units);
    if (k === 'cj') return unit.verbs.length ? X.conj(pick(unit.verbs), pick(unit.tenses), Math.random() < 0.5) : null;
    if (k === 'tef' || k === 'mef') return wordItem(k, pick(unit.words), poolAround(unit.i), 4);
    return sentItem(k, pick(unit.sents), unit, sentPool(unit.i));
  });
  return { items, ctx: { type: 'jump', u, exam: true } };
}

/* ================= interfaz: plantillas ================= */
const sayBtn = (text, slow) => '<button class="say' + (slow ? ' slow' : '') + '" data-say="' + esc(text) + '"' + (slow ? ' data-slow="1"' : '') + ' aria-label="' + (slow ? 'Escuchar despacio' : 'Escuchar') + '">' + ico(slow ? 'turtle' : 'spk') + '</button>';
function md(n) {
  const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  let html = '', tbl = []; const flush = () => { if (tbl.length) { html += '<table class="gt">' + tbl.map(r => '<tr>' + r.map((c, i) => '<td' + (i === 0 ? ' data-say="' + esc(c.replace(/\(.*?\)/g, '')) + '"' : '') + '>' + inl(c) + '</td>').join('') + '</tr>').join('') + '</table>'; tbl = []; } };
  for (const l of (n || '').split('\n')) { if (l.startsWith('|')) { tbl.push(l.slice(1).split('|')); continue; } flush(); if (l.startsWith('!')) html += '<p class="tip"><b>Ojo, hispanohablante</b>' + inl(l.slice(1)) + '</p>'; else if (l.trim()) html += '<p>' + inl(l) + '</p>'; }
  flush(); return '<div class="gnote">' + html + '</div>';
}
const lvColor = lv => 'var(--' + lv + ')';

/* ---------- navegación ---------- */
const ROUTES = [['aprender', 'Aprender', 'path'], ['practicar', 'Practicar', 'dumb'], ['ligas', 'Ligas', 'cup'], ['logros', 'Logros', 'medal'], ['perfil', 'Perfil', 'user']];
const EXTRA = [['palabras', 'Palabras', 'book'], ['gramatica', 'Gramática', 'gram'], ['tienda', 'Tienda', 'shop']];
let route = 'aprender';
function renderNav() {
  const b = ([id, n, ic]) => '<button class="nav-b" data-go="' + id + '"' + (route === id ? ' aria-current="page"' : '') + '>' + ico(ic) + '<span>' + n + '</span></button>';
  $('#navSide').innerHTML = ROUTES.concat(EXTRA).map(b).join('');
  $('#navTabs').innerHTML = ROUTES.map(b).join('');
  $('#logoSide').innerHTML = logoHTML(); $('#logoTop').innerHTML = logoHTML();
}
function renderChips() {
  const t = today(), boost = S.boost > Date.now();
  $('#chips').innerHTML =
    '<button class="chip fire' + (t.l ? '' : ' dim') + '" data-go="perfil" title="Racha de días"><span class="ic">🔥</span><b>' + S.streak + '</b></button>' +
    '<button class="chip gem" data-go="tienda" title="Croissants (moneda)"><span class="ic">🥐</span><b>' + fmt(S.gems) + '</b></button>' +
    '<button class="chip xp" data-go="ligas" title="XP total"><span class="ic">' + (boost ? '⚡' : '⭐') + '</span><b>' + fmt(S.xp) + '</b></button>';
}
function renderRail() {
  const t = today(), pct = clamp(Math.round(t.l / S.goal * 100), 0, 100);
  const d0 = new Date(); const dow = (d0.getDay() + 6) % 7; const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  let week = '';
  for (let i = 0; i < 7; i++) { const dd = new Date(); dd.setDate(dd.getDate() - dow + i); const k = dkey(dd), r = S.days[k]; week += '<div>' + days[i] + '<i class="' + (r && r.l ? 'on' : r && r.fz ? 'fz' : '') + (i === dow ? ' today' : '') + '">' + (r && r.l ? '✓' : r && r.fz ? '❄' : '') + '</i></div>'; }
  leagueRoll();
  const st = standings(S.lg.week, S.lg.tier, S.lg.xp, weekFrac()); const rank = st.findIndex(x => x.me) + 1;
  const tips = UNITS.slice(0, Math.max(1, current()[0] + 1)).flatMap(u => (u.note || '').split('\n').filter(l => l.startsWith('!')).map(l => l.slice(1)));
  const tip = tips.length ? tips[(new Date().getDate() * 7) % tips.length] : '';
  $('#rail').innerHTML =
    '<div class="card"><div class="goal-row"><div class="goal-ring" style="--p:' + pct + '"><span>' + t.l + '/' + S.goal + '</span></div><div><div class="eyebrow">Meta diaria</div><h3>' + (t.l >= S.goal ? '¡Meta cumplida!' : (S.goal - t.l) + ' lecciones más') + '</h3><small class="sub">' + fmt(t.x) + ' XP hoy</small></div></div></div>' +
    '<div class="card"><div class="eyebrow">Racha</div><h3>🔥 ' + S.streak + ' ' + (S.streak === 1 ? 'día' : 'días') + '</h3><small class="sub">Protectores: ' + S.freezes + ' 🧊 · Mejor: ' + S.best + '</small><div class="week">' + week + '</div></div>' +
    '<button class="card pcard" data-go="ligas" style="width:100%"><div class="pi">' + TIERS[S.lg.tier][1] + '</div><div><div class="eyebrow">Liga ' + TIERS[S.lg.tier][0] + '</div><b>Vas en el lugar #' + rank + '</b><small>' + fmt(S.lg.xp) + ' XP esta semana</small></div></button>' +
    (tip ? '<div class="card tip-card"><div class="eyebrow">Consejo de Grisou</div><p>' + esc(tip) + '</p></div>' : '');
}

/* ---------- vista: aprender ---------- */
function viewAprender() {
  const [cu, ci] = current();
  let maxU = 0; for (let u = 0; u < UNITS.length; u++) if (unitAvail(u)) maxU = u;
  const showTo = Math.min(UNITS.length - 1, maxU + 1);
  let h = '', lastLv = '';
  for (let u = 0; u < UNITS.length; u++) {
    const unit = UNITS[u];
    if (unit.lv !== lastLv) { lastLv = unit.lv; h += '<div class="lvl-head"><h3>' + unit.lv + ' · ' + LVNAME[unit.lv] + '</h3><span>Año ' + (Math.floor(u / 12) + 1) + '</span></div>'; }
    if (u > showTo) {
      h += '<div class="lrow" style="--lv:' + lvColor(unit.lv) + '"><span class="dot"></span><div><b>' + unit.ic + ' ' + esc(unit.t) + '</b><small>Unidad ' + (u + 1) + ' · ' + esc(unit.es) + '</small></div><button class="btn ghost sm" data-jump="' + u + '" title="Prueba para saltar aquí">' + ico('jump') + '</button></div>';
      continue;
    }
    const avail = unitAvail(u);
    h += '<section class="unit" style="--lv:' + (avail ? lvColor(unit.lv) : 'var(--lock)') + '" id="u' + u + '"><header class="band"><div><div class="eyebrow">Unidad ' + (u + 1) + ' · ' + unit.lv + ' · Mes ' + (u + 1) + '</div><h2>' + unit.ic + ' ' + esc(unit.t) + '</h2><p>' + esc(unit.es) + '</p></div>' +
      (avail ? '<button class="bb" data-guide="' + u + '">' + ico('gram') + 'Guía</button>' : '<button class="bb" data-jump="' + u + '">' + ico('jump') + 'Saltar</button>') + '</header><ol class="nodes">';
    NODES.forEach((node, i) => {
      const done = nd(u, i), ok = nodeAvail(u, i), lvl = Math.floor(done / PER_LEVEL), isCur = u === cu && i === ci && ok;
      const x = Math.round(Math.sin(i * 0.95) * 78);
      const cls = 'node' + (!ok ? ' lock' : done >= PER_NODE ? ' done' : '') + (isCur ? ' cur' : '');
      const icon = !ok ? 'lock' : done >= PER_NODE ? 'check' : node.k;
      const ring = ok && done < PER_NODE ? '<span class="ring" style="--p:' + Math.round((done % PER_LEVEL) / PER_LEVEL * 100) + '"></span>' : '';
      h += '<li style="transform:translateX(' + x + 'px)">' + (isCur ? '<span class="start-tip">' + (done ? 'Continuar' : 'Empezar') + '</span>' : '') +
        '<button class="' + cls + '" data-node="' + u + ',' + i + '" aria-label="' + esc(node.n + ' — unidad ' + (u + 1)) + '">' + ring + ico(icon) + '</button>' +
        '<div class="crowns">' + Array.from({ length: LEVELS }, (_, k) => '<i class="' + (k < lvl ? 'on' : '') + '"></i>').join('') + '</div>' +
        '<div class="nlabel">' + esc(node.k === 'gram' ? unit.gt : node.n) + '</div>' +
        (isCur ? '<div class="path-masc" style="' + (x > 0 ? 'right:calc(100% + 18px)' : 'left:calc(100% + 18px)') + ';top:4px">' + mascot({ hop: true }) + '</div>' : '') + '</li>';
    });
    h += '</ol></section>';
  }
  const pctAll = (lessonsInPath() / TOTAL_LESSONS * 100);
  return '<div class="card" style="margin-top:6px;display:flex;gap:14px;align-items:center"><div style="width:64px;flex:none">' + mascot({ mood: 'happy' }) + '</div><div style="flex:1;min-width:0"><div class="eyebrow">Tu camino · 48 unidades · ' + fmt(TOTAL_LESSONS) + ' lecciones</div><b style="font-family:var(--f-d);font-size:18px">' + (S.name ? 'Allez, ' + esc(S.name) + ' !' : 'Allez !') + ' Vas en la unidad ' + (cu + 1) + '</b><div class="bar acc" style="margin-top:8px"><i style="width:' + Math.max(0.6, pctAll).toFixed(2) + '%"></i></div><small class="sub">' + pctAll.toFixed(2) + '% del curso completo</small></div></div>' + h;
}

/* ---------- vista: practicar ---------- */
function viewPracticar() {
  const due = dueWords().length, mist = S.mist.length, lw = learnedWords().length;
  const P = (mode, em, t, d, tag) => '<button class="pcard" data-prac="' + mode + '"><span class="pi">' + em + '</span><span><b>' + t + '</b><small>' + d + '</small>' + (tag ? '<span class="tag">' + tag + '</span>' : '') + '</span></button>';
  return '<div class="sec-h"><div><h2>Practicar</h2><p>Lecciones ilimitadas que también cuentan para tu meta.</p></div></div><div class="grid2">' +
    P('srs', '🧠', 'Repaso inteligente', 'Las palabras que tu memoria está a punto de olvidar.', due ? due + ' para hoy' : lw + ' palabras aprendidas') +
    P('errores', '🎯', 'Tus errores', 'Vuelve a lo que fallaste hasta dominarlo.', mist ? mist + ' pendientes' : 'Sin errores pendientes') +
    P('speed', '⏱️', 'Contrarreloj', '60 segundos. ¿Cuántas aciertas?', 'Récord: ' + S.st.speed) +
    P('conj', '🔁', 'Conjugador', 'Todos los tiempos que ya viste, sin fin.', S.st.conj + ' aciertos') +
    P('escucha', '🎧', 'Oído fino', 'Dictados y comprensión auditiva.', listenOn() ? '' : 'Activa el audio en Perfil') +
    P('habla', '🎙️', 'Pronunciación', 'Lee en voz alta y compárate.', '') +
    P('numeros', '🔢', 'Números', 'Soixante-dix, quatre-vingts… ¡domínalos!', '') +
    P('ff', '🪤', 'Falsos amigos', '«Constipé» no es lo que crees.', FF.length + ' trampas') +
    P('cultura', '🗼', 'Cultura y expresiones', 'Costumbres francófonas y modismos.', '') +
    '</div><div class="sec-h"><div><h2>Consulta</h2></div></div><div class="grid2">' +
    '<button class="pcard" data-go="palabras"><span class="pi">📖</span><span><b>Mis palabras</b><small>' + lw + ' aprendidas, con su nivel de memoria.</small></span></button>' +
    '<button class="pcard" data-go="gramatica"><span class="pi">📐</span><span><b>Guía de gramática</b><small>48 temas explicados para hispanohablantes.</small></span></button></div>';
}

/* ---------- ligas ---------- */
const TIERS = [['Baguette', '🥖'], ['Croissant', '🥐'], ['Crêpe', '🥞'], ['Macaron', '🍬'], ['Éclair', '⚡'], ['Fromage', '🧀'], ['Bordeaux', '🍷'], ['Versailles', '🏰'], ['Louvre', '🖼️'], ['Tour Eiffel', '🗼']];
const BOTN = 'Camille,Diego,Sofía,Luc,Fernanda,Mathis,Ximena,Hugo,Valentina,Théo,Renata,Inès,Emiliano,Chloé,Jorge,Manon,Regina,Lucas,Itzel,Jules,Paola,Nathan,Andrea,Léa,Santiago,Zoé,Mariana,Louis,Daniela,Arthur,Yael,Gaspard'.split(',');
const AVC = ['#0F9C86', '#4A9A2B', '#2C78D8', '#4A4FD3', '#8740CC', '#C3336B', '#D9782B', '#5B6B7F'];
function seeded(seed) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function weekKey(d = new Date()) { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return dkey(x); }
function weekFrac() { const s = new Date(weekKey() + 'T00:00'); return clamp((Date.now() - s) / (7 * 864e5), 0, 1); }
function standings(week, tier, myXP, frac) {
  const r = seeded(week + '|' + tier); const names = BOTN.slice().sort(() => r() - 0.5).slice(0, 14);
  const list = names.map((n, i) => { const rate = (35 + tier * 22) * (0.15 + r() * 1.9); const curve = 0.8 + r() * 0.5; return { name: n, xp: Math.round(rate * 7 * Math.pow(frac, curve)), c: AVC[i % AVC.length] }; });
  list.push({ name: S.name || 'Tú', xp: myXP, me: true, c: 'var(--acc)' });
  return list.sort((a, b) => b.xp - a.xp || (a.me ? -1 : 1));
}
function leagueRoll() {
  const wk = weekKey(); if (S.lg.week === wk) return;
  if (S.lg.week) {
    const list = standings(S.lg.week, S.lg.tier, S.lg.xp, 1), rank = list.findIndex(x => x.me) + 1; let res = 'stay';
    if (S.lg.xp > 0 && rank <= 5 && S.lg.tier < TIERS.length - 1) { S.lg.tier++; res = 'up'; } else if (rank >= 13 && S.lg.tier > 0) { S.lg.tier--; res = 'down'; }
    if (S.lg.xp > 0 && rank <= 3) { S.lg.top3++; S.gems += [50, 30, 20][rank - 1]; }
    S.lg.maxTier = Math.max(S.lg.maxTier, S.lg.tier); S.lg.res = { rank, res, tier: S.lg.tier };
  }
  S.lg.week = wk; S.lg.xp = 0; save();
}
function viewLigas() {
  leagueRoll();
  const st = standings(S.lg.week, S.lg.tier, S.lg.xp, weekFrac()); const end = new Date(weekKey() + 'T00:00'); end.setDate(end.getDate() + 7);
  const left = end - Date.now(), dd = Math.floor(left / 864e5), hh = Math.floor(left % 864e5 / 36e5);
  const top = S.lg.tier < TIERS.length - 1, bottom = S.lg.tier > 0;
  let rows = '';
  st.forEach((p, i) => {
    const r = i + 1;
    if (r === 6 && top) rows += '<li class="zone">▲ Zona de ascenso</li>';
    if (r === 13 && bottom) rows += '<li class="zone dn">▼ Zona de descenso</li>';
    rows += '<li class="' + (p.me ? 'me ' : '') + (r <= 5 && top ? 'up' : r >= 13 && bottom ? 'dn' : '') + '"><span class="rk">' + r + '</span><span class="av" style="background:' + p.c + '">' + esc(p.name[0].toUpperCase()) + '</span><span class="nm">' + esc(p.name) + (p.me ? ' (tú)' : '') + '</span><span class="px">' + fmt(p.xp) + ' XP</span></li>';
  });
  const res = S.lg.res ? '<p class="sub" style="margin:10px 0 0">Semana pasada: lugar #' + S.lg.res.rank + (S.lg.res.res === 'up' ? ' · ¡Subiste de liga!' : S.lg.res.res === 'down' ? ' · Bajaste de liga' : '') + '</p>' : '';
  return '<div class="sec-h"><div><h2>Ligas</h2><p>Compite cada semana. Los 5 primeros suben, los 3 últimos bajan.</p></div></div>' +
    '<div class="card"><div class="lg-top"><div class="lg-badge">' + TIERS[S.lg.tier][1] + '</div><div><div class="eyebrow">Liga ' + (S.lg.tier + 1) + ' de ' + TIERS.length + '</div><h2 style="font-size:26px">Liga ' + TIERS[S.lg.tier][0] + '</h2><small class="sub">Termina en ' + dd + ' d ' + hh + ' h</small></div></div>' +
    '<div class="lg-tiers">' + TIERS.map((t, i) => '<span class="' + (i === S.lg.tier ? 'on' : i < S.lg.tier ? 'past' : '') + '" title="' + t[0] + '">' + t[1] + '</span>').join('') + '</div>' + res +
    '<ol class="stand">' + rows + '</ol></div>';
}

/* ---------- logros ---------- */
const ACH = [
  ['l1', '👣', 'Primer paso', 'Termina tu primera lección', () => [S.st.les, 1], 5],
  ['l10', '🚲', 'En marcha', '10 lecciones', () => [S.st.les, 10], 10],
  ['l100', '💯', 'Centenario', '100 lecciones', () => [S.st.les, 100], 30],
  ['l500', '📚', 'Medio millar', '500 lecciones', () => [S.st.les, 500], 60],
  ['l1k', '🏅', 'Mil lecciones', '1 000 lecciones', () => [S.st.les, 1000], 100],
  ['l5k', '🚀', 'Imparable', '5 000 lecciones', () => [S.st.les, 5000], 200],
  ['l10k', '🌋', 'Leyenda', '10 000 lecciones', () => [S.st.les, 10000], 400],
  ['l25k', '🗼', 'Camino completo', '25 000 lecciones', () => [S.st.les, 25000], 1000],
  ['s3', '🔥', 'Chispa', 'Racha de 3 días', () => [S.best, 3], 10],
  ['s7', '🔥', 'Una semana', 'Racha de 7 días', () => [S.best, 7], 20],
  ['s30', '🔥', 'Un mes', 'Racha de 30 días', () => [S.best, 30], 60],
  ['s100', '☄️', 'Cien días', 'Racha de 100 días', () => [S.best, 100], 150],
  ['s365', '🌞', 'Un año entero', 'Racha de 365 días', () => [S.best, 365], 400],
  ['s1000', '🌌', 'Mil días', 'Racha de 1 000 días', () => [S.best, 1000], 1000],
  ['x1k', '⭐', 'Mil XP', 'Gana 1 000 XP', () => [S.xp, 1000], 20],
  ['x10k', '🌟', 'Diez mil XP', 'Gana 10 000 XP', () => [S.xp, 10000], 80],
  ['x100k', '💫', 'Cien mil XP', 'Gana 100 000 XP', () => [S.xp, 100000], 300],
  ['p1', '💎', 'Impecable', 'Una lección sin errores', () => [S.st.perf, 1], 5],
  ['p25', '💎', 'Precisión', '25 lecciones perfectas', () => [S.st.perf, 25], 40],
  ['p250', '👑', 'Perfeccionista', '250 lecciones perfectas', () => [S.st.perf, 250], 150],
  ['w50', '📖', 'Vocabulario', 'Aprende 50 palabras', () => [learnedWords().length, 50], 20],
  ['w300', '📗', 'Diccionario andante', 'Aprende 300 palabras', () => [learnedWords().length, 300], 60],
  ['w1000', '📕', 'Enciclopedia', 'Aprende 1 000 palabras', () => [learnedWords().length, 1000], 200],
  ['u1', '🎓', 'Unidad 1', 'Aprueba el primer examen', () => [unitsDone(), 1], 15],
  ['A1', '🟩', 'Nivel A1', 'Completa las 8 unidades de A1', () => [unitsDone(), 8], 100],
  ['A2', '🟢', 'Nivel A2', 'Completa A2 (16 unidades)', () => [unitsDone(), 16], 150],
  ['B1', '🔵', 'Nivel B1', 'Completa B1 (24 unidades)', () => [unitsDone(), 24], 200],
  ['B2', '🟦', 'Nivel B2', 'Completa B2 (32 unidades)', () => [unitsDone(), 32], 300],
  ['C1', '🟣', 'Nivel C1', 'Completa C1 (40 unidades)', () => [unitsDone(), 40], 400],
  ['C2', '🏆', 'Maestría C2', 'Completa las 48 unidades', () => [unitsDone(), 48], 1000],
  ['g7', '🎯', 'Constancia', 'Cumple tu meta diaria 7 veces', () => [S.st.goalDays, 7], 30],
  ['g30', '🏹', 'Disciplina', 'Cumple tu meta diaria 30 veces', () => [S.st.goalDays, 30], 100],
  ['early', '🌅', 'Madrugador', 'Una lección antes de las 7 a. m.', () => [S.st.early, 1], 10],
  ['night', '🦉', 'Búho', 'Una lección después de las 11 p. m.', () => [S.st.night, 1], 10],
  ['wknd', '🏖️', 'Guerrero de finde', '20 lecciones en fin de semana', () => [S.st.wknd, 20], 20],
  ['cj100', '🔁', 'Conjugador', '100 conjugaciones correctas', () => [S.st.conj, 100], 30],
  ['cj1k', '⚙️', 'Máquina verbal', '1 000 conjugaciones correctas', () => [S.st.conj, 1000], 120],
  ['d100', '🎧', 'Oído fino', '100 dictados correctos', () => [S.st.dict, 100], 40],
  ['sp50', '🎙️', 'Lengua suelta', '50 ejercicios de pronunciación', () => [S.st.speak, 50], 30],
  ['spd', '⚡', 'Rayo', '20 aciertos en contrarreloj', () => [S.st.speed, 20], 30],
  ['top3', '🥇', 'Podio', 'Termina una semana en el top 3', () => [S.lg.top3, 1], 30],
  ['t5', '🧀', 'Liga Fromage', 'Llega a la liga Fromage', () => [S.lg.maxTier, 5], 80],
  ['t9', '🗼', 'Tour Eiffel', 'Llega a la liga más alta', () => [S.lg.maxTier, 9], 300],
  ['ex10', '📝', 'Examinador', 'Aprueba 10 exámenes', () => [S.st.exam, 10], 40],
  ['jump', '🦘', 'Salto', 'Aprueba una prueba para saltar', () => [S.st.jump, 1], 20],
  ['shop', '🎩', 'Très chic', 'Compra un accesorio para Grisou', () => [S.st.shop, 1], 10]
];
function checkAch(silent) {
  const got = [];
  ACH.forEach(([id, em, n, d, fn, rw]) => { if (S.ach[id]) return; const [c, t] = fn(); if (c >= t) { S.ach[id] = Date.now(); S.gems += rw; got.push([em, n, rw]); } });
  if (got.length) { save(); if (!silent) got.forEach((g, i) => setTimeout(() => { toast(g[0], 'Logro: ' + g[1], '+' + g[2] + ' 🥐'); SFX.match(); }, 400 + i * 900)); }
}
function viewLogros() {
  const n = Object.keys(S.ach).length;
  return '<div class="sec-h"><div><h2>Logros</h2><p>' + n + ' de ' + ACH.length + ' desbloqueados. Cada logro da croissants.</p></div></div><div class="ach">' +
    ACH.map(([id, em, nm, d, fn, rw]) => { const [c, t] = fn(), got = S.ach[id]; return '<div class="ab' + (got ? ' got' : '') + '"><div class="md">' + em + '</div><b>' + esc(nm) + '</b><small>' + esc(d) + '</small>' + (got ? '<small style="color:var(--gold)">✓ Desbloqueado</small>' : '<div class="bar"><i style="width:' + clamp(c / t * 100, 0, 100) + '%"></i></div><small class="mono">' + fmt(Math.min(c, t)) + '/' + fmt(t) + ' · +' + rw + ' 🥐</small>') + '</div>'; }).join('') + '</div>';
}

/* ---------- perfil ---------- */
function viewPerfil() {
  const lw = learnedWords().length, acc = S.st.ex ? Math.round(S.st.ok / S.st.ex * 100) : 0, hrs = (S.st.ms / 36e5);
  let heat = ''; const end = new Date(); const start = new Date(); start.setDate(end.getDate() - 7 * 26 + 1 - ((end.getDay() + 6) % 7) + 6);
  const s0 = new Date(); s0.setDate(s0.getDate() - (7 * 25) - ((s0.getDay() + 6) % 7));
  for (let i = 0; i < 26 * 7; i++) { const d = new Date(s0); d.setDate(s0.getDate() + i); if (d > end) { heat += '<i style="visibility:hidden"></i>'; continue; } const r = S.days[dkey(d)]; const l = r ? r.l : 0; heat += '<i class="' + (r && r.fz && !l ? 'fz' : l >= 20 ? 'h4' : l >= 10 ? 'h3' : l >= 5 ? 'h2' : l >= 1 ? 'h1' : '') + '" title="' + dkey(d) + ': ' + l + ' lecciones"></i>'; }
  const cefr = LV.map(lv => { const us = UNITS.filter(u => u.lv === lv); const done = us.filter(u => unitDone(u.i)).length; const pct = Math.round(done / us.length * 100); return '<div style="--c:' + lvColor(lv) + '"><span>' + lv + '</span><div class="bar"><i style="width:' + pct + '%"></i></div><span>' + done + '/' + us.length + '</span></div>'; }).join('');
  const seg = (key, vals) => '<div class="seg">' + vals.map(([v, l]) => '<button data-set="' + key + '" data-val="' + v + '" aria-pressed="' + (String(S.set[key] === undefined ? S[key] : S.set[key]) === String(v)) + '">' + l + '</button>').join('') + '</div>';
  const goalSeg = '<div class="seg">' + [5, 10, 20, 30].map(v => '<button data-goal="' + v + '" aria-pressed="' + (S.goal === v) + '">' + v + '</button>').join('') + '</div>';
  const sw = (key, l, d) => '<div class="set-row"><label for="sw-' + key + '">' + l + '<small>' + d + '</small></label><input type="checkbox" class="sw" id="sw-' + key + '" data-sw="' + key + '"' + (S.set[key] ? ' checked' : '') + '></div>';
  return '<div class="card" style="margin-top:6px"><div class="prof"><div class="pm">' + mascot({ mood: 'happy' }) + '</div><div style="min-width:0"><div class="eyebrow">Estudiante de francés desde ' + new Date(S.created).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }) + '</div><h2>' + esc(S.name || 'Sin nombre') + '</h2><button class="link" data-act="rename" style="padding-left:0">Cambiar nombre</button></div></div>' +
    '<div class="stats"><div class="stat"><small>Racha</small><b>🔥 ' + S.streak + '</b></div><div class="stat"><small>Mejor racha</small><b>' + S.best + '</b></div><div class="stat"><small>XP total</small><b>' + fmt(S.xp) + '</b></div><div class="stat"><small>Lecciones</small><b>' + fmt(S.st.les) + '</b></div><div class="stat"><small>Palabras</small><b>' + fmt(lw) + '</b></div><div class="stat"><small>Precisión</small><b>' + acc + '%</b></div><div class="stat"><small>Horas</small><b>' + hrs.toFixed(1) + '</b></div><div class="stat"><small>Unidades</small><b>' + unitsDone() + '/48</b></div><div class="stat"><small>Logros</small><b>' + Object.keys(S.ach).length + '</b></div></div></div>' +
    '<div class="sec-h"><div><h2>Actividad</h2><p>Últimas 26 semanas.</p></div></div><div class="card"><div class="heat">' + heat + '</div></div>' +
    '<div class="sec-h"><div><h2>Nivel MCER</h2><p>Del A1 al C2: el Marco Común Europeo de Referencia.</p></div></div><div class="card cefr">' + cefr + '</div>' +
    '<div class="sec-h"><div><h2>Ajustes</h2></div></div><div class="card">' +
    '<div class="set-row"><label>Meta diaria<small>Lecciones por día. El curso está pensado para 20.</small></label>' + goalSeg + '</div>' +
    '<div class="set-row"><label>Velocidad de voz<small>' + (HAS_TTS ? (frVoice ? 'Voz: ' + esc(frVoice.name) : 'Voz francesa del sistema') : 'Tu navegador no tiene voz') + '</small></label>' + seg('rate', [[0.7, 'Lenta'], [0.9, 'Normal'], [1.05, 'Rápida']]) + '</div>' +
    '<div class="set-row"><label>Tema<small>Claro, oscuro o el de tu sistema.</small></label>' + seg('theme', [['auto', 'Auto'], ['light', 'Claro'], ['dark', 'Oscuro']]) + '</div>' +
    sw('sound', 'Efectos de sonido', 'Ding al acertar, buzz al fallar.') + sw('auto', 'Reproducir audio automático', 'Pronuncia el francés al aparecer.') + sw('listen', 'Ejercicios de escucha', 'Dictados y comprensión auditiva.') + sw('speak', 'Ejercicios de pronunciación', 'Usan el micrófono si tu navegador lo permite.') +
    '</div><div class="sec-h"><div><h2>Tus datos</h2><p>Todo vive en este navegador. Haz respaldos.</p></div></div><div class="card"><div class="row" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost sm" data-act="export">Copiar respaldo</button><button class="btn ghost sm" data-act="import">Restaurar respaldo</button><button class="btn ghost sm" data-act="reset" style="color:var(--bad)">Borrar progreso</button></div></div>';
}

/* ---------- palabras, gramática, tienda ---------- */
function viewPalabras() {
  const ids = Object.keys(S.words).filter(id => WMAP[id]).sort((a, b) => strength(a) - strength(b));
  const rows = ids.map(id => { const w = WMAP[id], s = strength(id); return '<button class="wrow" data-say="' + esc(w.fr) + '" data-q="' + esc(norm(w.fr + ' ' + w.alts.join(' '))) + '"><b>' + (w.em ? w.em + ' ' : '') + esc(w.fr) + '</b><span>' + esc(w.es) + '</span><span class="str" title="Memoria ' + s + '/6">' + Array.from({ length: 6 }, (_, k) => '<i class="' + (k < s ? 'on' : '') + '"></i>').join('') + '</span></button>'; }).join('');
  return '<div class="sec-h"><div><h2>Mis palabras</h2><p>' + ids.length + ' vistas · las más débiles primero. Toca para escuchar.</p></div></div><input class="search" id="wsearch" type="search" placeholder="Buscar en francés o español…" aria-label="Buscar palabra"><div class="wlist" id="wlist">' + (rows || '<div class="empty"><div class="em">' + mascot({ mood: 'think' }) + '</div>Aún no ves palabras. ¡Empieza tu primera lección!</div>') + '</div>';
}
function viewGramatica() {
  return '<div class="sec-h"><div><h2>Guía de gramática</h2><p>Explicada desde el español de México. Toca el francés para oírlo.</p></div></div>' +
    UNITS.map((u, i) => '<details class="gram" style="--lv:' + lvColor(u.lv) + '"' + (i === current()[0] ? ' open' : '') + '><summary><span class="lv">' + u.lv + '</span><span>' + (i + 1) + '. ' + esc(u.gt) + '</span></summary><div class="gbody">' + md(u.note) + '</div></details>').join('');
}
const SHOP = [
  ['freeze', '🧊', 'Protector de racha', 'Si un día no practicas, tu racha sigue viva. Máximo 3.', 200],
  ['boost', '⚡', 'Doble XP · 15 min', 'Todas tus lecciones valen el doble durante 15 minutos.', 120],
  ['beret', 'beret', 'Boina negra', 'El clásico accesorio parisino para Grisou.', 150],
  ['scarf', 'scarf', 'Bufanda tricolor', 'Azul, blanco y rojo. Muy chic.', 250],
  ['baguette', 'baguette', 'Baguette', 'Recién salida de la boulangerie.', 300],
  ['mono', 'mono', 'Monóculo dorado', 'Para leer a Proust con elegancia.', 450],
  ['crown', 'crown', 'Corona', 'Solo para la realeza del francés.', 1500]
];
function viewTienda() {
  return '<div class="sec-h"><div><h2>Tienda</h2><p>Tienes <b>' + fmt(S.gems) + ' 🥐</b>. Ganas croissants con lecciones, metas, ligas y logros.</p></div></div><div class="shop">' +
    SHOP.map(([id, em, n, d, cost]) => {
      const cos = !['freeze', 'boost'].includes(id), own = S.own[id], wearing = S.wear[id];
      const vis = cos ? '<div class="ii">' + mascot({ wear: { [id]: 1 } }) + '</div>' : '<div class="ii">' + em + '</div>';
      let btn;
      if (cos && own) btn = '<button class="btn sm ' + (wearing ? 'ok' : 'ghost') + '" data-wear="' + id + '">' + (wearing ? 'Puesto' : 'Ponerlo') + '</button>';
      else if (id === 'freeze' && S.freezes >= 3) btn = '<button class="btn sm" disabled>Tienes 3</button>';
      else if (id === 'boost' && S.boost > Date.now()) btn = '<button class="btn sm" disabled>Activo</button>';
      else btn = '<button class="btn sm" data-buy="' + id + '"' + (S.gems < cost ? ' disabled' : '') + '>' + cost + ' 🥐</button>';
      return '<div class="item">' + vis + '<div><b>' + esc(n) + (id === 'freeze' ? ' · tienes ' + S.freezes : '') + '</b><small>' + esc(d) + '</small></div>' + btn + '</div>';
    }).join('') + '</div>';
}

/* ---------- render principal ---------- */
function render() {
  const r = (location.hash || '#aprender').slice(1);
  route = [...ROUTES, ...EXTRA].some(x => x[0] === r) ? r : 'aprender';
  applyTheme(); renderNav(); renderChips(); renderRail();
  const V = { aprender: viewAprender, practicar: viewPracticar, ligas: viewLigas, logros: viewLogros, perfil: viewPerfil, palabras: viewPalabras, gramatica: viewGramatica, tienda: viewTienda };
  $('#view').innerHTML = V[route]();
  if (route === 'aprender') requestAnimationFrame(() => { const c = $('.node.cur'); if (c && !render.scrolled) { c.scrollIntoView({ block: 'center' }); render.scrolled = true; } });
  if (route === 'palabras') { const inp = $('#wsearch'); if (inp) inp.addEventListener('input', () => { const q = norm(inp.value); $$('#wlist .wrow').forEach(r => { r.hidden = q && !deacc(r.dataset.q).includes(deacc(q)); }); }); }
}
function applyTheme() { const t = S.set.theme; if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t); }
function go(r) { if (location.hash === '#' + r) render(); else location.hash = r; window.scrollTo(0, 0); }

/* ================= modal, toasts, confeti ================= */
function modal(html, mount) { const m = $('#modal'); m.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + html + '</div>'; m.hidden = false; if (mount) mount(m); }
function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
function toast(em, t, s) { const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = '<span class="ti">' + em + '</span><div>' + esc(t) + (s ? '<small>' + esc(s) + '</small>' : '') + '</div>'; $('#toasts').appendChild(el); setTimeout(() => el.remove(), 3600); }
function confetti() { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const c = document.createElement('div'); c.className = 'confetti'; const cols = ['var(--acc)', 'var(--gold)', 'var(--red)', 'var(--ok)', 'var(--white)', 'var(--flame)']; for (let i = 0; i < 70; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = pick(cols); p.style.animationDuration = 1.6 + Math.random() * 1.8 + 's'; p.style.animationDelay = Math.random() * 0.5 + 's'; c.appendChild(p); } document.body.appendChild(c); setTimeout(() => c.remove(), 4200); }

/* ================= motor de lección ================= */
let LS = null;
function startLesson(pack) {
  if (!pack.items.length) { toast('🤔', 'No hay ejercicios disponibles', 'Activa audio o pronunciación en Perfil'); return; }
  closeModal(); if (HAS_TTS) try { speechSynthesis.cancel(); } catch (e) { /* nada */ }
  LS = { ctx: pack.ctx, queue: pack.items.slice(), total: pack.items.length, step: 0, graded: 0, ok: 0, combo: 0, maxCombo: 0, t0: Date.now(), retry: !pack.ctx.exam, cur: null, state: 'ask', sel: null, again: new Set() };
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = '<div class="l-top"><button class="l-x" data-act="quit" aria-label="Salir de la lección">' + ico('x') + '</button><div class="l-prog" role="progressbar" aria-label="Progreso"><i></i></div><div class="l-combo" id="lcombo"></div></div><div class="l-body"><div class="l-inner" id="lbody"></div></div><div class="l-foot" id="lfoot"></div>';
  next();
}
function progress() { $('#lesson .l-prog i').style.width = (LS.step / LS.total * 100) + '%'; $('#lcombo').textContent = LS.combo >= 3 ? '🔥×' + LS.combo : ''; }
function next() { if (!LS.queue.length) return finishLesson(); LS.cur = LS.queue.shift(); LS.state = 'ask'; LS.sel = null; progress(); renderItem(); }
function foot(mode, data = {}) {
  if (mode === 'none') return;
  const f = $('#lfoot'); f.className = 'l-foot' + (mode === 'ok' ? ' ok' : mode === 'bad' ? ' bad' : '');
  const it = LS.cur;
  if (mode === 'ask') {
    const skip = it.listen ? '<button class="btn ghost" data-act="noaudio">No puedo escuchar</button>' : it.t === 'speak' ? '<button class="btn ghost" data-act="nomic">No puedo hablar</button>' : (['choice', 'type', 'tiles'].includes(it.t) && !LS.ctx.exam ? '<button class="btn ghost" data-act="skip">Saltar</button>' : '');
    f.innerHTML = '<div class="f-in"><div>' + skip + '</div><div class="f-btns"><button class="btn" id="checkBtn" data-act="check" disabled>Comprobar</button></div></div>';
  } else if (mode === 'go') {
    f.innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn" data-act="next">' + (data.label || 'Continuar') + '</button></div></div>';
    setTimeout(() => { const b = f.querySelector('.btn'); if (b) b.focus(); }, 30);
  } else {
    const ok = mode === 'ok';
    f.innerHTML = '<div class="f-in"><div class="f-msg"><span class="fi">' + (ok ? pick(['🎉', '✨', '👏', '🥳', '💪']) : '🤏') + '</span><div><h3>' + (ok ? pick(['¡Excelente!', '¡Bien hecho!', 'Parfait !', 'Très bien !', '¡Correcto!', 'Bravo !']) : 'Respuesta correcta:') + '</h3>' + (data.msg ? '<p>' + data.msg + '</p>' : '') + '</div></div><div class="f-btns"><button class="btn ' + (ok ? 'ok' : 'bad') + '" data-act="next">Continuar</button></div></div>';
    setTimeout(() => { const b = f.querySelector('.btn'); if (b) b.focus(); }, 30);
  }
}
const ready = on => { const b = $('#checkBtn'); if (b) b.disabled = !on; };
function promptHTML(it) {
  if (it.listen) return '<div class="bigsay">' + sayBtn(it.audio) + sayBtn(it.audio, true) + '</div>';
  const big = it.cloze ? '<div class="cloze">' + it.cloze.map(t => t === null ? '<span class="gap" id="gap">&nbsp;</span>' : esc(t)).join(' ') + '</div>' : (it.big ? '<div class="big">' + esc(it.big) + '</div>' : '');
  const audio = it.audio ? sayBtn(it.audio) : '';
  return '<div class="prompt"><div class="pm">' + mascot({ mood: 'think' }) + '</div><div class="bubble">' + (audio ? '<div style="display:flex;align-items:center;gap:6px">' + audio + big + '</div>' : big) + (it.sub ? '<small>' + esc(it.sub) + '</small>' : '') + '</div></div>';
}
function renderItem() {
  const it = LS.cur, b = $('#lbody');
  let h = '<div class="l-kind">' + esc(it.kind || '') + '</div>';
  if (it.t === 'intro') {
    const w = it.w;
    h = '<div class="l-kind">Palabra nueva</div><h2 class="l-q">Aprende esta palabra</h2><div class="intro">' + (w.em ? '<div class="em">' + w.em + '</div>' : '') + '<div style="display:flex;align-items:center;gap:8px">' + sayBtn(w.fr) + '<div class="big">' + esc(w.fr) + '</div></div><div style="font-size:20px;font-weight:800;color:var(--ink2)">' + esc(w.alts.join(' · ')) + '</div>' + (w.gender ? '<span class="gtag">' + (w.gender === 'm' ? 'masculino' : 'femenino') + '</span>' : '') + sayBtn(w.fr, true) + '</div>';
    b.innerHTML = h; foot('go', { label: 'Lo tengo' }); if (S.set.auto) say(w.fr); return;
  }
  if (it.t === 'note') { const u = UNITS[it.u]; b.innerHTML = '<div class="l-kind">Guía rápida</div><h2 class="l-q">' + esc(u.gt) + '</h2><div class="card">' + md(u.note) + '</div>'; foot('go', { label: '¡Entendido!' }); return; }
  h += '<h2 class="l-q">' + esc(it.q) + '</h2>';
  if (it.t === 'choice') {
    h += (it.pics ? '' : promptHTML(it)) + '<div class="opts' + (it.pics ? ' pics' : '') + '" role="listbox">' + it.opts.map((o, i) => { const txt = typeof o === 'string' ? o : o.text; return '<button class="opt' + (it.pics ? ' pic' : '') + '" data-opt="' + i + '" role="option">' + (it.pics ? '<span class="em">' + o.em + '</span>' : '<span class="k">' + (i + 1) + '</span>') + '<span>' + esc(txt) + '</span></button>'; }).join('') + '</div>';
  } else if (it.t === 'read') {
    h += '<div class="passage">' + it.passage.map((s, i) => i === it.hi ? '<mark>' + esc(s) + '</mark>' : esc(s)).join(' ') + '</div><div style="display:flex;gap:8px">' + sayBtn(it.passage.join(' ')) + sayBtn(it.passage.join(' '), true) + '</div><div class="opts">' + it.opts.map((o, i) => '<button class="opt" data-opt="' + i + '"><span class="k">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>';
  } else if (it.t === 'type') {
    h += promptHTML(it) + '<textarea class="typebox" id="tbox" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (it.lang === 'es' ? 'Escribe en español' : it.lang === 'num' ? 'Escribe el número' : 'Escribe en francés') + '" aria-label="Tu respuesta"></textarea>' +
      (it.lang === 'fr' ? '<div class="accents">' + 'é è ê à â ç î ï ô û ù ë œ'.split(' ').map(c => '<button data-acc="' + c + '">' + c + '</button>').join('') + '</div>' : '');
  } else if (it.t === 'tiles') {
    h += promptHTML(it) + '<div class="tline" id="tline" aria-label="Tu respuesta"></div><div class="bank" id="tbank">' + it.bank.map((t, i) => '<button class="tile" data-tile="' + i + '">' + esc(t) + '</button>').join('') + '</div>';
    LS.sel = [];
  } else if (it.t === 'pairs') {
    const L = shuffle(it.pairs.map((w, i) => [i, w.fr])), R = shuffle(it.pairs.map((w, i) => [i, w.es]));
    h += '<div class="pairs"><div class="col">' + L.map(([i, t]) => '<button class="opt" data-pl="' + i + '">' + esc(t) + '</button>').join('') + '</div><div class="col">' + R.map(([i, t]) => '<button class="opt" data-pr="' + i + '">' + esc(t) + '</button>').join('') + '</div></div>';
    LS.sel = { l: null, r: null, left: it.pairs.length, miss: 0 };
  } else if (it.t === 'speak') {
    h += '<div class="prompt"><div class="pm">' + mascot({ mood: 'happy' }) + '</div><div class="bubble"><div style="display:flex;align-items:center;gap:6px">' + sayBtn(it.text) + '<div class="big" style="font-size:26px">' + esc(it.text) + '</div></div>' + (it.es ? '<small>' + esc(it.es) + '</small>' : '') + '</div></div>' +
      '<button class="mic" id="micBtn" aria-label="Hablar">' + ico('habla') + '</button><p class="center sub" id="micMsg">' + (SR ? 'Toca el micrófono y lee la frase en voz alta.' : 'Escucha, repite en voz alta y marca cómo te fue.') + '</p>' +
      '<div class="center" id="selfBox">' + (SR ? '<p class="sub" style="margin:0 0 8px">¿Sin micrófono? Repite en voz alta y márcalo tú:</p>' : '') + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn ok sm" data-act="selfok">Lo dije bien</button><button class="btn ghost sm" data-act="selfbad">Me costó</button></div></div>';
  }
  b.innerHTML = h;
  foot(it.t === 'pairs' ? 'none' : 'ask');
  if (it.t === 'pairs') $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn" disabled>Encuentra todos los pares</button></div></div>';
  if (it.t === 'speak' && !SR) ready(false);
  if (it.t === 'type') { const t = $('#tbox'); setTimeout(() => t.focus(), 50); t.addEventListener('input', () => ready(t.value.trim().length > 0)); t.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (LS.state === 'ask' && t.value.trim()) check(); else if (LS.state !== 'ask') next(); } }); }
  const auto = it.listen || (S.set.auto && it.audio && it.t !== 'tiles') || (S.set.auto && it.t === 'tiles' && it.audio);
  if (auto && it.audio) setTimeout(() => say(it.audio), 250);
}
function check() {
  const it = LS.cur; if (LS.state !== 'ask') return;
  let ok = false, msg = '', note = '';
  if (it.t === 'choice' || it.t === 'read') {
    if (LS.sel == null) return;
    const o = it.opts[LS.sel], txt = typeof o === 'string' ? o : o.text; ok = norm(txt) === norm(it.ans);
    $$('#lbody [data-opt]').forEach((b, i) => { b.disabled = true; const t = typeof it.opts[i] === 'string' ? it.opts[i] : it.opts[i].text; if (norm(t) === norm(it.ans)) b.classList.add('right'); else if (i === LS.sel) b.classList.add('wrong'); });
    if (it.cloze) $('#gap').textContent = it.ans;
    msg = ok ? (it.reveal ? esc(it.reveal) : it.after ? esc(it.after) : '') : esc(it.ans) + (it.reveal ? '<br>' + esc(it.reveal) : '');
  } else if (it.t === 'type') {
    const v = $('#tbox').value; const g = grade(v, it.answers); ok = g.ok; note = g.note || '';
    $('#tbox').readOnly = true;
    msg = ok ? (note ? esc(note) : it.lang === 'num' ? esc(it.answers[0] + ' = ' + it.answers[1]) : '') : esc(it.answers[0]) + (it.lang === 'num' ? ' · ' + esc(it.answers[1]) : '');
  } else if (it.t === 'tiles') {
    const got = LS.sel.map(i => it.bank[i]).join(' '); const g = grade(got, [it.answer.join(' ')]); ok = g.ok && deacc(norm(got)) === deacc(norm(it.answer.join(' ')));
    msg = ok ? (it.after ? esc(it.after) : '') : esc(it.answer.join(' '));
  }
  resolve(ok, msg);
}
function resolve(ok, msg) {
  const it = LS.cur; LS.state = ok ? 'ok' : 'bad'; LS.graded++; S.st.ex++;
  if (ok) { LS.ok++; S.st.ok++; LS.combo++; LS.maxCombo = Math.max(LS.maxCombo, LS.combo); LS.step++; SFX.ok(); if (it.conj) S.st.conj++; if (it.dict) S.st.dict++; }
  else { LS.combo = 0; SFX.bad(); if (LS.retry && !LS.again.has(it.key)) { LS.again.add(it.key); LS.queue.push(it); } else LS.step++; }
  (it.wid || []).forEach(id => { touchWord(id, ok); if (!ok) addMistake('w', id); else if (LS.ctx.mode === 'errores') dropMistake('w', id); });
  if (it.sid) { if (!ok) addMistake('s', it.sid); else if (LS.ctx.mode === 'errores') dropMistake('s', it.sid); }
  if (ok && it.audio && !it.listen && it.lang !== 'num') { /* ya se escuchó */ } else if (ok && (it.after || (it.t === 'choice' && it.optSay))) say(it.after || it.ans);
  if (!ok && (it.after || it.lang === 'fr' || it.optSay)) say(it.after || (it.answers ? it.answers[0] : it.ans));
  progress(); foot(ok ? 'ok' : 'bad', { msg }); save();
}
function finishLesson() {
  const L = LS, ctx = L.ctx, acc = L.graded ? L.ok / L.graded : 1, ms = Date.now() - L.t0;
  const passed = !ctx.exam || acc >= 0.8;
  S.st.ms += ms;
  if (!passed) {
    $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'sad' }) + '</div><h1>Casi lo logras</h1><p class="sub">Necesitas 80% de aciertos y obtuviste ' + Math.round(acc * 100) + '%. Repasa y vuelve a intentarlo: los exámenes no cuentan si no se aprueban.</p></div>';
    $('#lesson .l-prog i').style.width = '100%';
    $('#lfoot').className = 'l-foot'; $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn ghost" data-act="close">Salir</button><button class="btn" data-act="retry">Reintentar</button></div></div>';
    save(); return;
  }
  const perfect = L.graded > 0 && L.ok === L.graded && L.again.size === 0;
  let xp = 10 + (perfect ? 5 : 0) + Math.floor(L.maxCombo / 5) + (ctx.exam ? 10 : 0);
  if (S.boost > Date.now()) xp *= 2;
  const gems = 2 + (perfect ? 3 : 0) + (ctx.exam ? 5 : 0);
  const t = dkey(), day = S.days[t] || (S.days[t] = { l: 0, x: 0 }), before = day.l;
  day.l++; day.x += xp; S.xp += xp; S.gems += gems; S.lg.xp += xp; S.st.les++; if (perfect) S.st.perf++;
  const h = new Date().getHours(), wd = new Date().getDay(); if (h < 7) S.st.early++; if (h >= 23) S.st.night++; if (wd === 0 || wd === 6) S.st.wknd++;
  let extended = false; if (S.last !== t) { S.streak = (S.last && dayDiff(S.last, t) === 1) ? S.streak + 1 : 1; S.last = t; extended = true; S.best = Math.max(S.best, S.streak); }
  const goalHit = before < S.goal && day.l >= S.goal; if (goalHit) { S.st.goalDays++; S.gems += 10; }
  if (ctx.type === 'node') { const k = ctx.u + '-' + ctx.ni; S.nodes[k] = Math.min(PER_NODE, (S.nodes[k] || 0) + 1); if (ctx.exam) S.st.exam++; }
  if (ctx.type === 'jump') { S.floor = Math.max(S.floor, ctx.u); S.st.jump++; }
  save(); SFX.done(); confetti();
  const mins = Math.floor(ms / 60000), secs = Math.round(ms % 60000 / 1000);
  const title = ctx.type === 'jump' ? '¡Salto aprobado!' : ctx.exam ? '¡Examen aprobado!' : perfect ? '¡Lección perfecta!' : '¡Lección completada!';
  $('#lesson .l-prog i').style.width = '100%';
  $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'happy', hop: true }) + '</div><h1>' + title + '</h1>' +
    (ctx.type === 'jump' ? '<p class="sub">Desbloqueaste la unidad ' + (ctx.u + 1) + ' y todo lo anterior.</p>' : '') +
    '<div class="rstats"><div class="rs" style="--c:var(--gold)"><small>XP</small><b>+' + xp + '</b></div><div class="rs" style="--c:var(--ok)"><small>Precisión</small><b>' + Math.round(acc * 100) + '%</b></div><div class="rs" style="--c:var(--acc)"><small>Tiempo</small><b>' + mins + ':' + String(secs).padStart(2, '0') + '</b></div></div>' +
    '<p class="sub">+' + gems + ' 🥐 · Hoy: ' + day.l + '/' + S.goal + ' lecciones' + (L.maxCombo >= 5 ? ' · Mejor combo ×' + L.maxCombo : '') + '</p></div>';
  $('#lfoot').className = 'l-foot';
  const after = [];
  if (extended) after.push(() => '<div class="result"><div style="font-size:90px;line-height:1">🔥</div><h1>' + S.streak + (S.streak === 1 ? ' día' : ' días') + ' de racha</h1><p class="sub">' + (S.streak === 1 ? '¡Empezaste una racha! Practica mañana para mantenerla.' : '¡Sigue así! Vuelve mañana para que crezca.') + '</p></div>');
  if (goalHit) after.push(() => '<div class="result"><div class="rm">' + mascot({ mood: 'happy', hop: true, wear: Object.assign({}, S.wear, { crown: 1 }) }) + '</div><h1>¡Meta diaria cumplida!</h1><p class="sub">' + S.goal + ' lecciones hoy. +10 🥐 de premio. Grisou está orgulloso de ti.</p></div>');
  LS.after = after;
  $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns">' + (ctx.type === 'node' ? '<button class="btn ghost" data-act="again">Otra lección</button>' : '') + '<button class="btn" data-act="done">Continuar</button></div></div>';
}
function closeLesson() { $('#lesson').hidden = true; $('#lesson').innerHTML = ''; document.body.style.overflow = ''; if (HAS_TTS) try { speechSynthesis.cancel(); } catch (e) { /* nada */ } LS = null; render(); checkAch(); }

/* ---- contrarreloj ---- */
function startSpeed() {
  const us = learnedUnits(); const seen = Object.keys(S.words).filter(id => WMAP[id]).map(id => WMAP[id]); const ws = seen.length >= 10 ? seen : us.flatMap(u => UNITS[u].words);
  LS = { ctx: { type: 'speed' }, score: 0, end: Date.now() + 60000, speed: true, ws, t0: Date.now() };
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = '<div class="l-top"><button class="l-x" data-act="quit" aria-label="Salir">' + ico('x') + '</button><div class="l-prog"><i style="width:100%;background:var(--acc)"></i></div><div class="timer" id="stimer">60</div></div><div class="l-body"><div class="l-inner" id="lbody"></div></div><div class="l-foot" id="lfoot"><div class="f-in"><div class="mono" id="sscore">Aciertos: 0</div></div></div>';
  speedQ();
  LS.iv = setInterval(() => { if (!LS || !LS.speed) return; const left = Math.max(0, LS.end - Date.now()); $('#stimer').textContent = Math.ceil(left / 1000); $('#lesson .l-prog i').style.width = (left / 600) + '%'; if (left <= 0) speedEnd(); }, 200);
}
function speedQ() { const w = pick(LS.ws); const it = Math.random() < 0.5 ? X.mcFrEs(w, LS.ws) : X.mcEsFr(w, LS.ws); if (!it) return speedQ(); LS.cur = it; $('#lbody').innerHTML = '<div class="l-kind">Contrarreloj</div><div class="big center">' + esc(it.big) + '</div><div class="opts">' + it.opts.map((o, i) => '<button class="opt" data-sopt="' + i + '"><span class="k">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>'; }
function speedAnswer(i) { const it = LS.cur, ok = norm(it.opts[i]) === norm(it.ans); (it.wid || []).forEach(id => touchWord(id, ok)); if (ok) { LS.score++; SFX.ok(); } else { SFX.bad(); LS.end -= 3000; } $('#sscore').textContent = 'Aciertos: ' + LS.score + (ok ? '' : ' · −3 s'); speedQ(); }
function speedEnd() {
  clearInterval(LS.iv); const sc = LS.score; LS.speed = false; const rec = sc > S.st.speed; S.st.speed = Math.max(S.st.speed, sc);
  const xp = Math.max(5, sc) * (S.boost > Date.now() ? 2 : 1); const t = dkey(), day = S.days[t] || (S.days[t] = { l: 0, x: 0 }); day.x += xp; S.xp += xp; S.lg.xp += xp; S.st.ms += 60000; save(); SFX.done(); if (rec) confetti();
  $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'happy', hop: true }) + '</div><h1>' + sc + ' aciertos</h1><p class="sub">' + (rec ? '¡Nuevo récord personal!' : 'Tu récord: ' + S.st.speed) + ' · +' + xp + ' XP</p></div>';
  $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn ghost" data-act="speedagain">Otra vez</button><button class="btn" data-act="close">Listo</button></div></div>';
}

/* ================= eventos ================= */
document.addEventListener('click', e => {
  const t = e.target.closest('button, [data-say]'); if (!t) { if (e.target === $('#modal')) closeModal(); return; }
  const d = t.dataset;
  if (d.say !== undefined && !t.closest('.opt')) { say(d.say, !!d.slow); return; }
  if (d.go) { go(d.go); return; }
  if (d.node) { const [u, i] = d.node.split(',').map(Number); openNode(u, i); return; }
  if (d.guide) { const u = UNITS[+d.guide]; modal('<div class="eyebrow">Unidad ' + (u.i + 1) + ' · ' + u.lv + '</div><h2>' + esc(u.gt) + '</h2>' + md(u.note) + '<button class="btn block" data-act="closemodal">Cerrar</button>'); return; }
  if (d.jump) { openJump(+d.jump); return; }
  if (d.prac) { if (d.prac === 'speed') startSpeed(); else startLesson(practiceLesson(d.prac)); return; }
  if (d.buy) { buy(d.buy); return; }
  if (d.wear) { const id = d.wear, hats = ['beret', 'crown']; if (S.wear[id]) delete S.wear[id]; else { if (hats.includes(id)) hats.forEach(h => delete S.wear[h]); S.wear[id] = 1; } save(); render(); return; }
  if (d.goal) { S.goal = +d.goal; save(); render(); return; }
  if (d.set) { const v = d.val; S.set[d.set] = isNaN(+v) ? v : +v; save(); render(); if (d.set === 'rate') say('Bonjour ! Je suis Grisou.'); return; }
  if (d.sopt !== undefined && LS && LS.speed) { speedAnswer(+d.sopt); return; }
  if (d.opt !== undefined && LS && LS.state === 'ask') { LS.sel = +d.opt; $$('#lbody [data-opt]').forEach((b, i) => b.classList.toggle('sel', i === LS.sel)); ready(true); SFX.tap(); const o = LS.cur.opts[LS.sel]; if (LS.cur.optSay) say(typeof o === 'string' ? o : o.text); if (LS.cur.cloze) $('#gap').textContent = typeof o === 'string' ? o : o.text; return; }
  if (d.acc) { const tb = $('#tbox'); if (tb && !tb.readOnly) { const s = tb.selectionStart, en = tb.selectionEnd; tb.value = tb.value.slice(0, s) + d.acc + tb.value.slice(en); tb.focus(); tb.selectionStart = tb.selectionEnd = s + d.acc.length; ready(true); } return; }
  if (d.tile !== undefined && LS && LS.state === 'ask') { const i = +d.tile; if (t.closest('#tbank')) { LS.sel.push(i); t.classList.add('ghost'); const nb = document.createElement('button'); nb.className = 'tile'; nb.dataset.tile = i; nb.textContent = LS.cur.bank[i]; $('#tline').appendChild(nb); if (LS.cur.lang === 'fr') say(LS.cur.bank[i]); } else { LS.sel.splice(LS.sel.indexOf(i), 1); t.remove(); const g = $('#tbank [data-tile="' + i + '"]'); if (g) g.classList.remove('ghost'); } SFX.tap(); ready(LS.sel.length > 0); return; }
  if ((d.pl !== undefined || d.pr !== undefined) && LS && LS.cur.t === 'pairs') { pairTap(t); return; }
  if (t.id === 'micBtn') { micGo(); return; }
  const a = d.act; if (!a) return;
  if (a === 'check') check();
  else if (a === 'next') { if (LS.state === 'ask' && LS.cur.t !== 'intro' && LS.cur.t !== 'note') return; if (LS.cur.t === 'intro') { touchWord(LS.cur.w.id, true); LS.step++; } if (LS.cur.t === 'note') LS.step++; next(); }
  else if (a === 'skip') { resolve(false, esc(LS.cur.answers ? LS.cur.answers[0] : LS.cur.answer ? LS.cur.answer.join(' ') : LS.cur.ans)); }
  else if (a === 'noaudio') { S.offL = Date.now() + 15 * 60e3; save(); toast('🔇', 'Sin ejercicios de escucha por 15 minutos'); LS.queue = LS.queue.filter(x => !x.listen); LS.total = LS.step + LS.queue.length + 0; LS.step = Math.min(LS.step, LS.total); next(); }
  else if (a === 'nomic') { S.offS = Date.now() + 15 * 60e3; save(); toast('🤫', 'Sin pronunciación por 15 minutos'); LS.queue = LS.queue.filter(x => x.t !== 'speak'); LS.total = LS.step + LS.queue.length; next(); }
  else if (a === 'selfok' || a === 'selfbad') { S.st.speak++; resolve(a === 'selfok', a === 'selfok' ? '' : esc(LS.cur.text)); }
  else if (a === 'quit') { if (LS && (LS.step > 0 || LS.speed) && !LS.done) { modal('<h2>¿Salir de la lección?</h2><p>Perderás el progreso de esta lección.</p><div class="row"><button class="btn ghost" data-act="closemodal">Seguir</button><button class="btn bad" data-act="forcequit">Salir</button></div>'); } else closeLesson(); }
  else if (a === 'forcequit') { closeModal(); if (LS && LS.iv) clearInterval(LS.iv); closeLesson(); }
  else if (a === 'closemodal') closeModal();
  else if (a === 'close') closeLesson();
  else if (a === 'retry') { const c = LS.ctx; closeLesson(); startLesson(c.type === 'jump' ? jumpLesson(c.u) : nodeLesson(c.u, c.ni)); }
  else if (a === 'done' || a === 'again') {
    if (LS.after && LS.after.length) { const f = LS.after.shift(); $('#lbody').innerHTML = f(); SFX.match(); LS.pendingAgain = LS.pendingAgain || a === 'again'; return; }
    const again = a === 'again' || LS.pendingAgain, c = LS.ctx; closeLesson();
    if (again && c.type === 'node') { const [u, i] = nd(c.u, c.ni) >= PER_NODE ? current() : [c.u, c.ni]; startLesson(nodeLesson(u, i)); }
  }
  else if (a === 'speedagain') { closeLesson(); startSpeed(); }
  else if (a === 'rename') askName();
  else if (a === 'export') { const data = JSON.stringify(S); modal('<h2>Respaldo</h2><p>Copia este texto y guárdalo (notas, correo, WhatsApp). Para restaurar, pégalo en «Restaurar respaldo».</p><textarea class="code" id="bk" readonly>' + esc(data) + '</textarea><div class="row" style="margin-top:12px"><button class="btn" data-act="copybk">Copiar</button><button class="btn ghost" data-act="closemodal">Cerrar</button></div>'); }
  else if (a === 'copybk') { const ta = $('#bk'); try { navigator.clipboard.writeText(ta.value).then(() => toast('📋', 'Respaldo copiado'), () => { ta.select(); toast('👆', 'Selecciona y copia el texto'); }); } catch (err) { ta.select(); } }
  else if (a === 'import') { modal('<h2>Restaurar respaldo</h2><p>Pega aquí el texto de tu respaldo. Reemplazará el progreso de este navegador.</p><textarea class="code" id="bkin" placeholder="{&quot;v&quot;:1,…}"></textarea><p id="bkerr" style="color:var(--bad);margin:8px 0 0" hidden></p><div class="row" style="margin-top:12px"><button class="btn" data-act="doimport">Restaurar</button><button class="btn ghost" data-act="closemodal">Cancelar</button></div>'); }
  else if (a === 'doimport') { try { const o = JSON.parse($('#bkin').value); if (!o || typeof o !== 'object' || !('xp' in o)) throw new Error('x'); S = Object.assign(fresh(), o); S.st = Object.assign(fresh().st, o.st); S.lg = Object.assign(fresh().lg, o.lg); S.set = Object.assign(fresh().set, o.set); save(); closeModal(); render(); toast('✅', 'Progreso restaurado'); } catch (err) { const p = $('#bkerr'); p.hidden = false; p.textContent = 'Ese texto no es un respaldo válido de Grey~Spell. Copia el respaldo completo, desde { hasta }.'; } }
  else if (a === 'reset') { modal('<h2>¿Borrar todo tu progreso?</h2><p>Se eliminan racha, XP, palabras, logros y accesorios de este navegador. No se puede deshacer. Haz un respaldo antes si lo quieres conservar.</p><div class="row"><button class="btn ghost" data-act="closemodal">Cancelar</button><button class="btn bad" data-act="doreset">Borrar todo</button></div>'); }
  else if (a === 'doreset') { S = fresh(); save(); closeModal(); render(); onboarding(); }
  else if (a === 'startnode') { const [u, i] = t.dataset.n.split(',').map(Number); startLesson(nodeLesson(u, i)); }
  else if (a === 'startjump') startLesson(jumpLesson(+t.dataset.u));
  else if (a === 'onbname') { const v = ($('#nm').value || '').trim().slice(0, 24); S.name = v || 'Estudiante'; save(); onbGoal(); }
  else if (a === 'onbgoal') { S.goal = +t.dataset.v; save(); onbLevel(); }
  else if (a === 'onbzero') { S.onb = true; save(); closeModal(); render(); startLesson(nodeLesson(0, 0)); }
  else if (a === 'onbjump') { S.onb = true; save(); closeModal(); render(); startLesson(jumpLesson(+t.dataset.u)); }
  else if (a === 'savename') { const v = ($('#nm').value || '').trim().slice(0, 24); if (v) S.name = v; save(); closeModal(); render(); }
});
document.addEventListener('keydown', e => {
  if (!LS || $('#lesson').hidden) return;
  if (e.target && e.target.id === 'tbox') return;
  if (LS.speed && /^[1-4]$/.test(e.key)) { speedAnswer(+e.key - 1); return; }
  if (/^[1-9]$/.test(e.key) && LS.state === 'ask') { const b = $('#lbody [data-opt="' + (+e.key - 1) + '"]'); if (b) b.click(); }
  if (e.key === 'Enter') { const b = $('#lfoot .btn:not([disabled]):last-child') || $('#lfoot .f-btns .btn:not([disabled])'); if (b) { e.preventDefault(); b.click(); } }
});
window.addEventListener('hashchange', render);
document.addEventListener('change', e => { const k = e.target.dataset && e.target.dataset.sw; if (k) { S.set[k] = e.target.checked; save(); renderChips(); } });

function pairTap(t) {
  const P = LS.sel, isL = t.dataset.pl !== undefined, idx = +(isL ? t.dataset.pl : t.dataset.pr);
  if (isL) { $$('#lbody [data-pl]').forEach(b => b.classList.remove('sel')); P.l = idx; t.classList.add('sel'); say(LS.cur.pairs[idx].fr); }
  else { $$('#lbody [data-pr]').forEach(b => b.classList.remove('sel')); P.r = idx; t.classList.add('sel'); }
  if (P.l != null && P.r != null) {
    const L = $('#lbody [data-pl="' + P.l + '"]'), R = $('#lbody [data-pr="' + P.r + '"]');
    if (P.l === P.r) { L.className = R.className = 'opt gone'; SFX.match(); P.left--; touchWord(LS.cur.pairs[P.l].id, true); }
    else { P.miss++; [L, R].forEach(b => { b.classList.remove('sel'); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 320); }); SFX.bad(); }
    P.l = P.r = null;
    if (P.left === 0) { const ok = P.miss <= 2; LS.state = ok ? 'ok' : 'bad'; LS.graded++; S.st.ex++; LS.step++; if (ok) { LS.ok++; S.st.ok++; LS.combo++; LS.maxCombo = Math.max(LS.maxCombo, LS.combo); } else LS.combo = 0; progress(); foot(ok ? 'ok' : 'bad', { msg: ok ? '' : 'Tuviste ' + P.miss + ' confusiones. ¡A la próxima!' }); save(); }
  }
}
let recog = null;
function micGo() {
  const it = LS.cur, btn = $('#micBtn'), msg = $('#micMsg');
  if (!SR) { say(it.text); $('#selfBox').hidden = false; return; }
  if (recog) { try { recog.stop(); } catch (e) { /* nada */ } return; }
  try {
    recog = new SR(); recog.lang = 'fr-FR'; recog.interimResults = false; recog.maxAlternatives = 3;
    btn.classList.add('rec'); msg.textContent = 'Escuchando… lee la frase.';
    recog.onresult = ev => { const alts = [...ev.results[0]].map(a => a.transcript); const best = Math.max(...alts.map(a => speechSim(a, it.text))); S.st.speak++; recog = null; btn.classList.remove('rec'); if (best >= 0.7) resolve(true, 'Entendí: «' + esc(alts[0]) + '»'); else { msg.textContent = 'Entendí: «' + alts[0] + '». Inténtalo otra vez o márcalo tú.'; $('#selfBox').hidden = false; } };
    recog.onerror = ev => { recog = null; btn.classList.remove('rec'); msg.textContent = ev.error === 'not-allowed' || ev.error === 'service-not-allowed' ? 'El micrófono no está disponible aquí. Escucha, repite en voz alta y marca cómo te fue.' : 'No te escuché bien. Intenta de nuevo o márcalo tú.'; $('#selfBox').hidden = false; };
    recog.onend = () => { if (recog) { recog = null; btn.classList.remove('rec'); } };
    recog.start();
  } catch (err) { recog = null; btn.classList.remove('rec'); msg.textContent = 'El micrófono no está disponible. Repite en voz alta y márcalo tú.'; $('#selfBox').hidden = false; }
}

/* ---- abrir nodo / salto / tienda ---- */
function openNode(u, i) {
  const node = NODES[i], unit = UNITS[u], done = nd(u, i), ok = nodeAvail(u, i), lvl = Math.floor(done / PER_LEVEL);
  if (!ok) { modal('<div class="eyebrow">Unidad ' + (u + 1) + '</div><h2>' + ico('lock', '') .replace('<svg', '<svg style="width:22px;vertical-align:-3px"') + ' Bloqueado</h2><p>Completa el nivel 1 del paso anterior para abrir «' + esc(node.n) + '».</p>' + (!unitAvail(u) ? '<button class="btn block" data-jump="' + u + '">Hacer prueba para saltar aquí</button><div style="height:10px"></div>' : '') + '<button class="btn ghost block" data-act="closemodal">Entendido</button>'); return; }
  const full = done >= PER_NODE;
  const desc = { vocab: 'Palabras nuevas con imágenes, audio, parejas y escritura.', frases: 'Construye y traduce frases reales.', gram: unit.gt + '. Empieza con una guía breve.', escucha: 'Dictados y comprensión auditiva.', habla: 'Lee en voz alta; Grisou te escucha.', lectura: 'Lee pequeños textos y demuestra que entiendes.', cultura: 'Falsos amigos, costumbres y expresiones.', repaso: 'Mezcla de toda la unidad con repaso espaciado.', examen: '15 preguntas sin pistas. Necesitas 80% para aprobar y abrir la siguiente unidad.' }[node.k];
  modal('<div class="eyebrow">Unidad ' + (u + 1) + ' · ' + unit.lv + ' · ' + esc(unit.t) + '</div><h2>' + esc(node.k === 'gram' ? unit.gt : node.n) + '</h2><p>' + esc(desc) + '</p>' +
    '<div class="crowns" style="justify-content:flex-start;margin:0 0 6px">' + Array.from({ length: LEVELS }, (_, k) => '<i class="' + (k < lvl ? 'on' : '') + '"></i>').join('') + '</div>' +
    '<p class="mono" style="font-size:13px">' + (full ? 'Nivel leyenda · ' + PER_NODE + '/' + PER_NODE + ' lecciones' : 'Nivel ' + Math.min(LEVELS, lvl + 1) + ' de ' + LEVELS + ' · Lección ' + (done + 1) + ' de ' + PER_NODE) + '</p>' +
    '<div class="row">' + (node.k === 'gram' ? '<button class="btn ghost" data-guide="' + u + '">Ver guía</button>' : '') + '<button class="btn" data-act="startnode" data-n="' + u + ',' + i + '">' + (full ? 'Practicar' : done ? 'Continuar · +10 XP' : 'Empezar · +10 XP') + '</button></div>');
}
function openJump(u) {
  modal('<div class="eyebrow">Prueba de salto</div><h2>Saltar a la unidad ' + (u + 1) + '</h2><p>¿Ya sabes francés? Contesta 15 preguntas de las unidades anteriores. Con 80% o más desbloqueas «' + esc(UNITS[u].t) + '» y todo lo anterior.</p><div class="row"><button class="btn ghost" data-act="closemodal">Ahora no</button><button class="btn" data-act="startjump" data-u="' + u + '">Empezar prueba</button></div>');
}
function buy(id) {
  const it = SHOP.find(x => x[0] === id); if (!it || S.gems < it[4]) return;
  S.gems -= it[4];
  if (id === 'freeze') S.freezes = Math.min(3, S.freezes + 1);
  else if (id === 'boost') S.boost = Date.now() + 15 * 60e3;
  else { S.own[id] = 1; S.st.shop++; const hats = ['beret', 'crown']; if (hats.includes(id)) hats.forEach(h => delete S.wear[h]); S.wear[id] = 1; }
  save(); SFX.match(); toast(['freeze', 'boost'].includes(id) ? it[1] : '🛍️', 'Compraste: ' + it[2]); render(); checkAch();
}

/* ---- bienvenida ---- */
function askName() { modal('<h2>¿Cómo te llamas?</h2><input type="text" id="nm" maxlength="24" value="' + esc(S.name) + '" placeholder="Tu nombre"><div class="row"><button class="btn" data-act="savename">Guardar</button></div>', () => setTimeout(() => $('#nm').focus(), 50)); }
function onboarding() {
  modal('<div style="width:130px;margin:0 auto 6px">' + mascot({ mood: 'happy', hop: true, wear: { beret: 1 } }) + '</div><h2 class="center">Bonjour ! Soy Grisou</h2><p class="center">Te voy a llevar del cero absoluto a dominar el francés en 4 años: 48 unidades, una por mes, ~20 lecciones al día. Todo pensado para quien habla español de México.</p><input type="text" id="nm" maxlength="24" placeholder="¿Cómo te llamas?" aria-label="Tu nombre"><button class="btn block" data-act="onbname">Continuar</button>', () => setTimeout(() => $('#nm').focus(), 80));
}
function onbGoal() {
  const G = [[5, 'Casual', '≈ 10 min al día'], [10, 'Regular', '≈ 20 min al día'], [20, 'Intenso', '≈ 40 min · el plan de 4 años'], [30, 'Bestia', '≈ 1 hora al día']];
  modal('<h2>Tu meta diaria</h2><p>¿Cuántas lecciones quieres hacer al día? La puedes cambiar cuando quieras.</p><div class="choicegrid">' + G.map(([v, n, d]) => '<button class="opt" data-act="onbgoal" data-v="' + v + '"><b>' + v + ' lecciones · ' + n + '</b><small>' + d + '</small></button>').join('') + '</div>');
}
function onbLevel() {
  modal('<h2>¿Cuánto francés sabes?</h2><p>Si ya sabes algo, haz una prueba y salta directo a tu nivel.</p><div class="choicegrid" style="grid-template-columns:minmax(0,1fr)">' +
    '<button class="opt" data-act="onbzero"><b>Empiezo de cero</b><small>Bonjour, merci… ¡desde la primera palabra!</small></button>' +
    '<button class="opt" data-act="onbjump" data-u="8"><b>Sé lo básico → prueba para A2</b><small>Salta a la unidad 9</small></button>' +
    '<button class="opt" data-act="onbjump" data-u="16"><b>Me defiendo → prueba para B1</b><small>Salta a la unidad 17</small></button>' +
    '<button class="opt" data-act="onbjump" data-u="24"><b>Nivel intermedio → prueba para B2</b><small>Salta a la unidad 25</small></button></div>');
}

/* ================= arranque ================= */
checkStreak(); leagueRoll(); render(); checkAch(true);
if (!S.onb) onboarding();
window.GreySpell = { conj, frNum, UNITS, nodeLesson, practiceLesson, TOTAL_LESSONS };
})();

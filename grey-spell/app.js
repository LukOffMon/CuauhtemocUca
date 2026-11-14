/* Grey~Spell — motor y app. Cuatro cursos, todo en este navegador (localStorage). */
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
const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= cursos ================= */
const CYR = 'й ц у к е н г ш щ з х ъ ф ы в а п р о л д ж э я ч с м и т ь б ю ё'.split(' ');
const META = {
  fr: { id: 'fr', name: 'Francés', adj: 'francés', flag: '🇫🇷', voice: 'fr-FR', keys: 'é è ê à â ç î ï ô û ù ë œ'.split(' '), arts: [['le', 'la'], ['un', 'une']], art: /^(le|la|les|l'|un|une|des|du|de la|de l')\s*/, hi: [['Bonjour !', '¡Hola!'], ['Allez, on y va !', '¡Vamos!'], ['Magnifique !', '¡Magnífico!'], ['Oh là là !', '¡Ay, caramba!'], ['Tu es génial !', '¡Eres genial!']] },
  pt: { id: 'pt', name: 'Portugués', adj: 'portugués', flag: '🇧🇷', voice: 'pt-BR', keys: 'á à â ã é ê í ó ô õ ú ç'.split(' '), arts: [['o', 'a'], ['um', 'uma']], art: /^(o|a|os|as|um|uma|uns|umas)\s+/, hi: [['Olá!', '¡Hola!'], ['Vamos lá!', '¡Vamos!'], ['Que legal!', '¡Qué padre!'], ['Beleza!', '¡Órale!'], ['Você é demais!', '¡Eres lo máximo!']] },
  sv: { id: 'sv', name: 'Sueco', adj: 'sueco', flag: '🇸🇪', voice: 'sv-SE', keys: 'å ä ö é'.split(' '), arts: [['en', 'ett']], art: /^(en|ett)\s+/, hi: [['Hej!', '¡Hola!'], ['Bra jobbat!', '¡Buen trabajo!'], ['Fika?', '¿Un cafecito?'], ['Lagom!', '¡Lo justo!'], ['Heja!', '¡Ánimo!']] },
  ru: { id: 'ru', name: 'Ruso', adj: 'ruso', flag: '🇷🇺', voice: 'ru-RU', keys: CYR, cyr: true, arts: [], art: /^$/, hi: [['Привет!', '¡Hola!'], ['Молодец!', '¡Bien hecho!'], ['Давай!', '¡Dale!'], ['Ура!', '¡Hurra!'], ['Отлично!', '¡Excelente!']] }
};
const CIDS = ['fr', 'pt', 'sv', 'ru'];
CIDS.forEach(id => { if (window.GSF) META[id].flag = window.GSF(id); });
/* Tema por curso: mascota (cuerpo, cara, sombrero) y color de acento de la app. Claro / oscuro. */
const THEME = {
  fr: { pet: 'Grisou', body: ['#9CA2AD', '#A9AFBA'], dark: ['#737A86', '#7E8592'], face: 'stache', hat: null, acc: [['#3046E8', '#1F31B8', '#E2E6FF'], ['#7A8EFF', '#4E61D9', '#222A4C']] },
  pt: { pet: 'Verdinho', body: ['#3FAF6E', '#4FC07E'], dark: ['#2A7F4F', '#33905C'], face: 'smile', hat: 'straw', acc: [['#0F8F5B', '#0A6B44', '#DCF3E8'], ['#47CF8D', '#2B9A63', '#16392A']] },
  sv: { pet: 'Blåbär', body: ['#5B8BD6', '#6C9AE2'], dark: ['#3D67AA', '#4673B8'], face: 'beard', hat: 'viking', acc: [['#1D6FC2', '#14508F', '#DFEBFA'], ['#6AA8F0', '#3F7CC4', '#1B2D45']] },
  ru: { pet: 'Misha', body: ['#D25A4E', '#DD6A5E'], dark: ['#9E3E35', '#A84A40'], face: 'cheeks', hat: 'ushanka', acc: [['#C9372F', '#962620', '#FBE3E1'], ['#FF7B70', '#C24A42', '#3A1E1C']] }
};
const isDark = () => S.set.theme === 'dark' || (S.set.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
const PET = () => THEME[S.cur].pet;
const TR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const translit = s => s.replace(/[а-яё]/g, c => TR[c] ?? c).replace(/kh/g, 'h').replace(/shch/g, 'sch').replace(/j/g, 'y').replace(/iy\b/g, 'y').replace(/yy/g, 'y');

const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/ё/g, 'е')
  .replace(/\([^)]*\)/g, ' ').replace(/[.,!?¿¡;:«»"“”—–\-…]/g, ' ').replace(/\s+/g, ' ').trim();
const deacc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
function lev(a, b) { const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9; let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
const ESART = /^(el|la|los|las|lo|un|una|unos|unas)\s+/;
function grade(input, answers, strict) {
  const a = norm(input); if (!a) return { ok: false };
  const N = answers.map(norm), Mm = META[cur()];
  if (N.includes(a)) return { ok: true };
  if (Mm.cyr) { const ta = translit(a); for (let i = 0; i < N.length; i++) if (translit(N[i]) === ta || translit(deacc(N[i])) === ta) return { ok: true, note: answers[i] }; }
  if (strict) return { ok: false };
  for (let i = 0; i < N.length; i++) if (deacc(a) === deacc(N[i])) return { ok: true, note: 'Cuidado con los acentos: «' + answers[i] + '»' };
  for (let i = 0; i < N.length; i++) { const st = x => x.replace(Mm.art, '').replace(ESART, ''); const a2 = st(a), b2 = st(N[i]); if (a2 && b2 && deacc(a2) === deacc(b2)) return { ok: true, note: 'Recuerda el artículo: «' + answers[i] + '»' }; }
  for (let i = 0; i < N.length; i++) { const b = deacc(N[i]), d = lev(deacc(a), b); if ((b.length >= 5 && d <= 1) || (b.length >= 12 && d <= 2)) return { ok: true, note: 'Casi perfecto, revisa la ortografía: «' + answers[i] + '»' }; }
  return { ok: false };
}
const toks = s => s.replace(/[.,!?¿¡;:«»"“”…]/g, ' ').replace(/\s[—–-]\s/g, ' ').split(/\s+/).filter(t => t && t !== '—' && t !== '-');

/* ================= conjugación (francés) ================= */
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
  if (PREF[b]) { const [pre, base] = PREF[b], f = forms(base), add = x => Array.isArray(x) ? x.map(y => pre + y) : pre + x; return FC[b] = { pres: add(f.pres), pp: add(f.pp), imp: add(f.imp), fut: add(f.fut), cond: add(f.cond), subj: add(f.subj), ps: add(f.ps), ger: pre + f.ger, ess: f.ess || ESSE.has(b) }; }
  const I = IRR[b] || {}, er = /er$/.test(b), re = /re$/.test(b), vr = /(vrir|frir)$/.test(b), ir = /ir$/.test(b) && !vr, st = b.slice(0, -2);
  let pres;
  if (I.p) pres = I.p.split(' ');
  else if (er || vr) pres = [st + 'e', st + 'es', st + 'e', soft(st, 'ons'), st + 'ez', st + 'ent'];
  else if (ir) pres = [st + 'is', st + 'is', st + 'it', st + 'issons', st + 'issez', st + 'issent'];
  else pres = [st + 's', st + 's', st, st + 'ons', st + 'ez', st + 'ent'];
  const pp = I.pp || (er ? st + 'é' : vr ? st.slice(0, -1) + 'ert' : ir ? st + 'i' : st + 'u');
  const nous = pres[3].replace(/ons$/, ''), impSt = I.im || nous;
  const IE = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], FE = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
  const imp = IE.map(e => iFix(impSt, e)), fst = I.f || (re ? b.slice(0, -1) : b);
  const fut = FE.map(e => fst + e), cond = IE.map(e => fst + e);
  let subj; if (I.sj) subj = I.sj.split(' '); else { const a = pres[5].replace(/ent$/, ''); subj = [a + 'e', a + 'es', a + 'e', iFix(impSt, 'ions'), iFix(impSt, 'iez'), a + 'ent']; }
  let ps; if (I.ps || !er) { const s = I.ps || st + 'i'; ps = [s + 's', s + 's', s + 't', circ(s) + 'mes', circ(s) + 'tes', s + 'rent']; } else ps = ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'].map(e => soft(st, e));
  return FC[b] = { pres, pp, imp, fut, cond, subj, ps, ger: I.g || nous + 'ant', ess: !!I.e || ESSE.has(b) };
}
const rf = (p, v) => (VOW.test(v) && p !== 3 && p !== 4) ? RF[p][0] + "'" + v : RF[p] + ' ' + v;
const withS = (p, fem, rest) => { const s = (fem ? PRF : PR)[p]; return (s === 'je' && VOW.test(rest)) ? "j'" + rest : s + ' ' + rest; };
function conj(inf, t, p, fem) {
  const [refl, b] = splitRefl(inf), F = forms(b);
  if (t === 'ger') return 'en ' + (refl ? rf(2, F.ger) : F.ger);
  let rest;
  if (t === 'fp') rest = forms('aller').pres[p] + ' ' + (refl ? rf(p, b) : b);
  else if (AUXT[t]) { const ess = refl || F.ess, aux = forms(ess ? 'être' : 'avoir')[AUXT[t]][p]; let pp = F.pp; if (ess) { if (fem) pp += 'e'; if (p >= 3 && !/s$/.test(pp)) pp += 's'; } rest = (refl ? rf(p, aux) : aux) + ' ' + pp; }
  else { rest = F[t][p]; if (refl) rest = rf(p, rest); }
  let out = withS(p, fem, rest);
  if (t === 'subj' || t === 'subjp') out = (VOW.test(out) ? "qu'" : 'que ') + out;
  return out;
}
const N0 = 'zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf'.split(' ');
const NT = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
function n100(n) { if (n < 20) return N0[n]; if (n < 70) { const t = NT[Math.floor(n / 10)], u = n % 10; return u === 0 ? t : u === 1 ? t + ' et un' : t + '-' + N0[u]; } if (n < 80) return n === 71 ? 'soixante et onze' : 'soixante-' + N0[n - 60]; if (n === 80) return 'quatre-vingts'; return 'quatre-vingt-' + N0[n - 80]; }
function n1000(n) { if (n < 100) return n100(n); const c = Math.floor(n / 100), r = n % 100; const s = c === 1 ? 'cent' : N0[c] + ' cent' + (r === 0 ? 's' : ''); return r ? s + ' ' + n100(r) : s; }
function frNum(n) { if (n < 1000) return n1000(n); const k = Math.floor(n / 1000), r = n % 1000; const s = k === 1 ? 'mille' : n1000(k).replace(/cents$/, 'cent') + ' mille'; return r ? s + ' ' + n1000(r) : s; }

/* ================= datos de cada curso ================= */
const LV = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const LVNAME = { A1: 'Principiante', A2: 'Básico', B1: 'Intermedio', B2: 'Intermedio alto', C1: 'Avanzado', C2: 'Maestría' };
const NODES = [
  { k: 'vocab', g: 0, n: 'Palabras I' }, { k: 'vocab', g: 1, n: 'Palabras II' }, { k: 'frases', n: 'Frases clave' },
  { k: 'gram', n: 'Gramática' }, { k: 'vocab', g: 2, n: 'Palabras III' }, { k: 'escucha', n: 'Escucha' },
  { k: 'vocab', g: 3, n: 'Palabras IV' }, { k: 'habla', n: 'Pronunciación' }, { k: 'lectura', n: 'Lectura' },
  { k: 'cultura', n: 'Cultura y trampas' }, { k: 'repaso', n: 'Repaso de unidad' }, { k: 'examen', n: 'Examen' }
];
const PER_LEVEL = 10, LEVELS = 5, PER_NODE = PER_LEVEL * LEVELS, PASS = 0.85, CERT_PASS = 0.85;
const DATA = {}, WMAP = {}, SMAP = {};
function course(id) {
  if (DATA[id]) return DATA[id];
  const src = id === 'fr' ? { units: GS.units, ff: GS.FF, cult: GS.CULT, phon: GS.FPHON } : (GS.extra && GS.extra[id]) || { units: [] };
  const Mm = META[id];
  const units = src.units.map((u, i) => {
    const words = u.w.trim().split('\n').map((line, j) => {
      const parts = line.split('='), tx = parts[0].trim(), alts = (parts[1] || '').split('/').map(s => s.trim()).filter(Boolean);
      let gender = null; Mm.arts.forEach(pair => { if (tx.startsWith(pair[0] + ' ')) gender = 0; else if (tx.startsWith(pair[1] + ' ')) gender = 1; });
      const w = { id: id + ':' + i + ':' + j, c: id, u: i, fr: tx, es: alts[0], alts, em: parts[2] && parts[2].trim(), gender, g: 0 };
      WMAP[w.id] = w; return w;
    });
    const per = Math.ceil(words.length / 4); words.forEach((w, j) => { w.g = Math.min(3, Math.floor(j / per)); });
    const sents = u.s.trim().split('\n').map((line, j) => { const k = line.indexOf('='); const s = { id: id + ':' + i + ':s' + j, c: id, u: i, fr: line.slice(0, k).trim(), es: line.slice(k + 1).trim() }; SMAP[s.id] = s; return s; });
    const verbs = id !== 'fr' ? [] : (u.g.v || '').split(',').map(x => { const [f, e] = x.split('='); return { inf: (f || '').trim(), es: (e || '').trim() }; }).filter(v => v.inf && canConj(v.inf));
    return { i, lv: u.lv, t: u.t, es: u.es, ic: u.ic, gt: u.g.t, note: u.g.n, words, sents, verbs, tenses: (u.g.ct || 'pres').split('|'), keys: (u.g.k || '').split(/\s+/).filter(Boolean) };
  });
  const lines = s => (s || '').trim().split('\n').filter(Boolean);
  return DATA[id] = {
    id, units,
    ff: lines(src.ff).map(l => { const [fr, trap, real] = l.split('|'); return { fr, trap, real }; }),
    cult: lines(src.cult).map(l => { const [q, a, b, c] = l.split('|'); return { q, a, w: [b, c] }; }),
    phon: lines(src.phon).map(l => { const [s, d, ex] = l.split('|'); return { s, d, ex: ex.split(' · ') }; }),
    idioms: [32, 40].flatMap(i => units[i] ? units[i].words : [])
  };
}
const TOTAL = () => course(cur()).units.length * NODES.length * PER_NODE;

/* ================= estado ================= */
const KEY = 'greyspell.v1';
const freshC = () => ({ nodes: {}, floor: 0, words: {}, mist: [], cert: {}, les: 0, ex: 0, ok: 0, started: 0 });
const fresh = () => ({
  v: 2, name: '', created: Date.now(), xp: 0, gems: 60, streak: 0, best: 0, last: null, freezes: 1, days: {}, goal: 20, cur: 'fr', C: {},
  ach: {}, own: {}, wear: {}, logo: 'clasico', plate: 'grafito', boost: 0, onb: false, offL: 0, offS: 0,
  st: { cards: 0, chests: 0, les: 0, perf: 0, ex: 0, ok: 0, conj: 0, dict: 0, speak: 0, ms: 0, speed: 0, early: 0, night: 0, wknd: 0, goalDays: 0, exam: 0, jump: 0, shop: 0, combo: 0, table: 0, cert: 0, logo: 0, share: 0, phon: 0 },
  set: { sound: true, rate: 0.9, listen: true, speak: true, theme: 'auto', auto: true, strict: false, haptic: true, mvoice: true }, cards: {}, q: null, miles: {}
});
function migrate(o) {
  const st = Object.assign(fresh(), o);
  st.st = Object.assign(fresh().st, o.st); st.set = Object.assign(fresh().set, o.set); st.C = o.C || {}; st.cards = o.cards || {}; st.miles = o.miles || {};
  if (!o.v || o.v < 2) { // v1: un solo curso de francés
    const c = freshC(); c.nodes = o.nodes || {}; c.floor = o.floor || 0; c.started = o.created || Date.now();
    Object.entries(o.words || {}).forEach(([k, v]) => { c.words['fr:' + k] = v; });
    c.mist = (o.mist || []).map(m => ({ k: m.k, id: 'fr:' + m.id })); c.les = (o.st && o.st.les) || 0; c.ex = (o.st && o.st.ex) || 0; c.ok = (o.st && o.st.ok) || 0;
    st.C = { fr: c }; st.cur = 'fr'; ['nodes', 'floor', 'words', 'mist', 'lg'].forEach(k => delete st[k]); st.v = 2;
    if (st.ach) { delete st.ach.top3; delete st.ach.t5; delete st.ach.t9; }
  }
  if (!META[st.cur]) st.cur = 'fr';
  return st;
}
function load() { try { const raw = localStorage.getItem(KEY); if (raw) return migrate(JSON.parse(raw)); } catch (e) { /* sin almacenamiento */ } return fresh(); }
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento: sigue en memoria */ } }
const cur = () => S.cur;
const CS = (id = S.cur) => S.C[id] || (S.C[id] = Object.assign(freshC(), { started: Date.now() }));
const CD = () => course(S.cur);
const M = () => META[S.cur];

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
    setTimeout(() => toast('ice', 'Tu protector salvó la racha', miss + (miss > 1 ? ' días' : ' día') + ' sin practicar'), 700);
  } else if (S.streak > 0) { setTimeout(() => toast('heartbreak', 'Perdiste tu racha de ' + S.streak + ' días', 'Hoy empieza una nueva.'), 700); S.streak = 0; }
  save();
}

/* ---- nodos y desbloqueo (curso actual) ---- */
const nd = (u, i) => CS().nodes[u + '-' + i] || 0;
const unitAvail = u => u === 0 || u <= CS().floor || nd(u - 1, NODES.length - 1) >= PER_LEVEL;
const nodeAvail = (u, i) => unitAvail(u) && (i === 0 || u < CS().floor || nd(u, i - 1) >= PER_LEVEL);
const unitDone = u => nd(u, NODES.length - 1) >= PER_LEVEL || u < CS().floor;
function current() { const U = CD().units; for (let u = 0; u < U.length; u++) { if (!unitAvail(u)) break; for (let i = 0; i < NODES.length; i++) if (nodeAvail(u, i) && nd(u, i) < PER_LEVEL) return [u, i]; } let u = 0; while (u + 1 < U.length && unitAvail(u + 1)) u++; return [u, NODES.length - 1]; }
const unitsDoneOf = id => { const c = S.C[id]; if (!c) return 0; let n = 0; for (let u = 0; u < 48; u++) if ((c.nodes[u + '-11'] || 0) >= PER_LEVEL || u < c.floor) n++; return n; };
const levelOf = id => { const n = unitsDoneOf(id); return n >= 48 ? 'C2+' : LV[Math.floor(n / 8)]; };
const lessonsInPath = () => Object.values(CS().nodes).reduce((a, b) => a + b, 0);
const learned = (id = S.cur) => Object.keys((S.C[id] || {}).words || {}).filter(k => S.C[id].words[k][0] >= 1).length;
const learnedAll = () => CIDS.reduce((a, id) => a + learned(id), 0);
const levelDone = lv => CD().units.filter(u => u.lv === lv).every(u => unitDone(u.i));

/* ---- repetición espaciada ---- */
const IV = [10 * 60e3, 864e5, 2 * 864e5, 4 * 864e5, 8 * 864e5, 16 * 864e5, 32 * 864e5];
function touchWord(id, ok) { const W = CS().words, r = W[id] || [0, 0, 0, 0]; if (ok) { r[0] = Math.min(6, r[0] + 1); r[1] = Date.now() + IV[r[0]]; } else { r[0] = Math.max(0, r[0] - 2); r[1] = Date.now() + 5 * 60e3; r[3]++; } r[2]++; W[id] = r; }
const strength = id => (CS().words[id] ? CS().words[id][0] : -1);
function addMistake(k, id) { const c = CS(); c.mist = c.mist.filter(m => !(m.k === k && m.id === id)); c.mist.unshift({ k, id }); c.mist = c.mist.slice(0, 150); }
function dropMistake(k, id) { const c = CS(); c.mist = c.mist.filter(m => !(m.k === k && m.id === id)); }
const dueWords = () => Object.keys(CS().words).filter(id => WMAP[id] && CS().words[id][1] <= Date.now());

/* ================= audio ================= */
const HAS_TTS = 'speechSynthesis' in window;
let VOICES = [];
function loadVoices() { if (HAS_TTS) VOICES = speechSynthesis.getVoices(); }
function voiceFor(lang) { const p = lang.slice(0, 2); const good = /google|natural|premium|enhanced|neural|siri/i; return VOICES.find(v => v.lang.replace('_', '-') === lang && good.test(v.name)) || VOICES.find(v => v.lang.replace('_', '-') === lang) || VOICES.find(v => v.lang.startsWith(p)) || null; }
if (HAS_TTS) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function say(text, slow) {
  if (!HAS_TTS || !text) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(text).replace(/\([^)]*\)/g, '')); u.lang = M().voice; const v = voiceFor(M().voice); if (v) u.voice = v; u.rate = slow ? 0.55 : S.set.rate; speechSynthesis.speak(u); } catch (e) { /* sin voz */ }
}
function utter(text, lang, rate, pitch) { const u = new SpeechSynthesisUtterance(String(text).replace(/\([^)]*\)/g, '')); u.lang = lang; const v = voiceFor(lang); if (v) u.voice = v; u.rate = rate; u.pitch = pitch; return u; }
const ESV = ['es-MX', 'es-US', 'es-419', 'es-ES'];
function petVoice() { for (const l of ESV) { const v = voiceFor(l); if (v && v.lang.replace('_', '-').startsWith(l.slice(0, 5))) return [l, v]; } const v = VOICES.find(x => /^es/i.test(x.lang)); return v ? [v.lang, v] : ['es-MX', null]; }
/* Grisou habla en español con voz amable (tono un poco más alto, ritmo claro); después dice el idioma meta si hace falta. */
function grisou(line, then, slow) {
  if (!HAS_TTS) return;
  if (!S.set.mvoice || !line) { if (then) say(then, slow); return; }
  try {
    speechSynthesis.cancel(); const [lang, v] = petVoice();
    const u = new SpeechSynthesisUtterance(line); u.lang = lang; if (v) u.voice = v; u.rate = 1.02; u.pitch = 1.28;
    u.onstart = () => document.body.classList.add('talking'); u.onend = u.onerror = () => document.body.classList.remove('talking');
    speechSynthesis.speak(u);
    if (then) speechSynthesis.speak(utter(then, M().voice, slow ? 0.55 : S.set.rate, 1));
  } catch (e) { /* sin voz */ }
}
const PRAISE = ['¡Excelente!', '¡Muy bien!', '¡Eso es!', '¡Perfecto!', '¡Así se hace!', '¡Vas volando!', '¡Qué bien lo haces!', '¡Bravo!'];
const CHEER = ['¡Hola! ¿Practicamos un ratito?', '¡Me da gusto verte!', '¡Tú puedes con esto!', '¡Vamos por la racha de hoy!', '¡Cada lección cuenta!', '¡Hoy vas a aprender algo nuevo!'];
const listenOn = () => HAS_TTS && S.set.listen && Date.now() > S.offL;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakOn = () => S.set.speak && Date.now() > S.offS;
let AC = null;
function beep(seq) { if (!S.set.sound) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t0 = AC.currentTime; seq.forEach(([f, d, s = 0, type = 'sine', v = 0.14]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0 + s); g.gain.exponentialRampToValueAtTime(v, t0 + s + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + s + d); o.connect(g).connect(AC.destination); o.start(t0 + s); o.stop(t0 + s + d + 0.05); }); } catch (e) { /* sin audio */ } }
const buzz = p => { if (S.set.haptic && navigator.vibrate) try { navigator.vibrate(p); } catch (e) { /* nada */ } };
const SFX = {
  ok: () => { beep([[659, 0.12], [988, 0.22, 0.08]]); buzz(15); },
  bad: () => { beep([[233, 0.22, 0, 'triangle', 0.16], [196, 0.3, 0.12, 'triangle', 0.14]]); buzz([40, 40, 40]); },
  done: () => { beep([[523, 0.14], [659, 0.14, 0.11], [784, 0.14, 0.22], [1047, 0.4, 0.33]]); buzz([20, 30, 60]); },
  tap: () => beep([[600, 0.05, 0, 'sine', 0.05]]),
  match: () => beep([[784, 0.08], [1175, 0.12, 0.06]]),
  boop: () => beep([[440, 0.06, 0, 'square', 0.05], [660, 0.08, 0.06, 'square', 0.05]])
};
function speechSim(a, b) { const f = x => { let y = deacc(norm(x)); if (M().cyr) y = translit(y); return y.split(' '); }; const A = f(a), B = f(b), pool = [...A]; let hit = 0; B.forEach(w => { const i = pool.indexOf(w); if (i >= 0) { hit++; pool.splice(i, 1); } }); return hit / Math.max(B.length, 1); }

/* ================= iconos ================= */
const ICO = {
  path: '<path d="M4 20c4-1 4-6 8-6s4 5 8 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="7" r="3" fill="currentColor"/><circle cx="19" cy="6" r="3" fill="currentColor"/><circle cx="12" cy="10" r="2.2" fill="currentColor"/>',
  dumb: '<path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
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
  cultura: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  repaso: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  examen: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z" fill="currentColor"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  spk: '<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  turtle: '<ellipse cx="12" cy="13" rx="6.5" ry="4.5" fill="currentColor"/><circle cx="20" cy="12" r="2" fill="currentColor"/><path d="M7 17l-1 2M17 17l1 2M5.5 13H3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  jump: '<path d="M5 19h14M12 15V4M7 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  share: '<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  cert: '<rect x="3" y="4" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="16" cy="15" r="3" fill="currentColor"/><path d="M14.5 17.5L14 22l2-1 2 1-.5-4.5M7 8h7M7 11h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  swap: '<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>'
};
Object.assign(ICO, window.GSI || {});
const UICON = window.GSUICON || [];
const ico = (k, cls = '') => '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '>' + ICO[k] + '</svg>';

/* ================= Grisou: mascota por partes, animada ================= */
const LIT = { blond: '#F2C94C', steel: '#8E99A8', fur: '#6B4A35', green2: '#1E8E4E', mascot: '#9CA2AD', 'mascot-d': '#737A86', pix: '#151820', beret: '#1D2236', gold: '#E3A00F', red: '#D33A3A', navy: '#2A3FBF', white: '#FFFFFF', tan: '#D8A35A', tear: '#58A6F0', acc: '#3046E8', ok: '#1B9350', flame: '#EE5A24', pink: '#F27BB0', book: '#B5452F', paper: '#F4F1E8', glass: '#7FD3F7' };
const POSES = [
  { id: 'clasico', n: 'Clásico', mood: 'idle', anim: 'idle', wear: {}, lv: 1 },
  { id: 'saludo', n: 'Saludando', mood: 'happy', anim: 'wave', wear: {}, lv: 1 },
  { id: 'parisino', n: 'Parisino', mood: 'idle', anim: 'idle', wear: { beret: 1, baguette: 1 }, lv: 2 },
  { id: 'lector', n: 'Lector', mood: 'think', anim: 'read', wear: { glasses: 1, book: 1 }, lv: 3 },
  { id: 'dormilon', n: 'Dormilón', mood: 'sleep', anim: 'sleep', wear: { cap: 1 }, lv: 5 },
  { id: 'fiesta', n: 'Fiesta', mood: 'happy', anim: 'party', wear: { party: 1 }, lv: 7 },
  { id: 'chef', n: 'Chef', mood: 'happy', anim: 'idle', wear: { chef: 1, stache2: 1 }, lv: 10 },
  { id: 'astro', n: 'Astronauta', mood: 'idle', anim: 'float', wear: { helmet: 1 }, lv: 14 },
  { id: 'rey', n: 'Rey del idioma', mood: 'happy', anim: 'idle', wear: { crown: 1, scarf: 1 }, lv: 20 }
];
const poseOf = id => POSES.find(p => p.id === id) || POSES[0];
/* nivel de jugador: cada nivel pide un poco más de XP */
const needFor = lv => 60 + lv * 30;
function lvlInfo(xp = S.xp) { let lv = 1, rest = xp; while (rest >= needFor(lv)) { rest -= needFor(lv); lv++; } return { lv, into: rest, need: needFor(lv) }; }
const unlockedPose = id => { const p = poseOf(id); return p.lv <= lvlInfo().lv ? id : 'clasico'; };
/* mascot({mood, anim, wear, lit}) → SVG por partes: sombra, piernas, cuerpo, brazos, cara, accesorios, efectos. */
function mascot(o = {}) {
  const lit = o.lit, th = THEME[o.course || S.cur] || THEME.fr, dk = lit ? 0 : isDark() ? 1 : 0;
  const C = k => k === 'mascot' ? th.body[dk] : k === 'mascot-d' ? th.dark[dk] : lit ? LIT[k] : 'var(--' + k + ')';
  const R = (x, y, w, h, c, cls) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + C(c) + '"' + (cls ? ' class="' + cls + '"' : '') + '/>';
  const mood = o.mood || 'idle', anim = o.anim || (mood === 'happy' ? 'hop' : mood === 'sad' ? 'sad' : mood === 'think' ? 'think' : mood === 'sleep' ? 'sleep' : 'idle');
  const wear = Object.assign({}, o.wear === undefined ? S.wear : o.wear);
  const legs = [3, 5, 10, 12].map((x, i) => R(x, 7, 1, 2, 'mascot-d', 'm-leg m-l' + (i % 2))).join('');
  let eyes;
  if (mood === 'happy') eyes = R(4, 3, 1, 1, 'pix') + R(5, 2, 1, 1, 'pix') + R(6, 3, 1, 1, 'pix') + R(9, 3, 1, 1, 'pix') + R(10, 2, 1, 1, 'pix') + R(11, 3, 1, 1, 'pix');
  else if (mood === 'sad') eyes = R(5, 3, 1, 1, 'pix') + R(10, 3, 1, 1, 'pix') + R(4, 2, 1, 1, 'pix') + R(11, 2, 1, 1, 'pix');
  else if (mood === 'sleep') eyes = R(4, 3, 2, 1, 'pix') + R(10, 3, 2, 1, 'pix');
  else if (mood === 'think') eyes = R(6, 1, 1, 2, 'pix') + R(11, 1, 1, 2, 'pix');
  else eyes = '<g class="m-look">' + R(5, 2, 1, 2, 'pix') + R(10, 2, 1, 2, 'pix') + '</g>';
  const face = wear.stache2 ? 'stache2' : th.face;
  const stache = face === 'stache2' ? R(5, 4, 6, 1, 'pix') + R(3, 5, 3, 1, 'pix') + R(10, 5, 3, 1, 'pix') + R(2, 4, 1, 1, 'pix') + R(13, 4, 1, 1, 'pix')
    : face === 'smile' ? R(6, 5, 4, 1, 'pix') + R(5, 4, 1, 1, 'pix') + R(10, 4, 1, 1, 'pix') + R(3, 4, 1, 1, 'gold') + R(12, 4, 1, 1, 'gold')
    : face === 'beard' ? R(6, 4, 4, 1, 'blond') + R(3, 5, 10, 1, 'blond') + R(4, 6, 8, 1, 'blond') + R(6, 7, 4, 1, 'blond')
    : face === 'cheeks' ? R(3, 4, 2, 1, 'pink') + R(11, 4, 2, 1, 'pink') + R(7, 5, 2, 1, 'pix')
    : R(5, 4, 6, 1, 'pix') + R(3, 5, 2, 1, 'pix') + R(11, 5, 2, 1, 'pix') + R(2, 4, 1, 1, 'pix') + R(13, 4, 1, 1, 'pix');
  const arms = '<g class="m-armL">' + R(0, 3, 2, 2, 'mascot') + '</g><g class="m-armR">' + R(14, 3, 2, 2, 'mascot') + '</g>' + (anim === 'none' ? '' : '<g class="m-armRup">' + R(14, 1, 2, 2, 'mascot') + R(15, -1, 1, 2, 'mascot') + '</g><g class="m-armLup">' + R(0, 1, 2, 2, 'mascot') + R(0, -1, 1, 2, 'mascot') + '</g>');
  let acc = '', fx = '';
  if (wear.crown) acc += R(4, -1, 8, 1, 'gold') + R(4, -2, 1, 1, 'gold') + R(7, -2, 2, 1, 'gold') + R(11, -2, 1, 1, 'gold') + R(4, -3, 1, 1, 'gold') + R(7, -3, 2, 1, 'gold') + R(11, -3, 1, 1, 'gold') + R(7, -1, 2, 1, 'red');
  else if (wear.beret) acc += R(3, -1, 10, 1, 'beret') + R(4, -2, 8, 1, 'beret') + R(8, -3, 1, 1, 'beret');
  else if (wear.party) acc += R(7, -1, 3, 1, 'pink') + R(7, -2, 2, 1, 'acc') + R(8, -3, 1, 1, 'pink') + R(8, -4, 1, 1, 'gold');
  else if (wear.chef) acc += R(4, -1, 8, 1, 'white') + R(3, -3, 10, 2, 'white') + R(4, -4, 3, 1, 'white') + R(9, -4, 3, 1, 'white');
  else if (wear.cap) acc += R(4, -1, 8, 1, 'navy') + R(5, -2, 6, 1, 'navy') + R(10, -3, 2, 1, 'navy') + R(12, -3, 1, 1, 'white');
  else if (!o.plain && th.hat === 'straw') acc += R(1, -1, 14, 1, 'tan') + R(4, -3, 8, 2, 'tan') + R(4, -2, 8, 1, 'green2') + R(5, -4, 6, 1, 'tan');
  else if (!o.plain && th.hat === 'viking') acc += R(3, -2, 10, 2, 'steel') + R(5, -3, 6, 1, 'steel') + R(7, -1, 2, 1, 'gold') + R(1, -2, 2, 1, 'white') + R(0, -4, 1, 2, 'white') + R(13, -2, 2, 1, 'white') + R(15, -4, 1, 2, 'white');
  else if (!o.plain && th.hat === 'ushanka') acc += R(2, -2, 12, 2, 'fur') + R(3, -3, 10, 1, 'fur') + R(1, 0, 2, 3, 'fur') + R(13, 0, 2, 3, 'fur') + R(7, -2, 2, 1, 'gold');
  if (wear.scarf) acc += [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(x => R(x, 6, 1, 1, x % 3 === 0 ? 'navy' : x % 3 === 1 ? 'white' : 'red')).join('') + R(8, 7, 1, 1, 'red') + R(8, 8, 1, 1, 'navy');
  if (wear.mono) acc += [[9, 1], [10, 1], [11, 1], [9, 4], [11, 4], [11, 2], [11, 3], [9, 2]].map(([x, y]) => R(x, y, 1, 1, 'gold')).join('');
  if (wear.glasses) acc += R(3, 1, 4, 1, 'pix') + R(9, 1, 4, 1, 'pix') + R(7, 2, 2, 1, 'pix') + R(3, 2, 1, 2, 'pix') + R(12, 2, 1, 2, 'pix');
  if (wear.baguette) acc += '<g class="m-prop">' + [[16, 2], [17, 1], [18, 0], [19, -1], [16, 3], [17, 0]].map(([x, y]) => R(x, y, 1, 1, 'tan')).join('') + '</g>';
  if (wear.book) acc += '<g class="m-prop">' + R(5, 5, 6, 3, 'book') + R(6, 5, 4, 2, 'paper') + R(8, 5, 0.3, 3, 'pix') + '</g>';
  if (wear.helmet) acc += '<rect x="0.5" y="-2.5" width="15" height="11" rx="4" fill="' + C('glass') + '" opacity=".28" stroke="' + C('white') + '" stroke-width=".35"/>' + R(3, -2, 2, 1, 'white');
  if (anim === 'sleep') fx += '<g class="m-z"><text x="14" y="-1" font-size="3" font-family="monospace" font-weight="700" fill="' + C('acc') + '">z</text><text x="16.5" y="-3.5" font-size="2.4" font-family="monospace" font-weight="700" fill="' + C('acc') + '">z</text></g>';
  if (anim === 'think') fx += '<g class="m-dots">' + R(16, -2, 1, 1, 'mascot-d', 'd1') + R(18, -3, 1, 1, 'mascot-d', 'd2') + R(20, -4, 1, 1, 'mascot-d', 'd3') + '</g>';
  if (anim === 'party' || anim === 'cheer') fx += '<g class="m-conf">' + [[-2, -3, 'gold'], [18, -2, 'acc'], [-1, 1, 'red'], [19, 2, 'ok'], [2, -5, 'pink'], [15, -5, 'gold']].map(([x, y, c], i) => '<rect class="cf c' + i + '" x="' + x + '" y="' + y + '" width="1" height="1" fill="' + C(c) + '"/>').join('') + '</g>';
  if (mood === 'sad') fx += '<g class="m-tear">' + R(5, 4, 1, 1, 'tear') + '</g>';
  return '<svg class="masc a-' + anim + '" viewBox="-3 -6 25 16" shape-rendering="crispEdges" role="img" aria-label="Grisou">' +
    '<ellipse class="m-shadow" cx="8" cy="9.4" rx="6.5" ry=".7" fill="' + (lit ? '#000' : 'currentColor') + '" opacity=".15"/>' +
    '<g class="m-root"><g class="m-legs">' + legs + '</g><g class="m-body">' + R(2, 0, 12, 7, 'mascot') + arms +
    '<g class="m-eyes">' + eyes + '</g><g class="m-stache">' + stache + '</g>' + acc + '</g>' + fx + '</g></svg>';
}
const logoMascot = (o = {}) => { const p = poseOf(unlockedPose(S.logo)); return mascot(Object.assign({ mood: p.mood, anim: p.anim, wear: p.wear }, o)); };
const logoHTML = () => '<span class="logo-m">' + logoMascot() + '</span><span class="logo-t">Grey<span class="tilde">~</span>Spell</span>';
function setFavicon() {
  const p = poseOf(unlockedPose(S.logo)); const svg = mascot({ mood: p.mood === 'think' ? 'idle' : p.mood, anim: 'none', wear: p.wear, lit: true }).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  let l = $('link[rel="icon"]'); if (!l) { l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); } l.type = 'image/svg+xml'; l.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* ================= generador de ejercicios ================= */
function poolAround(u) { const U = CD().units; let p = U[u].words.slice(); for (let d = 1; p.length < 14 && d < U.length; d++) { if (U[u - d]) p = p.concat(U[u - d].words); if (U[u + d] && p.length < 14) p = p.concat(U[u + d].words); } return p; }
function distract(correct, pool, key, n = 3) { const seen = new Set([norm(correct)]), out = []; for (const w of shuffle(pool)) { const v = typeof w === 'string' ? w : w[key]; if (!v) continue; const k = norm(v); if (!k || seen.has(k)) continue; seen.add(k); out.push(w); if (out.length >= n) break; } return out; }
function pickWord(ws) { const list = ws.map(w => { const s = strength(w.id); return [w, s < 0 ? 5 : Math.pow(7 - s, 1.6)]; }); return wpick(list); }
const sentPool = u => { const U = CD().units; let p = U[u].sents.slice(); if (u > 0) p = p.concat(U[u - 1].sents); if (u + 1 < U.length) p = p.concat(U[u + 1].sents.slice(0, 3)); return p; };
const L = () => M().adj;
const X = {
  intro: w => ({ t: 'intro', w, key: 'in' + w.id }),
  mcFrEs(w, pool) { const ds = distract(w.es, pool, 'es'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Traduce', q: '¿Qué significa?', big: w.fr, audio: w.fr, opts: shuffle([w.es, ...ds.map(d => d.es)]), ans: w.es, wid: [w.id], key: 'mfe' + w.id }; },
  mcEsFr(w, pool) { const ds = distract(w.fr, pool, 'fr'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Traduce', q: '¿Cómo se dice en ' + L() + '?', big: w.es, opts: shuffle([w.fr, ...ds.map(d => d.fr)]), optSay: true, ans: w.fr, wid: [w.id], key: 'mef' + w.id }; },
  pic(w, pool) { if (!w.em) return null; const ds = distract(w.fr, pool.filter(x => x.em && x.em !== w.em), 'fr'); if (ds.length < 3) return null; return { t: 'choice', pics: true, kind: 'Palabra', q: 'Selecciona «' + w.es + '»', opts: shuffle([w, ...ds]).map(x => ({ em: x.em, text: x.fr })), optSay: true, ans: w.fr, wid: [w.id], key: 'pic' + w.id }; },
  listenWord(w, pool) { if (!listenOn()) return null; const ds = distract(w.fr, pool, 'fr'); if (ds.length < 3) return null; return { t: 'choice', kind: 'Escucha', listen: true, q: '¿Qué escuchaste?', audio: w.fr, opts: shuffle([w.fr, ...ds.map(d => d.fr)]), ans: w.fr, wid: [w.id], key: 'lw' + w.id }; },
  listenSent(s, pool) { if (!listenOn()) return null; const ds = distract(s.fr, pool, 'fr'); if (ds.length < 2) return null; return { t: 'choice', kind: 'Escucha', listen: true, q: '¿Qué frase escuchaste?', audio: s.fr, opts: shuffle([s.fr, ...ds.map(d => d.fr)]), ans: s.fr, sid: s.id, key: 'ls' + s.id }; },
  typeEsFr: w => ({ t: 'type', kind: 'Escribe', q: 'Escríbelo en ' + L(), big: w.es, answers: [w.fr], lang: 'fr', wid: [w.id], key: 'tef' + w.id }),
  typeFrEs: w => ({ t: 'type', kind: 'Escribe', q: 'Escríbelo en español', big: w.fr, audio: w.fr, answers: w.alts, lang: 'es', wid: [w.id], key: 'tfe' + w.id }),
  dictWord: w => listenOn() ? { t: 'type', kind: 'Dictado', q: 'Escribe lo que escuchas', listen: true, audio: w.fr, answers: [w.fr], lang: 'fr', wid: [w.id], dict: 1, key: 'dw' + w.id } : null,
  dictSent: s => listenOn() ? { t: 'type', kind: 'Dictado', q: 'Escribe la frase que escuchas', listen: true, audio: s.fr, answers: [s.fr], lang: 'fr', sid: s.id, dict: 1, key: 'ds' + s.id } : null,
  tilesEsFr(s, pool) { const ans = toks(s.fr); if (ans.length > 15) return null; const extra = distract('', pool.flatMap(x => toks(x.fr)).filter(t => !ans.map(norm).includes(norm(t))), null, 3); return { t: 'tiles', kind: 'Traduce', q: 'Traduce esta frase', big: s.es, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'fr', sid: s.id, after: s.fr, key: 'tsf' + s.id }; },
  tilesFrEs(s, pool) { const ans = toks(s.es); if (ans.length > 15) return null; const extra = distract('', pool.flatMap(x => toks(x.es)).filter(t => !ans.map(norm).includes(norm(t))), null, 3); return { t: 'tiles', kind: 'Traduce', q: 'Traduce esta frase', big: s.fr, audio: s.fr, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'es', sid: s.id, key: 'tfs' + s.id }; },
  listenTiles(s, pool) { if (!listenOn()) return null; const ans = toks(s.fr); if (ans.length > 15) return null; const extra = distract('', pool.flatMap(x => toks(x.fr)).filter(t => !ans.map(norm).includes(norm(t))), null, 2); return { t: 'tiles', kind: 'Escucha', q: 'Toca lo que escuchas', listen: true, audio: s.fr, answer: ans, bank: shuffle([...ans, ...extra]), lang: 'fr', sid: s.id, key: 'lt' + s.id }; },
  pairs(ws) { const sel = [], sf = new Set(), se = new Set(); for (const w of shuffle(ws)) { const a = norm(w.fr), b = norm(w.es); if (sf.has(a) || se.has(b)) continue; sf.add(a); se.add(b); sel.push(w); if (sel.length === 5) break; } if (sel.length < 4) return null; return { t: 'pairs', kind: 'Parejas', q: 'Toca los pares', pairs: sel, wid: sel.map(w => w.id), key: 'pr' + sel.map(w => w.id).join() }; },
  gender(w) { if (w.gender == null) return null; const pair = M().arts.find(p => w.fr.startsWith(p[0] + ' ') || w.fr.startsWith(p[1] + ' ')); if (!pair) return null; const noun = w.fr.slice(w.fr.indexOf(' ') + 1); const ans = pair[w.gender] + ' ' + noun; return { t: 'choice', kind: 'Género', q: S.cur === 'sv' ? '¿En o ett?' : '¿Masculino o femenino?', big: noun, sub: w.es, opts: [pair[0] + ' ' + noun, pair[1] + ' ' + noun], optSay: true, ans, wid: [w.id], key: 'g' + w.id }; },
  cloze(s, unit) {
    const T = toks(s.fr), keys = unit.keys.map(norm);
    let idx = T.map((t, i) => keys.includes(norm(t)) ? i : -1).filter(i => i >= 0), opts;
    if (idx.length) { const i = pick(idx); const ds = distract(T[i], unit.keys, null, 3); if (ds.length < 2) idx = []; else opts = [i, ds]; }
    if (!idx.length) { const cand = T.map((t, i) => norm(t).length >= 4 ? i : -1).filter(i => i >= 0); if (!cand.length) return null; const i = pick(cand); const others = sentPool(unit.i).flatMap(x => toks(x.fr)).filter(t => norm(t).length >= 3); const ds = distract(T[i], others, null, 3); if (ds.length < 3) return null; opts = [i, ds]; }
    const [i, ds] = opts, ans = T[i];
    return { t: 'choice', kind: 'Completa', q: 'Completa la frase', cloze: T.map((t, j) => j === i ? null : t), sub: s.es, opts: shuffle([ans, ...ds]), ans, sid: s.id, after: s.fr, key: 'cz' + s.id + i };
  },
  fixSent(s, unit) { const T = toks(s.fr), keys = unit.keys.map(norm), idx = T.map((t, i) => keys.includes(norm(t)) ? i : -1).filter(i => i >= 0); if (!idx.length) return null; const i = pick(idx), ds = distract(T[i], unit.keys, null, 2); if (ds.length < 2) return null; const right = T.join(' '); return { t: 'choice', kind: 'Gramática', q: '¿Cuál frase es correcta?', sub: s.es, opts: shuffle([right, ...ds.map(d => T.map((t, j) => j === i ? d : t).join(' '))]), optSay: true, ans: right, sid: s.id, key: 'fx' + s.id }; },
  tf(s, pool) { const other = pick(pool.filter(x => x.id !== s.id && norm(x.es) !== norm(s.es))); if (!other) return null; const right = Math.random() < 0.5; return { t: 'choice', kind: 'Comprensión', q: '¿La traducción es correcta?', big: s.fr, audio: s.fr, sub: '«' + (right ? s.es : other.es) + '»', opts: ['Sí, es correcta', 'No, es incorrecta'], ans: right ? 'Sí, es correcta' : 'No, es incorrecta', reveal: s.es, sid: s.id, key: 'tf' + s.id }; },
  speak: (text, es) => speakOn() ? { t: 'speak', kind: 'Pronunciación', q: 'Lee en voz alta', text, es, key: 'sp' + text } : null,
  read(unit) { const ss = unit.sents; if (ss.length < 5) return null; const start = rnd(ss.length - 3), part = ss.slice(start, start + 4), hi = rnd(part.length), s = part[hi]; const ds = distract(s.es, ss.filter(x => x.id !== s.id), 'es', 3); if (ds.length < 3) return null; return { t: 'read', kind: 'Lectura', q: '¿Qué significa la frase resaltada?', passage: part.map(x => x.fr), hi, opts: shuffle([s.es, ...ds.map(d => d.es)]), ans: s.es, sid: s.id, key: 'rd' + s.id }; },
  conj(v, t, typeMode) {
    const p = t === 'ger' ? 2 : rnd(6), fem = (p === 2 || p === 5) && Math.random() < 0.35, ans = conj(v.inf, t, p, fem);
    const answers = [ans]; if ([0, 1, 3, 4].includes(p)) { const alt = conj(v.inf, t, p, true); if (alt !== ans) answers.push(alt); }
    const base = { kind: 'Conjugación', big: t === 'ger' ? v.inf : (fem ? PRF : PR)[p] + '  ·  ' + v.inf, sub: (v.es ? v.es + ' · ' : '') + TN[t], conj: 1, key: 'cj' + v.inf + t + p + fem };
    if (typeMode) return Object.assign(base, { t: 'type', q: 'Conjuga (escribe la frase completa)', answers, lang: 'fr' });
    const pool = []; ['pres', 'pc', 'imp', 'fut', 'cond', 'subj', 'pqp'].filter(x => x !== t).forEach(x => pool.push(conj(v.inf, x, p, fem))); [0, 1, 2, 3, 4, 5].filter(x => x !== p).forEach(q => pool.push(conj(v.inf, t, q, fem && (q === 2 || q === 5))));
    const ds = distract(ans, pool, null, 3); if (ds.length < 3) return null;
    return Object.assign(base, { t: 'choice', q: 'Elige la conjugación correcta', opts: shuffle([ans, ...ds]), optSay: true, ans });
  },
  table(v, t) { if (t === 'ger') t = 'pres'; return { t: 'table', kind: 'Tabla completa', q: 'Conjuga ' + v.inf + ' en ' + TN[t], sub: v.es, rows: [0, 1, 2, 3, 4, 5].map(p => ({ label: PR[p], answers: [conj(v.inf, t, p, false), conj(v.inf, t, p, true)] })), conj: 1, key: 'tb' + v.inf + t }; },
  number(L2) { const max = [20, 100, 1000, 10000, 10000][L2 - 1] || 100; const n = rnd(max); if (listenOn() && Math.random() < 0.6) return { t: 'type', kind: 'Números', q: 'Escribe en cifras el número que escuchas', listen: true, audio: frNum(n), answers: [String(n), frNum(n)], lang: 'num', key: 'nl' + n }; const set = new Set([n]); [1, -1, 10, -10, 20, 100].forEach(d => { if (n + d >= 0) set.add(n + d); }); const ds = shuffle([...set].filter(x => x !== n)).slice(0, 3); return { t: 'choice', kind: 'Números', q: '¿Cómo se escribe este número?', big: fmt(n), opts: shuffle([n, ...ds].map(frNum)), optSay: true, ans: frNum(n), key: 'nc' + n }; },
  ff() { const F = CD().ff; if (F.length < 4) return null; const f = pick(F); if (Math.random() < 0.55) { const ds = distract(f.real, [f.trap, ...shuffle(F.filter(x => x !== f).map(x => x.real))], null, 3); return { t: 'choice', kind: 'Trampa', q: '¿Qué significa realmente?', big: f.fr, audio: f.fr, opts: shuffle([f.real, ...ds]), ans: f.real, key: 'ff' + f.fr }; } const truth = Math.random() < 0.3; return { t: 'choice', kind: 'Trampa', q: '¿Verdadero o falso?', big: '«' + f.fr + '» significa «' + (truth ? f.real : f.trap) + '»', audio: f.fr, opts: ['Verdadero', 'Falso'], ans: truth ? 'Verdadero' : 'Falso', reveal: f.fr + ' = ' + f.real, key: 'ffb' + f.fr }; },
  cult() { const C = CD().cult; if (!C.length) return null; const c = pick(C); return { t: 'choice', kind: 'Cultura', q: c.q, opts: shuffle([c.a, ...c.w]), ans: c.a, key: 'cu' + c.q }; },
  idiom() { const I = CD().idioms; return I.length ? X.mcFrEs(pick(I), I) : null; },
  phon() { const P = CD().phon; if (P.length < 4) return null; const p = pick(P), ex = pick(p.ex); if (listenOn() && Math.random() < 0.6) { const others = shuffle(P.filter(x => x !== p)).slice(0, 3).map(x => pick(x.ex)); return { t: 'choice', kind: 'Fonética', listen: true, q: '¿Qué palabra escuchaste?', audio: ex, opts: shuffle([ex, ...others]), ans: ex, reveal: p.s + ': ' + p.d, phon: 1, key: 'ph' + ex }; } const ds = shuffle(P.filter(x => x !== p)).slice(0, 3).map(x => x.d); return { t: 'choice', kind: 'Fonética', q: '¿Cómo suena «' + p.s + '»?', big: p.ex.join(' · '), audio: p.ex.join(', '), opts: shuffle([p.d, ...ds]), ans: p.d, phon: 1, key: 'phd' + p.s }; }
};

/* ---- armado de lecciones ---- */
function genSet(kinds, n, make) { const out = [], used = new Set(); let guard = 0, ks = kinds.slice(); while (out.length < n && guard++ < n * 15) { const k = wpick(ks); if (!k) break; let it = null; try { it = make(k); } catch (e) { it = null; } if (!it || used.has(it.key)) continue; used.add(it.key); out.push(it); if (k === 'pairs' || k === 'tb') ks = ks.filter(x => x[0] !== k); } return out; }
function wordItem(k, w, pool) {
  if (!w) return null;
  switch (k) { case 'mfe': return X.mcFrEs(w, pool); case 'mef': return X.mcEsFr(w, pool); case 'pic': return X.pic(w, pool); case 'lw': return X.listenWord(w, pool); case 'tef': return X.typeEsFr(w); case 'tfe': return X.typeFrEs(w); case 'dw': return X.dictWord(w); case 'gen': return X.gender(w); case 'spw': return X.speak(w.fr, w.es); default: return null; }
}
function sentItem(k, s, unit, pool) {
  if (!s) return null;
  switch (k) { case 'tsf': return X.tilesEsFr(s, pool); case 'tfs': return X.tilesFrEs(s, pool); case 'lt': return X.listenTiles(s, pool); case 'ds': return X.dictSent(s); case 'tf': return X.tf(s, pool); case 'cz': return X.cloze(s, unit); case 'fx': return X.fixSent(s, unit); case 'ls': return X.listenSent(s, pool); case 'sps': return X.speak(s.fr, s.es); default: return null; }
}
const WORDK = ['mfe', 'mef', 'pic', 'lw', 'tef', 'tfe', 'dw', 'gen', 'spw'];
function mixed(unit, words, sents, Lv, n, bias = 0) {
  const p = clamp((Lv - 1) / 4 + bias, 0, 1), pool = poolAround(unit.i), sp = sentPool(unit.i);
  const kinds = [['mfe', 3 * (1 - p) + 0.6], ['mef', 2 * (1 - p) + 0.6], ['pic', 1.6 * (1 - p)], ['lw', 1.2], ['pairs', 0.8], ['gen', 0.6], ['tef', 3 * p + 0.3], ['tfe', 1.5 * p + 0.2], ['dw', 1.6 * p + 0.2], ['spw', 0.4],
    ['tsf', sents.length ? 2.2 : 0], ['tfs', sents.length ? 1.6 : 0], ['lt', sents.length ? 1.2 : 0], ['ds', sents.length ? 1.4 * p : 0], ['cz', sents.length ? 1 : 0], ['tf', sents.length ? 0.6 : 0]];
  return genSet(kinds, n, k => k === 'pairs' ? X.pairs(words.length >= 4 ? words : pool) : WORDK.includes(k) ? wordItem(k, pickWord(words), pool) : sentItem(k, pick(sents), unit, sp));
}
function nodeLesson(u, ni) {
  const unit = CD().units[u], node = NODES[ni], done = nd(u, ni), Lv = Math.min(LEVELS, Math.floor(done / PER_LEVEL) + 1);
  const pool = poolAround(u), sp = sentPool(u), N = node.k === 'examen' ? 16 : 10, p = (Lv - 1) / 4, fr = S.cur === 'fr';
  const sI = k => sentItem(k, pick(unit.sents), unit, sp);
  let items = [];
  if (node.k === 'vocab') {
    const ws = unit.words.filter(w => w.g === node.g), unseen = ws.filter(w => !CS().words[w.id]).slice(0, 3);
    items = unseen.map(X.intro).concat(genSet([['mfe', 3 * (1 - p) + 0.5], ['mef', 2 * (1 - p) + 0.5], ['pic', 2 * (1 - p)], ['lw', 1.3], ['pairs', 1], ['gen', 0.9], ['tef', 3 * p + 0.2], ['tfe', 2 * p + 0.2], ['dw', 2 * p], ['spw', 0.4]], N, k => k === 'pairs' ? X.pairs(ws.length >= 4 ? ws : pool) : wordItem(k, unseen.length && Math.random() < 0.5 ? pick(unseen) : pickWord(ws), pool)));
  } else if (node.k === 'frases') {
    items = genSet([['tsf', 3], ['tfs', 2], ['lt', 2], ['ds', 2 * p + 0.2], ['tf', 1], ['cz', 1.4], ['fx', 0.8], ['sps', 0.5], ['ls', 1]], N, sI);
  } else if (node.k === 'gram') {
    if (done % PER_LEVEL === 0) items.push({ t: 'note', u, key: 'note' + u });
    const hasV = unit.verbs.length > 0;
    items = items.concat(genSet([['cjc', hasV ? 3 * (1 - p) + 1 : 0], ['cjt', hasV ? 3 * p + 0.4 : 0], ['tb', hasV && Lv >= 2 ? 1.2 : 0], ['cz', 2.4], ['fx', 2.2], ['tsf', 1.6], ['ds', p]], N, k => {
      if (k === 'cjc' || k === 'cjt') return X.conj(pick(unit.verbs), pick(unit.tenses), k === 'cjt');
      if (k === 'tb') return X.table(pick(unit.verbs), pick(unit.tenses));
      return sI(k);
    }));
  } else if (node.k === 'escucha') {
    items = genSet([['lw', 2], ['ls', 2], ['dw', 2], ['ds', 2 * p + 0.6], ['lt', 2.2], ['num', fr ? (u < 4 ? 1.5 : 0.5) : 0], ['ph', 0.8]], N, k => k === 'num' ? X.number(Math.min(5, Lv + (u > 3 ? 1 : 0))) : k === 'ph' ? X.phon() : (k === 'lw' || k === 'dw') ? wordItem(k, pickWord(unit.words), pool) : sI(k));
    if (items.length < 4) items = mixed(unit, unit.words, unit.sents, Lv, N);
  } else if (node.k === 'habla') {
    items = genSet([['sps', 3], ['spw', 2], ['lt', 2], ['ls', 1], ['ph', 1.5], ['tsf', 1]], N, k => k === 'spw' ? X.speak(pickWord(unit.words).fr, null) : k === 'ph' ? X.phon() : sI(k));
    if (items.length < 4) items = mixed(unit, unit.words, unit.sents, Lv, N);
  } else if (node.k === 'lectura') {
    items = genSet([['rd', 4], ['tfs', 2], ['tf', 2], ['mfe', 1], ['cz', 1]], N, k => k === 'rd' ? X.read(unit) : k === 'mfe' ? X.mcFrEs(pickWord(unit.words), pool) : sI(k));
  } else if (node.k === 'cultura') {
    items = genSet([['ff', 4], ['cu', 3], ['id', u >= 8 ? 2 : 0.6], ['ph', 1], ['mfe', 1]], N, k => k === 'ff' ? X.ff() : k === 'cu' ? X.cult() : k === 'id' ? X.idiom() : k === 'ph' ? X.phon() : X.mcFrEs(pickWord(unit.words), pool));
  } else if (node.k === 'repaso') {
    const prev = u > 0 ? CD().units.slice(Math.max(0, u - 4), u).flatMap(x => x.words).filter(w => CS().words[w.id]) : [];
    items = mixed(unit, unit.words.concat(shuffle(prev.filter(w => CS().words[w.id][1] <= Date.now())).slice(0, 12)), unit.sents, Lv, N, 0.1);
  } else if (node.k === 'examen') {
    items = genSet([['tef', 2], ['tsf', 3], ['tfs', 1.5], ['ds', 1.5], ['dw', 1], ['cjt', unit.verbs.length ? 2 : 0], ['cjc', unit.verbs.length ? 1 : 0], ['tb', unit.verbs.length ? 0.6 : 0], ['cz', 2], ['fx', 1], ['mfe', 1], ['mef', 1], ['lt', 1.5], ['rd', 1]], N, k => {
      if (k === 'cjt' || k === 'cjc') return X.conj(pick(unit.verbs), pick(unit.tenses), k === 'cjt');
      if (k === 'tb') return X.table(pick(unit.verbs), pick(unit.tenses));
      if (k === 'rd') return X.read(unit);
      if (['tef', 'dw', 'mfe', 'mef'].includes(k)) return wordItem(k, pickWord(unit.words), pool);
      return sI(k);
    });
  }
  if (items.filter(x => x.t !== 'intro' && x.t !== 'note').length < 5) items = items.concat(mixed(unit, unit.words, unit.sents, Lv, N - items.length));
  return { items, ctx: { type: 'node', u, ni, L: Lv, exam: node.k === 'examen' } };
}
const availUnits = () => { const out = []; CD().units.forEach((_, u) => { if (unitAvail(u)) out.push(u); }); return out.length ? out : [0]; };
function practiceLesson(mode) {
  const U = CD().units, us = availUnits(), Lv = 3;
  const seen = Object.keys(CS().words).filter(id => WMAP[id]).map(id => WMAP[id]);
  const allW = seen.length >= 6 ? seen : us.flatMap(u => U[u].words), allS = us.flatMap(u => U[u].sents);
  const pool = allW.length >= 8 ? allW : poolAround(0), u0 = U[us[us.length - 1]];
  let items = [];
  if (mode === 'srs') { const due = dueWords().map(id => WMAP[id]); const weak = seen.slice().sort((a, b) => strength(a.id) - strength(b.id)); const src = (due.length >= 5 ? due : due.concat(weak)).slice(0, 20); const s2 = src.length ? src : allW; items = genSet([['mfe', 2], ['mef', 2], ['tef', 2.5], ['tfe', 1], ['lw', 1.2], ['dw', 1.2], ['pairs', 1], ['pic', 1]], 12, k => k === 'pairs' ? X.pairs(s2) : wordItem(k, pickWord(s2), pool)); }
  else if (mode === 'errores') { const ms = CS().mist.slice(0, 30); items = genSet([['x', 1]], 12, () => { const m = pick(ms); if (!m) return null; if (m.k === 'w') return wordItem(pick(['tef', 'mef', 'mfe', 'dw']), WMAP[m.id], pool); const s = SMAP[m.id]; return s ? sentItem(pick(['tsf', 'tfs', 'cz', 'ds']), s, U[s.u], sentPool(s.u)) : null; }); }
  else if (mode === 'escucha') items = genSet([['lw', 2], ['ls', 2], ['dw', 2], ['ds', 2], ['lt', 2], ['num', S.cur === 'fr' ? 1 : 0], ['ph', 1]], 12, k => k === 'num' ? X.number(3) : k === 'ph' ? X.phon() : (k === 'lw' || k === 'dw') ? wordItem(k, pick(allW), pool) : sentItem(k, pick(allS), u0, allS));
  else if (mode === 'conj' || mode === 'tabla') { const vs = us.flatMap(u => U[u].verbs.map(v => [v, U[u].tenses])); const extra = [['être', 'ser/estar'], ['avoir', 'tener'], ['aller', 'ir'], ['faire', 'hacer'], ['parler', 'hablar'], ['finir', 'terminar']].map(([inf, es]) => [{ inf, es }, ['pres']]); const src = vs.concat(extra); items = mode === 'tabla' ? Array.from({ length: 5 }, () => { const [v, ts] = pick(src); return X.table(v, pick(ts)); }) : genSet([['c', 2], ['t', 1.5]], 12, k => { const [v, ts] = pick(src); return X.conj(v, pick(ts), k === 't'); }); }
  else if (mode === 'numeros') items = genSet([['n', 1]], 12, () => X.number(1 + rnd(5)));
  else if (mode === 'habla') items = genSet([['s', 3], ['w', 1]], 10, k => { if (k === 's') { const s = pick(allS); return X.speak(s.fr, s.es); } const w = pick(allW); return X.speak(w.fr, w.es); });
  else if (mode === 'ff') items = genSet([['f', 1]], 12, () => X.ff());
  else if (mode === 'cultura') items = genSet([['c', 2], ['i', 2]], 12, k => k === 'c' ? X.cult() : X.idiom());
  else if (mode === 'fonetica') items = genSet([['p', 3], ['s', 1]], 12, k => k === 'p' ? X.phon() : (w => X.speak(w.fr, w.es))(pick(allW)));
  if (!items.length) items = mixed(u0, allW, allS, Lv, 10);
  return { items, ctx: { type: 'practice', mode } };
}
function jumpLesson(u) {
  const U = CD().units.slice(Math.max(0, u - 6), u);
  const items = genSet([['tef', 2], ['tsf', 3], ['mef', 1], ['cz', 2], ['cj', S.cur === 'fr' ? 2 : 0], ['ds', 1]], 16, k => { const unit = pick(U); if (k === 'cj') return unit.verbs.length ? X.conj(pick(unit.verbs), pick(unit.tenses), Math.random() < 0.5) : null; if (k === 'tef' || k === 'mef') return wordItem(k, pick(unit.words), poolAround(unit.i)); return sentItem(k, pick(unit.sents), unit, sentPool(unit.i)); });
  return { items, ctx: { type: 'jump', u, exam: true } };
}
function certLesson(lv) {
  const U = CD().units.filter(x => x.lv === lv);
  const items = genSet([['tef', 3], ['tsf', 4], ['tfs', 2], ['ds', 2], ['dw', 1], ['cz', 3], ['fx', 2], ['rd', 2], ['cjt', S.cur === 'fr' ? 3 : 0], ['tb', S.cur === 'fr' ? 1 : 0], ['lt', 1.5], ['ff', 1]], 30, k => {
    const unit = pick(U);
    if (k === 'cjt') return unit.verbs.length ? X.conj(pick(unit.verbs), pick(unit.tenses), true) : null;
    if (k === 'tb') return unit.verbs.length ? X.table(pick(unit.verbs), pick(unit.tenses)) : null;
    if (k === 'rd') return X.read(unit); if (k === 'ff') return X.ff();
    if (k === 'tef' || k === 'dw') return wordItem(k, pick(unit.words), poolAround(unit.i));
    return sentItem(k, pick(unit.sents), unit, sentPool(unit.i));
  });
  return { items, ctx: { type: 'cert', lv, exam: true, cert: true } };
}

/* ================= plantillas ================= */
const sayBtn = (text, slow) => '<button class="say' + (slow ? ' slow' : '') + '" data-say="' + esc(text) + '"' + (slow ? ' data-slow="1"' : '') + ' aria-label="' + (slow ? 'Escuchar despacio' : 'Escuchar') + '">' + ico(slow ? 'turtle' : 'spk') + '</button>';
function md(n) {
  const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  let html = '', tbl = []; const flush = () => { if (tbl.length) { html += '<div class="tw"><table class="gt">' + tbl.map(r => '<tr>' + r.map((c, i) => '<td' + (i === 0 ? ' data-say="' + esc(c.replace(/\(.*?\)/g, '')) + '"' : '') + '>' + inl(c) + '</td>').join('') + '</tr>').join('') + '</table></div>'; tbl = []; } };
  for (const l of (n || '').split('\n')) { if (l.startsWith('|')) { tbl.push(l.slice(1).split('|')); continue; } flush(); if (l.startsWith('!')) html += '<p class="tip"><b>Ojo, hispanohablante</b>' + inl(l.slice(1)) + '</p>'; else if (l.trim()) html += '<p>' + inl(l) + '</p>'; }
  flush(); return '<div class="gnote">' + html + '</div>';
}
const lvColor = lv => 'var(--' + lv.replace('+', '') + ')';

/* ---------- navegación ---------- */
const ROUTES = [['aprender', 'Aprender', 'path'], ['practicar', 'Practicar', 'dumb'], ['stats', 'Stats', 'stats'], ['logros', 'Logros', 'medal'], ['perfil', 'Perfil', 'user']];
const EXTRA = [['palabras', 'Palabras', 'book'], ['guia', 'Guía', 'gram'], ['tienda', 'Tienda', 'shop']];
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
    '<button class="chip flag" data-act="course" title="Cambiar de idioma"><span class="ic">' + M().flag + '</span><b>' + S.cur.toUpperCase() + '</b></button>' +
    '<button class="chip fire' + (t.l ? '' : ' dim') + '" data-go="stats" title="Racha de días"><span class="ic">' + ico('flame') + '</span><b>' + S.streak + '</b></button>' +
    '<button class="chip gem" data-go="tienda" title="Croissants"><span class="ic">' + ico('croissant') + '</span><b>' + fmt(S.gems) + '</b></button>' +
    '<button class="chip xp hide-s" data-go="stats" title="Nivel y XP"><span class="ic">' + ico(boost ? 'bolt' : 'level') + '</span><b>' + lvlInfo().lv + '</b></button>';
}
function weekStrip() {
  const dow = (new Date().getDay() + 6) % 7, days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']; let h = '';
  for (let i = 0; i < 7; i++) { const dd = new Date(); dd.setDate(dd.getDate() - dow + i); const r = S.days[dkey(dd)]; h += '<div>' + days[i] + '<i class="' + (r && r.l ? 'on' : r && r.fz ? 'fz' : '') + (i === dow ? ' today' : '') + '">' + (r && r.l ? ico('check') : r && r.fz ? ico('ice') : '') + '</i></div>'; }
  return '<div class="week">' + h + '</div>';
}
function renderRail() {
  const t = today(), pct = clamp(Math.round(t.l / S.goal * 100), 0, 100);
  const tips = CD().units.slice(0, current()[0] + 1).flatMap(u => (u.note || '').split('\n').filter(l => l.startsWith('!')).map(l => l.slice(1)));
  const tip = tips.length ? tips[(new Date().getDate() * 7) % tips.length] : '';
  $('#rail').innerHTML =
    '<div class="card"><div class="goal-row"><div class="goal-ring" style="--p:' + pct + '"><span>' + t.l + '/' + S.goal + '</span></div><div><div class="eyebrow">Meta diaria</div><h3>' + (t.l >= S.goal ? '¡Meta cumplida!' : (S.goal - t.l) + ' lecciones más') + '</h3><small class="sub">' + fmt(t.x) + ' XP hoy</small></div></div></div>' +
    '<div class="card"><div class="eyebrow">Racha</div><h3 class="ih">' + ico('flame') + S.streak + ' ' + (S.streak === 1 ? 'día' : 'días') + '</h3><small class="sub">Protectores: ' + S.freezes + ' · Mejor: ' + S.best + '</small>' + weekStrip() + '</div>' + levelCard() + questsCard(true) +
    '<button class="card pcard" data-act="course" style="width:100%"><div class="pi">' + M().flag + '</div><div><div class="eyebrow">Curso actual · ' + levelOf(S.cur) + '</div><b>' + M().name + '</b><small>' + unitsDoneOf(S.cur) + '/48 unidades · ' + learned() + ' palabras · toca para cambiar</small></div></button>' +
    (tip ? '<div class="card tip-card"><div class="eyebrow">Consejo de Grisou</div><p>' + esc(tip) + '</p></div>' : '');
}

/* ---------- recompensas: misiones del día y cofres ---------- */
function seeded(seed) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const QPOOL = [['xp', 'Gana {n} XP', [40, 80, 120], 'star'], ['les', 'Completa {n} lecciones', [3, 6, 10], 'book'], ['perf', 'Haz {n} lecciones perfectas', [1, 2, 3], 'gem'], ['combo', 'Logra un combo de {n}', [8, 12, 15], 'bolt'], ['listen', 'Acierta {n} ejercicios de escucha', [4, 8, 12], 'escucha'], ['write', 'Escribe bien {n} respuestas', [5, 10, 15], 'pen'], ['speak', 'Pronuncia {n} frases', [3, 5, 8], 'habla']];
function quests() {
  const t = dkey();
  if (!S.q || S.q.day !== t) { const r = seeded(t + S.created); const pool = QPOOL.slice().sort(() => r() - 0.5).slice(0, 3); S.q = { day: t, items: pool.map(([id, txt, ns, ic]) => ({ id, txt, ic, n: ns[Math.floor(r() * ns.length)], p: 0, c: 0 })), bonus: 0 }; save(); }
  return S.q;
}
function qbump(id, v, max) { quests().items.forEach(it => { if (it.id === id) it.p = max ? Math.max(it.p, v) : it.p + v; }); }
function questsCard(rail) {
  const q = quests(), all = q.items.every(i => i.c);
  return '<div class="card quests' + (rail ? '' : ' mt') + '"><div class="q-h"><div><div class="eyebrow">Misiones del día</div><h3>' + q.items.filter(i => i.c).length + ' de 3 cofres</h3></div>' + (all && !q.bonus ? '<button class="btn sm" data-claim="bonus">' + ico('chest') + 'Cofre grande</button>' : '<span class="q-ch' + (q.bonus ? ' open' : '') + '">' + ico('chest') + '</span>') + '</div>' +
    q.items.map((it, i) => { const done = it.p >= it.n; return '<div class="q-row"><span class="q-i">' + ico(it.ic) + '</span><div class="q-t"><b>' + it.txt.replace('{n}', it.n) + '</b><div class="bar acc"><i style="width:' + clamp(it.p / it.n * 100, 0, 100) + '%"></i></div></div>' + (it.c ? '<span class="q-ok">' + ico('checkc') + '</span>' : done ? '<button class="btn sm ok q-btn" data-claim="' + i + '">Abrir</button>' : '<span class="q-n mono">' + Math.min(it.p, it.n) + '/' + it.n + '</span>') + '</div>'; }).join('') + '</div>';
}
function claim(k) {
  const q = quests(); let gain = 0, extra = '';
  if (k === 'bonus') { if (q.bonus || !q.items.every(i => i.c)) return; q.bonus = 1; gain = 50 + rnd(51); if (S.freezes < 3 && Math.random() < 0.5) { S.freezes++; extra = ' y un protector de racha'; } }
  else { const it = q.items[+k]; if (!it || it.c || it.p < it.n) return; it.c = 1; gain = 10 + rnd(21); }
  S.gems += gain; S.st.chests++; save(); SFX.done(); buzz([20, 40, 80]);
  modal('<div class="chestbox">' + '<div class="bigchest">' + ico('chest') + '</div><div class="burst">' + Array.from({ length: 10 }, (_, i) => '<i style="--a:' + i * 36 + 'deg">' + ico('croissant') + '</i>').join('') + '</div></div><h2 class="center">¡Cofre abierto!</h2><p class="center big-gain">+' + gain + ' croissants' + extra + '</p><button class="btn block" data-act="closemodal">¡Gracias, ' + PET() + '!</button>');
  grisou('¡Abriste un cofre! Ganaste ' + gain + ' croissants' + extra + '.'); confetti(); render(); checkAch();
}
function levelCard() { const L0 = lvlInfo(); return '<div class="card lvcard"><span class="lv-b">' + ico('level') + '<b>' + L0.lv + '</b></span><div><div class="eyebrow">Nivel de jugador</div><div class="bar acc"><i style="width:' + (L0.into / L0.need * 100) + '%"></i></div><small class="sub">' + L0.into + ' / ' + L0.need + ' XP para el nivel ' + (L0.lv + 1) + '</small></div></div>'; }

/* ---------- vista: aprender ---------- */
function viewAprender() {
  const U = CD().units, [cu, ci] = current();
  let maxU = 0; U.forEach((_, u) => { if (unitAvail(u)) maxU = u; });
  const showTo = Math.min(U.length - 1, maxU + 1);
  let h = '', lastLv = '';
  const due = dueWords().length, t = today();
  U.forEach((unit, u) => {
    if (unit.lv !== lastLv) { lastLv = unit.lv; h += '<div class="lvl-head"><h3>' + unit.lv + ' · ' + LVNAME[unit.lv] + '</h3><span>Año ' + (Math.floor(u / 12) + 1) + '</span></div>'; }
    if (u > showTo) h += '<div class="lrow" style="--lv:' + lvColor(unit.lv) + '"><span class="dot"></span><div><b>' + esc(unit.t) + '</b><small>Unidad ' + (u + 1) + ' · ' + esc(unit.es) + '</small></div><button class="btn ghost sm" data-jump="' + u + '" aria-label="Prueba para saltar a la unidad ' + (u + 1) + '">' + ico('jump') + '</button></div>';
    else {
      const avail = unitAvail(u), upct = Math.round(NODES.reduce((a, _, i) => a + Math.min(nd(u, i), PER_LEVEL), 0) / (NODES.length * PER_LEVEL) * 100);
      h += '<section class="unit" style="--lv:' + (avail ? lvColor(unit.lv) : 'var(--lock)') + '" id="u' + u + '"><header class="band"><span class="band-i">' + ico(UICON[u] || 'book') + '</span><div class="band-t"><div class="eyebrow">Unidad ' + (u + 1) + ' · ' + unit.lv + ' · Mes ' + (u + 1) + '</div><h2>' + esc(unit.t) + '</h2><p>' + esc(unit.es) + '</p>' + (avail ? '<div class="band-bar"><i style="width:' + upct + '%"></i></div>' : '') + '</div>' +
        (avail ? '<button class="bb" data-guide="' + u + '">' + ico('gram') + '<span>Guía</span></button>' : '<button class="bb" data-jump="' + u + '">' + ico('jump') + '<span>Saltar</span></button>') + '</header><ol class="nodes">';
      NODES.forEach((node, i) => {
        const done = nd(u, i), ok = nodeAvail(u, i), lvl = Math.floor(done / PER_LEVEL), isCur = u === cu && i === ci && ok;
        const x = Math.round(Math.sin(i * 0.95) * 72);
        const cls = 'node' + (!ok ? ' lock' : done >= PER_NODE ? ' done' : '') + (isCur ? ' cur' : '') + (node.k === 'examen' ? ' boss' : '');
        const ring = ok && done < PER_NODE ? '<span class="ring" style="--p:' + Math.round((done % PER_LEVEL) / PER_LEVEL * 100) + '"></span>' : '';
        h += '<li style="--x:' + x + 'px">' + (isCur ? '<span class="start-tip">' + (done ? 'Continuar' : 'Empezar') + '</span>' : '') +
          '<button class="' + cls + '" data-node="' + u + ',' + i + '" aria-label="' + esc(node.n + ', unidad ' + (u + 1)) + '">' + ring + ico(!ok ? 'lock' : done >= PER_NODE ? 'check' : node.k) + '</button>' +
          '<div class="crowns">' + Array.from({ length: LEVELS }, (_, k) => '<i class="' + (k < lvl ? 'on' : '') + '"></i>').join('') + '</div><div class="nlabel">' + esc(node.k === 'gram' ? unit.gt : node.n) + '</div>' +
          (isCur ? '<button class="path-masc" data-act="poke" style="' + (x > 0 ? 'right:calc(100% + 14px)' : 'left:calc(100% + 14px)') + '" aria-label="Tocar a Grisou">' + mascot({ mood: 'idle', anim: 'walk' }) + '</button>' : '') + '</li>';
      });
      h += '</ol></section>';
    }
    if (u === U.length - 1 || U[u + 1].lv !== unit.lv) {
      const ok = levelDone(unit.lv), got = CS().cert[unit.lv];
      h += '<div class="certrow' + (got ? ' got' : ok ? ' open' : '') + '" style="--lv:' + lvColor(unit.lv) + '"><span class="ci">' + ico(got ? 'medal' : 'cert') + '</span><div><b>Certificación ' + unit.lv + '</b><small>' + (got ? 'Aprobada el ' + new Date(got).toLocaleDateString('es-MX') : ok ? '30 preguntas · necesitas 85 %' : 'Completa las unidades de ' + unit.lv + ' para presentarla') + '</small></div>' + (ok ? '<button class="btn sm' + (got ? ' ghost' : '') + '" data-cert="' + unit.lv + '">' + (got ? 'Repetir' : 'Presentar') + '</button>' : '') + '</div>';
    }
  });
  const pctAll = lessonsInPath() / TOTAL() * 100, hi = pick(M().hi);
  return '<div class="hero card"><button class="hero-m" data-act="poke" aria-label="Tocar a Grisou">' + logoMascot() + '</button><div class="hero-t"><div class="bubble-s" id="hiBubble" data-act="poke" role="button" tabindex="0"><b>' + esc(hi[0]) + '</b> <span>' + esc(hi[1]) + '</span></div><div class="eyebrow">' + M().flag + ' ' + M().name + ' · 48 unidades · ' + fmt(TOTAL()) + ' lecciones</div><b class="hero-h">' + (S.name ? esc(S.name) + ', vas' : 'Vas') + ' en la unidad ' + (cu + 1) + '</b><small class="sub">' + PET() + ' te acompaña · nivel ' + lvlInfo().lv + '</small><div class="bar acc"><i style="width:' + Math.max(0.6, pctAll).toFixed(2) + '%"></i></div><small class="sub">' + pctAll.toFixed(2) + '% del curso · hoy ' + t.l + '/' + S.goal + '</small></div></div>' +
    questsCard() + (due >= 5 ? '<button class="duecard" data-prac="srs"><span class="dci">' + ico('brain') + '</span><div><b>' + due + ' palabras por repasar</b><small>Tu memoria está a punto de olvidarlas. 2 minutos.</small></div>' + ico('jump') + '</button>' : '') + h;
}

/* ---------- vista: practicar ---------- */
function viewPracticar() {
  const due = dueWords().length, mist = CS().mist.length, lw = learned(), fr = S.cur === 'fr';
  const P = (mode, em, t, d, tag) => '<button class="pcard" data-prac="' + mode + '"><span class="pi">' + ico(em) + '</span><span><b>' + t + '</b><small>' + d + '</small>' + (tag ? '<span class="tag">' + tag + '</span>' : '') + '</span></button>';
  return '<div class="sec-h"><div><h2>Practicar ' + M().flag + '</h2><p>Lecciones ilimitadas que cuentan para tu meta.</p></div></div><div class="grid2">' +
    P('srs', 'brain', 'Repaso inteligente', 'Las palabras que estás por olvidar.', due ? due + ' para hoy' : lw + ' aprendidas') +
    P('errores', 'target', 'Tus errores', 'Vuelve a lo que fallaste hasta dominarlo.', mist ? mist + ' pendientes' : 'Sin pendientes') +
    P('speed', 'timer', 'Contrarreloj', '60 segundos. ¿Cuántas aciertas?', 'Récord: ' + S.st.speed) +
    (fr ? P('conj', 'repaso', 'Conjugador', 'Todos los tiempos que ya viste.', S.st.conj + ' aciertos') + P('tabla', 'grid', 'Tablas completas', 'Las 6 personas de un verbo, sin pistas.', S.st.table + ' tablas') + P('numeros', 'hash', 'Números', 'Soixante-dix, quatre-vingts…', '') : '') +
    P('fonetica', 'lips', 'Fonética', 'Los sonidos que no existen en español.', CD().phon.length + ' sonidos') +
    P('escucha', 'escucha', 'Oído fino', 'Dictados y comprensión auditiva.', listenOn() ? '' : 'Activa el audio en Perfil') +
    P('habla', 'habla', 'Pronunciación', 'Lee en voz alta y compárate.', '') +
    P('ff', 'alert', 'Trampas', 'Palabras que engañan al hispanohablante.', CD().ff.length + ' trampas') +
    P('cultura', 'map', 'Cultura y expresiones', 'Costumbres y modismos.', '') +
    '</div><div class="sec-h"><div><h2>Consulta</h2></div></div><div class="grid2">' +
    '<button class="pcard" data-go="palabras"><span class="pi">' + ico('book') + '</span><span><b>Mis palabras</b><small>' + lw + ' aprendidas con su nivel de memoria.</small></span></button>' +
    '<button class="pcard" data-go="guia"><span class="pi">' + ico('gram') + '</span><span><b>Guía de gramática y fonética</b><small>48 temas explicados para hispanohablantes.</small></span></button></div>';
}

/* ---------- stats + placa ---------- */
const PLATES = { grafito: { n: 'Grafito', bg: '#1A1E26', bg2: '#232833', ink: '#EEF0F4', mute: '#9AA3B2', acc: '#7A8EFF', rim: '#3A4150' }, papel: { n: 'Papel', bg: '#F1EEE6', bg2: '#E6E1D5', ink: '#1A1C22', mute: '#6B6A66', acc: '#3046E8', rim: '#C9C2B1' }, bleu: { n: 'Bleu', bg: '#1C2C8C', bg2: '#2437A8', ink: '#FFFFFF', mute: '#B9C3FF', acc: '#FFD24A', rim: '#4C5FD0' }, menta: { n: 'Menta', bg: '#DDF2E8', bg2: '#C7E9D9', ink: '#0E3326', mute: '#4A7564', acc: '#0F9C86', rim: '#9CCFB8' } };
function statsData() {
  const days = Object.entries(S.days), active = days.filter(([, d]) => d.l > 0).length;
  const bestDay = days.reduce((a, [k, d]) => d.x > a.x ? { k, x: d.x } : a, { k: '', x: 0 });
  return { active, bestDay, acc: S.st.ex ? Math.round(S.st.ok / S.st.ex * 100) : 0, hrs: S.st.ms / 36e5, words: learnedAll() };
}
function xpChart() {
  const n = 30, W = 600, H = 170, padL = 34, padB = 22, data = [];
  for (let i = n - 1; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const r = S.days[dkey(d)]; data.push({ d, x: r ? r.x : 0 }); }
  const max = Math.max(50, ...data.map(d => d.x)), nice = Math.ceil(max / 50) * 50, bw = (W - padL - 6) / n;
  let g = ''; [0, 0.5, 1].forEach(f => { const y = H - padB - (H - padB - 10) * f; g += '<line x1="' + padL + '" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="var(--line)" stroke-dasharray="3 4"/><text x="' + (padL - 6) + '" y="' + (y + 4) + '" text-anchor="end" class="ax">' + Math.round(nice * f) + '</text>'; });
  data.forEach((d, i) => { const h = (H - padB - 10) * (d.x / nice), x = padL + i * bw + 2; g += '<rect x="' + x + '" y="' + (H - padB - h) + '" width="' + Math.max(2, bw - 4) + '" height="' + Math.max(d.x ? 2 : 0, h) + '" rx="3" fill="' + (i === n - 1 ? 'var(--gold)' : 'var(--acc)') + '"><title>' + dkey(d.d) + ': ' + d.x + ' XP</title></rect>'; if (i % 7 === 0 || i === n - 1) g += '<text x="' + (x + bw / 2 - 2) + '" y="' + (H - 5) + '" text-anchor="middle" class="ax">' + d.d.getDate() + '/' + (d.d.getMonth() + 1) + '</text>'; });
  return '<div class="chart"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="XP de los últimos 30 días">' + g + '</svg></div>';
}
function dowChart() {
  const sums = [0, 0, 0, 0, 0, 0, 0]; Object.entries(S.days).forEach(([k, d]) => { const w = (new Date(k + 'T12:00').getDay() + 6) % 7; sums[w] += d.l || 0; });
  const max = Math.max(1, ...sums), names = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return '<div class="hbars">' + sums.map((v, i) => '<div><span>' + names[i] + '</span><div class="bar"><i style="width:' + (v / max * 100) + '%"></i></div><b>' + v + '</b></div>').join('') + '</div>';
}
function memChart() {
  const b = [0, 0, 0, 0, 0, 0, 0]; Object.values(CS().words).forEach(r => { b[clamp(r[0], 0, 6)]++; }); const max = Math.max(1, ...b);
  const lab = ['Nueva', '1', '2', '3', '4', '5', 'Dominada'];
  return '<div class="vbars">' + b.map((v, i) => '<div><b>' + v + '</b><i style="height:' + (v / max * 100) + '%;opacity:' + (0.35 + i * 0.1) + '"></i><span>' + lab[i] + '</span></div>').join('') + '</div>';
}
function heatmap() {
  let h = ''; const end = new Date(), s0 = new Date(); s0.setDate(s0.getDate() - 7 * 25 - ((s0.getDay() + 6) % 7));
  for (let i = 0; i < 26 * 7; i++) { const d = new Date(s0); d.setDate(s0.getDate() + i); if (d > end) { h += '<i style="visibility:hidden"></i>'; continue; } const r = S.days[dkey(d)], l = r ? r.l : 0; h += '<i class="' + (r && r.fz && !l ? 'fz' : l >= 20 ? 'h4' : l >= 10 ? 'h3' : l >= 5 ? 'h2' : l >= 1 ? 'h1' : '') + '" title="' + dkey(d) + ': ' + l + ' lecciones"></i>'; }
  return '<div class="heat">' + h + '</div><div class="heat-leg"><span>Menos</span><i></i><i class="h1"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i><span>Más</span></div>';
}
function viewStats() {
  const D = statsData();
  const courses = CIDS.filter(id => S.C[id]).map(id => { const c = S.C[id], m = META[id], acc = c.ex ? Math.round(c.ok / c.ex * 100) : 0, n = unitsDoneOf(id); return '<div class="crs"><span class="cf">' + m.flag + '</span><div><b>' + m.name + ' · ' + levelOf(id) + '</b><div class="bar acc"><i style="width:' + (n / 48 * 100) + '%"></i></div><small>' + n + '/48 unidades · ' + learned(id) + ' palabras · ' + fmt(c.les) + ' lecciones · ' + acc + '% precisión' + (Object.keys(c.cert || {}).length ? ' · certificado ' + Object.keys(c.cert).join(' ') : '') + '</small></div></div>'; }).join('');
  return '<div class="sec-h"><div><h2>Stats</h2><p>Tu progreso real, sin competencia inventada.</p></div></div>' +
    '<div class="card plate-card"><div class="plate-wrap"><canvas id="plate" width="1080" height="1350" aria-label="Tu placa de Grey~Spell"></canvas></div><div class="plate-ctl"><div class="eyebrow">Tu placa</div><h3>Compártela con quien quieras</h3><p class="sub">Se genera con tus números de hoy y la pose de Grisou que elegiste como logo.</p><div class="seg" role="group" aria-label="Estilo de la placa">' + Object.entries(PLATES).map(([k, p]) => '<button data-plate="' + k + '" aria-pressed="' + (S.plate === k) + '"><i class="sw-dot" style="background:' + p.bg + ';border-color:' + p.acc + '"></i>' + p.n + '</button>').join('') + '</div><div class="row-btn"><button class="btn" data-act="share">' + ico('share') + 'Compartir</button><button class="btn ghost" data-act="download">' + ico('down') + 'Guardar PNG</button></div><button class="link" data-go="perfil">Cambiar pose de Grisou</button></div></div>' +
    '<div class="stats">' + [['flame', 'Racha', S.streak + ' d'], ['trophy2', 'Mejor racha', S.best + ' d'], ['level', 'Nivel', lvlInfo().lv], ['star', 'XP total', fmt(S.xp)], ['book', 'Lecciones', fmt(S.st.les)], ['brain', 'Palabras', fmt(D.words)], ['target', 'Precisión', D.acc + '%'], ['timer', 'Horas', D.hrs.toFixed(1)], ['calendar', 'Días activos', D.active], ['gem', 'Perfectas', fmt(S.st.perf)], ['postcard', 'Postales', Object.keys(S.cards).length], ['chest', 'Cofres', S.st.chests]].map(([e, l, v]) => '<div class="stat"><small>' + ico(e) + l + '</small><b>' + v + '</b></div>').join('') + '</div>' +
    '<div class="sec-h"><div><h2>XP · últimos 30 días</h2></div></div><div class="card">' + xpChart() + '</div>' +
    '<div class="sec-h"><div><h2>Actividad</h2><p>Últimas 26 semanas.</p></div></div><div class="card">' + heatmap() + '</div>' +
    '<div class="grid2 mt"><div class="card"><h3>¿Qué día estudias más?</h3>' + dowChart() + '</div><div class="card"><h3>Memoria ' + M().flag + '</h3><p class="sub" style="margin:0 0 8px">Palabras por nivel de repaso espaciado.</p>' + memChart() + '</div></div>' +
    '<div class="sec-h"><div><h2>Tus idiomas</h2></div></div><div class="card crs-list">' + (courses || '<p class="sub">Empieza una lección para ver tu progreso.</p>') + '<button class="btn ghost sm" data-act="course">' + ico('swap') + 'Agregar o cambiar idioma</button></div>' +
    '<div class="sec-h"><div><h2>Récords</h2></div></div><div class="card rec">' + [['Mejor día', D.bestDay.x ? fmt(D.bestDay.x) + ' XP · ' + D.bestDay.k : '—'], ['Mejor combo', '×' + S.st.combo], ['Contrarreloj', S.st.speed + ' aciertos'], ['Exámenes aprobados', S.st.exam], ['Certificaciones', S.st.cert], ['Conjugaciones', fmt(S.st.conj)], ['Dictados correctos', fmt(S.st.dict)], ['Metas cumplidas', S.st.goalDays]].map(([a, b]) => '<div><span>' + a + '</span><b>' + b + '</b></div>').join('') + '</div>';
}
/* dibujo de la placa en canvas */
function drawPlate(cv) {
  if (!cv) return; const P = PLATES[S.plate] || PLATES.grafito, x = cv.getContext('2d'), W = cv.width, H = cv.height, D = statsData();
  const F = (w, s, f) => w + ' ' + s + 'px ' + f;
  const disp = "'Bricolage Grotesque', 'Segoe UI', sans-serif", body = "'Nunito', 'Segoe UI', sans-serif", mono = "'JetBrains Mono', monospace";
  const rr = (X0, Y, w, h, r) => { x.beginPath(); x.moveTo(X0 + r, Y); x.arcTo(X0 + w, Y, X0 + w, Y + h, r); x.arcTo(X0 + w, Y + h, X0, Y + h, r); x.arcTo(X0, Y + h, X0, Y, r); x.arcTo(X0, Y, X0 + w, Y, r); x.closePath(); };
  x.clearRect(0, 0, W, H); x.fillStyle = P.rim; rr(0, 0, W, H, 64); x.fill();
  x.fillStyle = P.bg; rr(18, 18, W - 36, H - 36, 50); x.fill();
  x.save(); rr(18, 18, W - 36, H - 36, 50); x.clip(); x.fillStyle = P.bg2; for (let i = 0; i < W; i += 36) for (let j = 0; j < H; j += 36) if (((i + j) / 36) % 2 === 0) x.fillRect(i, j, 4, 4); x.restore();
  [[56, 56], [W - 56, 56], [56, H - 56], [W - 56, H - 56]].forEach(([a, b]) => { x.fillStyle = P.rim; x.beginPath(); x.arc(a, b, 13, 0, 7); x.fill(); x.fillStyle = P.bg2; x.beginPath(); x.arc(a - 3, b - 3, 5, 0, 7); x.fill(); });
  x.textBaseline = 'alphabetic'; x.fillStyle = P.ink; x.font = F(800, 46, disp); x.fillText('Grey', 96, 132); const gw = x.measureText('Grey').width; x.fillStyle = P.acc; x.font = F(700, 46, mono); x.fillText('~', 96 + gw, 132); const tw = x.measureText('~').width; x.fillStyle = P.ink; x.font = F(800, 46, disp); x.fillText('Spell', 96 + gw + tw, 132);
  x.fillStyle = P.mute; x.font = F(700, 22, mono); x.textAlign = 'right'; x.fillText('PLACA Nº ' + String(S.created % 1e6).padStart(6, '0'), W - 96, 104); x.fillText(new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(), W - 96, 136); x.textAlign = 'left';
  const p = poseOf(S.logo), svg = mascot({ mood: p.mood, anim: 'none', wear: p.wear, lit: true });
  const px = []; svg.replace(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)" fill="(#[0-9A-Fa-f]{6})"/g, (m, a, b, c, d, f) => { px.push([+a, +b, +c, +d, f]); return m; });
  const sc = 26, ox = W / 2 - 8 * sc - 20, oy = 230 + 6 * sc;
  x.fillStyle = 'rgba(0,0,0,.18)'; x.beginPath(); x.ellipse(ox + 8 * sc, oy + 9.4 * sc, 6.5 * sc, 0.6 * sc, 0, 0, 7); x.fill();
  px.forEach(([a, b, c, d, f]) => { x.fillStyle = f; x.fillRect(ox + a * sc, oy + b * sc, c * sc + 0.5, d * sc + 0.5); });
  x.textAlign = 'center'; x.fillStyle = P.ink; x.font = F(800, 72, disp); x.fillText(S.name || 'Estudiante', W / 2, 720); x.fillStyle = P.acc; x.font = F(700, 22, mono); x.fillText('NIVEL ' + lvlInfo().lv + ' · ' + Object.keys(S.cards).length + ' POSTALES', W / 2, 180);
  x.fillStyle = P.mute; x.font = F(800, 26, body); x.fillText(CIDS.filter(id => S.C[id]).map(id => META[id].name + ' ' + levelOf(id)).join('  ·  ') || 'Aprendiendo idiomas', W / 2, 766);
  x.font = F(800, 110, disp); const sw2 = x.measureText(String(S.streak)).width, fx0 = W / 2 - (sw2 + 100) / 2; x.save(); x.translate(fx0, 790); x.scale(4, 4); x.fillStyle = '#EE5A24'; x.fill(new Path2D(window.GSFLAME[0])); x.fillStyle = '#E3A00F'; x.fill(new Path2D(window.GSFLAME[1])); x.restore(); x.fillStyle = P.acc; x.textAlign = 'left'; x.fillText(String(S.streak), fx0 + 104, 880); x.textAlign = 'center'; x.fillStyle = P.mute; x.font = F(800, 26, mono); x.fillText(S.streak === 1 ? 'DÍA DE RACHA' : 'DÍAS DE RACHA', W / 2, 948);
  const cells = [['XP', fmt(S.xp)], ['LECCIONES', fmt(S.st.les)], ['PALABRAS', fmt(D.words)], ['PRECISIÓN', D.acc + '%'], ['HORAS', D.hrs.toFixed(1)], ['MEJOR RACHA', S.best]];
  const cw = (W - 192 - 40) / 3; cells.forEach(([l, v], i) => { const cx = 96 + (i % 3) * (cw + 20), cy = 990 + Math.floor(i / 3) * 140; x.fillStyle = P.bg2; rr(cx, cy, cw, 120, 22); x.fill(); x.textAlign = 'left'; x.fillStyle = P.mute; x.font = F(700, 20, mono); x.fillText(l, cx + 22, cy + 40); x.fillStyle = P.ink; x.font = F(800, 46, disp); x.fillText(String(v), cx + 22, cy + 96); });
  x.textAlign = 'center'; x.fillStyle = P.mute; x.font = F(700, 20, mono); const certs = CIDS.flatMap(id => Object.keys((S.C[id] || {}).cert || {}).map(l => id.toUpperCase() + ' ' + l)); x.fillText((certs.length ? 'CERTIFICADO ' + certs.join(' ') + '  ·  ' : '') + 'GREY~SPELL · IDIOMAS DESDE MÉXICO', W / 2, H - 70); x.textAlign = 'left';
}
const plateReady = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
function plateBlob() { return new Promise(res => { const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350; drawPlate(cv); cv.toBlob(b => res(b), 'image/png'); }); }
async function sharePlate(download) {
  await plateReady(); const blob = await plateBlob(); if (!blob) { toast('warning', 'No se pudo generar la imagen'); return; }
  const file = new File([blob], 'grey-spell-placa.png', { type: 'image/png' }), text = 'Llevo ' + S.streak + ' días de racha y ' + fmt(S.xp) + ' XP aprendiendo idiomas en Grey~Spell.';
  S.st.share++; save(); checkAch();
  if (!download && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'Mi placa de Grey~Spell', text }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'grey-spell-placa.png'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  toast('image', 'Placa guardada', 'Búscala en tus descargas');
}

/* ---------- logros ---------- */
const maxUnits = () => Math.max(...CIDS.map(unitsDoneOf));
const ACH = [
  ['l1', 'steps', 'Primer paso', 'Termina tu primera lección', () => [S.st.les, 1], 5], ['l10', 'bolt', 'En marcha', '10 lecciones', () => [S.st.les, 10], 10], ['l100', 'star', 'Centenario', '100 lecciones', () => [S.st.les, 100], 30], ['l500', 'book2', 'Medio millar', '500 lecciones', () => [S.st.les, 500], 60], ['l1k', 'medal', 'Mil lecciones', '1 000 lecciones', () => [S.st.les, 1000], 100], ['l5k', 'rocket', 'Imparable', '5 000 lecciones', () => [S.st.les, 5000], 200], ['l10k', 'mountain', 'Leyenda', '10 000 lecciones', () => [S.st.les, 10000], 400], ['l25k', 'trophy2', 'Camino completo', '25 000 lecciones', () => [S.st.les, 25000], 1000],
  ['s3', 'flame', 'Chispa', 'Racha de 3 días', () => [S.best, 3], 10], ['s7', 'flame', 'Una semana', 'Racha de 7 días', () => [S.best, 7], 20], ['s30', 'flame', 'Un mes', 'Racha de 30 días', () => [S.best, 30], 60], ['s100', 'sparkle', 'Cien días', 'Racha de 100 días', () => [S.best, 100], 150], ['s365', 'sun', 'Un año entero', 'Racha de 365 días', () => [S.best, 365], 400], ['s1000', 'moon', 'Mil días', 'Racha de 1 000 días', () => [S.best, 1000], 1000],
  ['x1k', 'star', 'Mil XP', 'Gana 1 000 XP', () => [S.xp, 1000], 20], ['x10k', 'sparkle', 'Diez mil XP', 'Gana 10 000 XP', () => [S.xp, 10000], 80], ['x100k', 'crown', 'Cien mil XP', 'Gana 100 000 XP', () => [S.xp, 100000], 300],
  ['p1', 'gem', 'Impecable', 'Una lección sin errores', () => [S.st.perf, 1], 5], ['p25', 'gem', 'Precisión', '25 lecciones perfectas', () => [S.st.perf, 25], 40], ['p250', 'crown', 'Perfeccionista', '250 lecciones perfectas', () => [S.st.perf, 250], 150], ['c20', 'bolt', 'Combo ×20', '20 aciertos seguidos', () => [S.st.combo, 20], 30],
  ['w50', 'book', 'Vocabulario', '50 palabras aprendidas', () => [learnedAll(), 50], 20], ['w300', 'book2', 'Diccionario andante', '300 palabras', () => [learnedAll(), 300], 60], ['w1000', 'book2', 'Enciclopedia', '1 000 palabras', () => [learnedAll(), 1000], 200], ['w3000', 'brain', 'Memoria políglota', '3 000 palabras', () => [learnedAll(), 3000], 500],
  ['u1', 'cap', 'Unidad 1', 'Aprueba un examen de unidad', () => [maxUnits(), 1], 15], ['A1', 'cap', 'Nivel A1', 'Termina A1 en algún idioma', () => [maxUnits(), 8], 100], ['B1', 'cap', 'Nivel B1', 'Termina B1', () => [maxUnits(), 24], 200], ['C1', 'cap', 'Nivel C1', 'Termina C1', () => [maxUnits(), 40], 400], ['C2', 'trophy2', 'Maestría', 'Completa las 48 unidades', () => [maxUnits(), 48], 1000],
  ['cert1', 'medal', 'Certificado', 'Aprueba una certificación', () => [S.st.cert, 1], 50], ['cert6', 'cert', 'Seis sellos', 'Aprueba 6 certificaciones', () => [S.st.cert, 6], 300],
  ['poly2', 'cultura', 'Bilingüe en camino', 'Practica 2 idiomas', () => [CIDS.filter(id => S.C[id] && S.C[id].les > 0).length, 2], 30], ['poly4', 'map', 'Políglota', 'Practica los 4 idiomas', () => [CIDS.filter(id => S.C[id] && S.C[id].les > 0).length, 4], 120],
  ['g7', 'target', 'Constancia', 'Cumple tu meta 7 veces', () => [S.st.goalDays, 7], 30], ['g30', 'target', 'Disciplina', 'Cumple tu meta 30 veces', () => [S.st.goalDays, 30], 100],
  ['early', 'sun', 'Madrugador', 'Una lección antes de las 7 a. m.', () => [S.st.early, 1], 10], ['night', 'moon', 'Búho', 'Una lección después de las 11 p. m.', () => [S.st.night, 1], 10], ['wknd', 'calendar', 'Guerrero de finde', '20 lecciones en fin de semana', () => [S.st.wknd, 20], 20],
  ['cj100', 'repaso', 'Conjugador', '100 conjugaciones correctas', () => [S.st.conj, 100], 30], ['cj1k', 'gear', 'Máquina verbal', '1 000 conjugaciones', () => [S.st.conj, 1000], 120], ['tb25', 'grid', 'Tabla perfecta', '25 tablas correctas', () => [S.st.table, 25], 60],
  ['d100', 'escucha', 'Oído fino', '100 dictados correctos', () => [S.st.dict, 100], 40], ['sp50', 'habla', 'Lengua suelta', '50 ejercicios de pronunciación', () => [S.st.speak, 50], 30], ['ph50', 'lips', 'Fonetista', '50 ejercicios de fonética', () => [S.st.phon, 50], 30], ['spd', 'bolt', 'Rayo', '20 aciertos en contrarreloj', () => [S.st.speed, 20], 30],
  ['ex10', 'pen', 'Examinador', 'Aprueba 10 exámenes', () => [S.st.exam, 10], 40], ['jump', 'jump', 'Salto', 'Aprueba una prueba para saltar', () => [S.st.jump, 1], 20], ['shop', 'tophat', 'Très chic', 'Compra un accesorio', () => [S.st.shop, 1], 10], ['logo', 'palette', 'Nueva imagen', 'Cambia la pose del logo', () => [S.st.logo, 1], 5], ['share', 'megaphone', 'Presumido', 'Comparte tu placa', () => [S.st.share, 1], 10],
  ['lv10', 'level', 'Nivel 10', 'Llega al nivel 10 de jugador', () => [lvlInfo().lv, 10], 50], ['lv25', 'level', 'Nivel 25', 'Llega al nivel 25', () => [lvlInfo().lv, 25], 150],
  ['card10', 'postcard', 'Coleccionista', 'Junta 10 postales', () => [Object.keys(S.cards).length, 10], 50], ['card48', 'postcard', 'Álbum completo', 'Junta 48 postales', () => [Object.keys(S.cards).length, 48], 300],
  ['chest10', 'chest', 'Cazatesoros', 'Abre 10 cofres', () => [S.st.chests, 10], 40], ['chest100', 'chest', 'Pirata del idioma', 'Abre 100 cofres', () => [S.st.chests, 100], 200]
];
function checkAch(silent) {
  const got = [];
  ACH.forEach(([id, em, n, d, fn, rw]) => { if (S.ach[id]) return; const [c, t] = fn(); if (c >= t) { S.ach[id] = Date.now(); S.gems += rw; got.push([em, n, rw]); } });
  if (got.length) { save(); if (!silent) got.forEach((g, i) => setTimeout(() => { toast(g[0], 'Logro: ' + g[1], '+' + g[2] + ' croissants'); SFX.match(); }, 400 + i * 900)); }
}
let achTab = 'logros';
function postcard(c, u, big) {
  const un = course(c).units[u], got = S.cards[c + ':' + u];
  if (!got && !big) return '<div class="pc lockd"><span class="pcn">' + (u + 1) + '</span>' + ico('lock') + '</div>';
  return '<button class="pc' + (big ? ' big' : '') + '" style="--lv:' + lvColor(un.lv) + '" data-card="' + c + ':' + u + '"><span class="pc-st">' + META[c].flag + '</span><span class="pc-i">' + ico(UICON[u] || 'book') + '</span><b>' + esc(un.t) + '</b><small>Unidad ' + (u + 1) + ' · ' + un.lv + '</small></button>';
}
function viewAlbum() {
  const have = course(S.cur).units.filter((_, u) => S.cards[S.cur + ':' + u]).length;
  return '<div class="sec-h"><div><h2>Álbum ' + M().flag + '</h2><p>' + have + ' de 48 postales. Ganas una al aprobar el examen de cada unidad.</p></div></div><div class="album">' + course(S.cur).units.map((_, u) => postcard(S.cur, u)).join('') + '</div>';
}
function viewLogros() {
  const n = ACH.filter(a => S.ach[a[0]]).length;
  const tabs = '<div class="seg big-seg"><button data-atab="logros" aria-pressed="' + (achTab === 'logros') + '">Logros</button><button data-atab="album" aria-pressed="' + (achTab === 'album') + '">Álbum de postales</button></div>';
  if (achTab === 'album') return '<div style="height:12px"></div>' + tabs + viewAlbum();
  return '<div class="sec-h"><div><h2>Logros</h2><p>' + n + ' de ' + ACH.length + ' desbloqueados. Cada uno da croissants.</p></div></div>' + tabs + '<div class="bar mb"><i style="width:' + (n / ACH.length * 100) + '%"></i></div><div class="ach">' +
    ACH.map(([id, em, nm, d, fn, rw]) => { const [c, t] = fn(), got = S.ach[id]; return '<div class="ab' + (got ? ' got' : '') + '"><div class="md">' + ico(em) + '</div><b>' + esc(nm) + '</b><small>' + esc(d) + '</small>' + (got ? '<small class="okc">' + ico('check') + 'Desbloqueado</small>' : '<div class="bar"><i style="width:' + clamp(c / t * 100, 0, 100) + '%"></i></div><small class="mono">' + fmt(Math.min(c, t)) + '/' + fmt(t) + ' · +' + rw + '</small>') + '</div>'; }).join('') + '</div>';
}

/* ---------- perfil ---------- */
let installEvt = null; window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (route === 'perfil') render(); });
function viewPerfil() {
  const seg = (key, vals) => '<div class="seg">' + vals.map(([v, l]) => '<button data-set="' + key + '" data-val="' + v + '" aria-pressed="' + (String(S.set[key]) === String(v)) + '">' + l + '</button>').join('') + '</div>';
  const goalSeg = '<div class="seg">' + [5, 10, 20, 30].map(v => '<button data-goal="' + v + '" aria-pressed="' + (S.goal === v) + '">' + v + '</button>').join('') + '</div>';
  const sw = (key, l, d) => '<div class="set-row"><label for="sw-' + key + '">' + l + '<small>' + d + '</small></label><input type="checkbox" class="sw" id="sw-' + key + '" data-sw="' + key + '"' + (S.set[key] ? ' checked' : '') + '></div>';
  const v = voiceFor(M().voice);
  return '<div class="card mt0"><div class="prof"><div class="pm">' + logoMascot() + '</div><div style="min-width:0"><div class="eyebrow">Aprendiendo desde ' + new Date(S.created).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }) + '</div><h2>' + esc(S.name || 'Sin nombre') + '</h2><div class="flags">' + CIDS.filter(id => S.C[id]).map(id => '<span>' + META[id].flag + ' ' + levelOf(id) + '</span>').join('') + '</div><button class="link" data-act="rename">Cambiar nombre</button></div></div></div>' +
    '<div class="sec-h"><div><h2>Logo de la app</h2><p>Elige la pose de ' + PET() + ': cambia el logo, el ícono de la pestaña y tu placa. Subir de nivel desbloquea poses.</p></div></div><div class="poses">' + POSES.map(p => { const lk = p.lv > lvlInfo().lv; return '<button class="pose' + (S.logo === p.id ? ' on' : '') + (lk ? ' lk' : '') + '" data-logo="' + p.id + '" aria-pressed="' + (S.logo === p.id) + '">' + mascot({ mood: p.mood, anim: lk ? 'none' : p.anim, wear: p.wear }) + '<span>' + (lk ? ico('lock') + 'Nivel ' + p.lv : p.n) + '</span></button>'; }).join('') + '</div>' +
    '<div class="sec-h"><div><h2>Ajustes</h2></div></div><div class="card">' +
    '<div class="set-row"><label>Meta diaria<small>Lecciones por día. El plan de 4 años es de 20.</small></label>' + goalSeg + '</div>' +
    '<div class="set-row"><label>Velocidad de voz<small>' + (HAS_TTS ? (v ? 'Voz: ' + esc(v.name) : 'Voz del sistema') : 'Tu navegador no tiene voz') + '</small></label>' + seg('rate', [[0.7, 'Lenta'], [0.9, 'Normal'], [1.05, 'Rápida']]) + '</div>' +
    '<div class="set-row"><label>Tema<small>Claro, oscuro o el de tu sistema.</small></label>' + seg('theme', [['auto', 'Auto'], ['light', 'Claro'], ['dark', 'Oscuro']]) + '</div>' +
    sw('strict', 'Modo riguroso', 'Acentos, artículos y ortografía exactos en todo. Exámenes y certificaciones siempre lo son.') +
    sw('mvoice', 'Voz de la mascota', PET() + ' te habla en español: te felicita, te corrige y te lee las guías.') + sw('sound', 'Efectos de sonido', 'Ding al acertar, buzz al fallar.') + sw('haptic', 'Vibración', 'En celulares compatibles.') + sw('auto', 'Audio automático', 'Pronuncia al aparecer cada palabra.') + sw('listen', 'Ejercicios de escucha', 'Dictados y comprensión auditiva.') + sw('speak', 'Ejercicios de pronunciación', 'Usan el micrófono si tu navegador lo permite.') +
    '</div>' + (installEvt ? '<div class="sec-h"><div><h2>Instalar</h2></div></div><div class="card"><div class="set-row"><label>Grey~Spell como app<small>Ícono en tu pantalla de inicio y funciona sin internet.</small></label><button class="btn sm" data-act="install">Instalar</button></div></div>' : '') +
    '<div class="sec-h"><div><h2>Tus datos</h2><p>Todo vive en este navegador. Haz respaldos.</p></div></div><div class="card"><div class="row-btn"><button class="btn ghost sm" data-act="export">Copiar respaldo</button><button class="btn ghost sm" data-act="import">Restaurar respaldo</button><button class="btn ghost sm danger" data-act="reset">Borrar progreso</button></div></div>';
}

/* ---------- palabras, guía, tienda ---------- */
function viewPalabras() {
  const ids = Object.keys(CS().words).filter(id => WMAP[id]).sort((a, b) => strength(a) - strength(b));
  const rows = ids.map(id => { const w = WMAP[id], s = strength(id); return '<button class="wrow" data-say="' + esc(w.fr) + '" data-q="' + esc(deacc(norm(w.fr + ' ' + w.alts.join(' ') + (M().cyr ? ' ' + translit(norm(w.fr)) : '')))) + '"><b>' + (w.em ? w.em + ' ' : '') + esc(w.fr) + '</b><span>' + esc(w.es) + '</span><span class="str" title="Memoria ' + s + '/6">' + Array.from({ length: 6 }, (_, k) => '<i class="' + (k < s ? 'on' : '') + '"></i>').join('') + '</span></button>'; }).join('');
  return '<div class="sec-h"><div><h2>Mis palabras ' + M().flag + '</h2><p>' + ids.length + ' vistas · las más débiles primero. Toca para escuchar.</p></div></div><input class="search" id="wsearch" type="search" placeholder="Buscar en ' + L() + ' o español…" aria-label="Buscar palabra"><div class="wlist" id="wlist">' + (rows || '<div class="empty"><div class="em">' + mascot({ mood: 'think' }) + '</div>Aún no ves palabras. ¡Empieza tu primera lección!</div>') + '</div>';
}
let guideTab = 'gram';
function viewGuia() {
  const tabs = '<div class="seg big-seg"><button data-gtab="gram" aria-pressed="' + (guideTab === 'gram') + '">Gramática</button><button data-gtab="phon" aria-pressed="' + (guideTab === 'phon') + '">Fonética</button></div>';
  const body = guideTab === 'phon'
    ? '<div class="phon">' + CD().phon.map(p => '<div class="ph"><b class="phs">' + esc(p.s) + '</b><div><p>' + esc(p.d) + '</p><div class="phx">' + p.ex.map(e => '<button class="chipb" data-say="' + esc(e) + '">' + ico('spk') + esc(e) + '</button>').join('') + '</div></div></div>').join('') + '</div>'
    : CD().units.map((u, i) => '<details class="gram" style="--lv:' + lvColor(u.lv) + '"' + (i === current()[0] ? ' open' : '') + '><summary><span class="lv">' + u.lv + '</span><span>' + (i + 1) + '. ' + esc(u.gt) + '</span></summary><div class="gbody">' + md(u.note) + '</div></details>').join('');
  return '<div class="sec-h"><div><h2>Guía de ' + L() + ' ' + M().flag + '</h2><p>Explicada desde el español de México. Toca el ' + L() + ' para oírlo.</p></div></div>' + tabs + body;
}
const SHOP = [
  ['freeze', 'ice', 'Protector de racha', 'Si un día no practicas, tu racha sigue viva. Máximo 3.', 200],
  ['boost', 'bolt', 'Doble XP · 15 min', 'Tus lecciones valen el doble durante 15 minutos.', 120],
  ['beret', 'beret', 'Boina negra', 'El clásico parisino.', 150], ['scarf', 'scarf', 'Bufanda tricolor', 'Azul, blanco y rojo.', 250], ['baguette', 'baguette', 'Baguette', 'Recién salida de la boulangerie.', 300],
  ['glasses', 'glasses', 'Lentes de estudio', 'Para leer a Pushkin y a Machado.', 350], ['mono', 'mono', 'Monóculo dorado', 'Para leer a Proust con elegancia.', 450], ['crown', 'crown', 'Corona', 'Solo para la realeza de los idiomas.', 1500]
];
const HATS = ['beret', 'crown', 'party', 'chef', 'cap'];
function viewTienda() {
  return '<div class="sec-h"><div><h2>Tienda</h2><p class="ih">Tienes ' + ico('croissant') + '<b>' + fmt(S.gems) + '</b> croissants. Se ganan con lecciones, metas y logros.</p></div></div><div class="shop">' +
    SHOP.map(([id, em, n, d, cost]) => {
      const cos = !['freeze', 'boost'].includes(id), own = S.own[id], wearing = S.wear[id];
      let btn;
      if (cos && own) btn = '<button class="btn sm ' + (wearing ? 'ok' : 'ghost') + '" data-wear="' + id + '">' + (wearing ? 'Puesto' : 'Ponerlo') + '</button>';
      else if (id === 'freeze' && S.freezes >= 3) btn = '<button class="btn sm" disabled>Tienes 3</button>';
      else if (id === 'boost' && S.boost > Date.now()) btn = '<button class="btn sm" disabled>Activo</button>';
      else btn = '<button class="btn sm" data-buy="' + id + '"' + (S.gems < cost ? ' disabled' : '') + '>' + ico('croissant') + cost + '</button>';
      return '<div class="item"><div class="ii">' + (cos ? mascot({ wear: { [id]: 1 }, anim: 'idle' }) : ico(em)) + '</div><div><b>' + esc(n) + (id === 'freeze' ? ' · tienes ' + S.freezes : '') + '</b><small>' + esc(d) + '</small></div>' + btn + '</div>';
    }).join('') + '</div><p class="sub center small">Los accesorios se ven en Grisou dentro de las lecciones. Para el logo, elige una pose en Perfil.</p>';
}

/* ---------- render principal ---------- */
function render() {
  const r = (location.hash || '#aprender').slice(1);
  route = [...ROUTES, ...EXTRA].some(x => x[0] === r) ? r : r === 'ligas' ? 'stats' : r === 'gramatica' ? 'guia' : 'aprender';
  applyTheme(); renderNav(); renderChips(); renderRail();
  const V = { aprender: viewAprender, practicar: viewPracticar, stats: viewStats, logros: viewLogros, perfil: viewPerfil, palabras: viewPalabras, guia: viewGuia, tienda: viewTienda };
  const v = $('#view'); v.innerHTML = V[route](); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter');
  if (route === 'aprender') requestAnimationFrame(() => { const c = $('.node.cur'); if (c && render.scrolled !== S.cur) { c.scrollIntoView({ block: 'center' }); render.scrolled = S.cur; } });
  if (route === 'palabras') { const inp = $('#wsearch'); if (inp) inp.addEventListener('input', () => { const q = deacc(norm(inp.value)); $$('#wlist .wrow').forEach(row => { row.hidden = !!q && !row.dataset.q.includes(q); }); }); }
  if (route === 'stats') plateReady().then(() => drawPlate($('#plate')));
}
function applyTheme() { const t = S.set.theme, R0 = document.documentElement; if (t === 'auto') R0.removeAttribute('data-theme'); else R0.setAttribute('data-theme', t); R0.dataset.course = S.cur; const a = THEME[S.cur].acc[isDark() ? 1 : 0]; R0.style.setProperty('--acc', a[0]); R0.style.setProperty('--acc-2', a[1]); R0.style.setProperty('--acc-soft', a[2]); R0.style.setProperty('--mascot', THEME[S.cur].body[isDark() ? 1 : 0]); R0.style.setProperty('--mascot-d', THEME[S.cur].dark[isDark() ? 1 : 0]); const mc = $('meta[name="theme-color"]'); if (mc) mc.content = getComputedStyle(document.body).backgroundColor; }
function go(r) { if (location.hash === '#' + r) render(); else location.hash = r; window.scrollTo(0, 0); }

/* ================= modal, toasts, confeti ================= */
function modal(html, mount) { const m = $('#modal'); m.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"><span class="grab"></span>' + html + '</div>'; m.hidden = false; if (mount) mount(m); }
function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
function toast(em, t, s) { const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = '<span class="ti">' + (ICO[em] ? ico(em) : em) + '</span><div>' + esc(t) + (s ? '<small>' + esc(s) + '</small>' : '') + '</div>'; $('#toasts').appendChild(el); setTimeout(() => el.remove(), 3600); }
function confetti() { if (RM()) return; const c = document.createElement('div'); c.className = 'confetti'; const cols = ['var(--acc)', 'var(--gold)', 'var(--red)', 'var(--ok)', 'var(--white)', 'var(--flame)']; for (let i = 0; i < 70; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = pick(cols); p.style.animationDuration = 1.6 + Math.random() * 1.8 + 's'; p.style.animationDelay = Math.random() * 0.5 + 's'; c.appendChild(p); } document.body.appendChild(c); setTimeout(() => c.remove(), 4200); }
function poke(el) {
  const a = pick(['hop', 'spin', 'wave', 'cheer', 'dance']), hi = pick(M().hi);
  const host = el.closest('.hero-m, .path-masc') || el, hero = host.classList.contains('hero-m');
  host.innerHTML = mascot({ mood: 'happy', anim: a, wear: hero ? poseOf(S.logo).wear : undefined });
  SFX.boop(); buzz(10); grisou(pick(CHEER), hi[0]);
  const b = $('#hiBubble'); if (b) { b.innerHTML = '<b>' + esc(hi[0]) + '</b> <span>' + esc(hi[1]) + '</span>'; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
  clearTimeout(poke.t); poke.t = setTimeout(() => { if (host.isConnected) host.innerHTML = hero ? logoMascot() : mascot({ anim: 'walk' }); }, 1800);
}

/* ================= motor de lección ================= */
let LS = null;
function startLesson(pack) {
  if (!pack.items.length) { toast('alert', 'No hay ejercicios disponibles', 'Activa audio o pronunciación en Perfil'); return; }
  closeModal(); if (HAS_TTS) try { speechSynthesis.cancel(); } catch (e) { /* nada */ }
  LS = { ctx: pack.ctx, queue: pack.items.slice(), total: pack.items.length, step: 0, graded: 0, ok: 0, combo: 0, maxCombo: 0, t0: Date.now(), retry: !pack.ctx.exam, strict: !!pack.ctx.exam || S.set.strict, cur: null, state: 'ask', sel: null, again: new Set() };
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  const label = pack.ctx.cert ? 'Certificación ' + pack.ctx.lv : pack.ctx.type === 'jump' ? 'Prueba de salto' : pack.ctx.exam ? 'Examen' : '';
  el.innerHTML = '<div class="l-top"><button class="l-x" data-act="quit" aria-label="Salir de la lección">' + ico('x') + '</button><div class="l-prog" role="progressbar" aria-label="Progreso"><i></i></div><div class="l-combo" id="lcombo">' + (label ? '<span class="xtag">' + label + '</span>' : '') + '</div></div><div class="l-body"><div class="l-inner" id="lbody"></div></div><div class="l-foot" id="lfoot"></div>';
  next();
}
function progress() { $('#lesson .l-prog i').style.width = (LS.step / LS.total * 100) + '%'; const c = $('#lcombo'); if (!LS.ctx.exam) c.innerHTML = LS.combo >= 3 ? '<span class="combo">' + ico('flame') + '×' + LS.combo + '</span>' : ''; }
function next() { if (!LS.queue.length) return finishLesson(); LS.cur = LS.queue.shift(); LS.state = 'ask'; LS.sel = null; progress(); renderItem(); }
function foot(mode, data = {}) {
  if (mode === 'none') return;
  const f = $('#lfoot'); f.className = 'l-foot' + (mode === 'ok' ? ' ok' : mode === 'bad' ? ' bad' : ''); const it = LS.cur;
  if (mode === 'ask') {
    const skip = it.listen ? '<button class="btn ghost" data-act="noaudio">No puedo escuchar</button>' : it.t === 'speak' ? '<button class="btn ghost" data-act="nomic">No puedo hablar</button>' : (['choice', 'type', 'tiles', 'table'].includes(it.t) && !LS.ctx.exam ? '<button class="btn ghost" data-act="skip">Saltar</button>' : '');
    f.innerHTML = '<div class="f-in"><div class="f-skip">' + skip + '</div><div class="f-btns"><button class="btn" id="checkBtn" data-act="check" disabled>Comprobar</button></div></div>';
  } else if (mode === 'go') { f.innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn" data-act="next">' + (data.label || 'Continuar') + '</button></div></div>'; setTimeout(() => { const b = f.querySelector('.btn'); if (b) b.focus({ preventScroll: true }); }, 30); }
  else {
    const ok = mode === 'ok';
    f.innerHTML = '<div class="f-in"><div class="f-msg"><span class="fi">' + mascot({ mood: ok ? 'happy' : 'sad', anim: ok ? 'hop' : 'sad', wear: {} }) + '</span><div><h3>' + (data.title || (ok ? pick(PRAISE) : 'Respuesta correcta:')) + '</h3>' + (data.msg ? '<p>' + data.msg + '</p>' : '') + '</div></div><div class="f-btns"><button class="btn ' + (ok ? 'ok' : 'bad') + '" data-act="next">Continuar</button></div></div>';
    setTimeout(() => { const b = f.querySelector('.btn'); if (b) b.focus({ preventScroll: true }); }, 30);
  }
}
const ready = on => { const b = $('#checkBtn'); if (b) b.disabled = !on; };
function promptHTML(it) {
  if (it.listen) return '<div class="bigsay">' + sayBtn(it.audio) + sayBtn(it.audio, true) + '</div>';
  const big = it.cloze ? '<div class="cloze">' + it.cloze.map(t => t === null ? '<span class="gap" id="gap">&nbsp;</span>' : esc(t)).join(' ') + '</div>' : (it.big ? '<div class="big">' + esc(it.big) + '</div>' : '');
  return '<div class="prompt"><div class="pm" id="pmasc">' + mascot({ mood: 'think' }) + '</div><div class="bubble">' + (it.audio ? '<div class="bline">' + sayBtn(it.audio) + big + '</div>' : big) + (it.sub ? '<small>' + esc(it.sub) + '</small>' : '') + '</div></div>';
}
function keyboard(lang) {
  if (lang !== 'fr') return '';
  if (M().cyr) { const rows = ['й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю ё']; return '<div class="kbd">' + rows.map(r => '<div>' + r.split(' ').map(c => '<button data-acc="' + c + '">' + c + '</button>').join('') + '</div>').join('') + '<div><button class="wide" data-acc=" ">espacio</button><button data-act="bksp" aria-label="Borrar">⌫</button></div><small class="sub">También puedes escribir en letras latinas: privet = привет</small></div>'; }
  return '<div class="accents">' + M().keys.map(c => '<button data-acc="' + c + '">' + c + '</button>').join('') + '</div>';
}
function renderItem() {
  const it = LS.cur, b = $('#lbody');
  let h = '<div class="l-kind">' + esc(it.kind || '') + '</div>';
  if (it.t === 'intro') {
    const w = it.w;
    b.innerHTML = '<div class="l-kind">Palabra nueva</div><h2 class="l-q">Aprende esta palabra</h2><div class="intro pop-in">' + (w.em ? '<div class="em">' + w.em + '</div>' : '<div class="intro-m">' + mascot({ mood: 'happy', anim: 'wave' }) + '</div>') + '<div class="bline">' + sayBtn(w.fr) + '<div class="big">' + esc(w.fr) + '</div></div>' + (M().cyr ? '<div class="sub mono">' + esc(translit(norm(w.fr))) + '</div>' : '') + '<div class="intro-es">' + esc(w.alts.join(' · ')) + '</div>' + (w.gender != null ? '<span class="gtag">' + (S.cur === 'sv' ? (w.gender ? 'ett-ord' : 'en-ord') : w.gender ? 'femenino' : 'masculino') + '</span>' : '') + sayBtn(w.fr, true) + '</div>';
    foot('go', { label: 'Lo tengo' }); if (S.set.auto) grisou(pick(['Palabra nueva.', 'Mira esta palabra.', 'Esta te va a servir.']), w.fr); return;
  }
  if (it.t === 'note') { const u = CD().units[it.u]; b.innerHTML = '<div class="l-kind">Guía rápida</div><h2 class="l-q">' + esc(u.gt) + '</h2><div class="prompt"><div class="pm">' + mascot({ mood: 'happy', anim: 'wave' }) + '</div><div class="bubble small-b">Te explico rápido. <button class="btn ghost sm" data-act="readnote" data-u="' + it.u + '">' + ico('voice') + 'Escuchar a ' + PET() + '</button></div></div><div class="card">' + md(u.note) + '</div>'; foot('go', { label: '¡Entendido!' }); return; }
  h += '<h2 class="l-q">' + esc(it.q) + '</h2>';
  if (it.t === 'choice') h += (it.pics ? '' : promptHTML(it)) + '<div class="opts' + (it.pics ? ' pics' : '') + '" role="listbox">' + it.opts.map((o, i) => { const txt = typeof o === 'string' ? o : o.text; return '<button class="opt' + (it.pics ? ' pic' : '') + '" data-opt="' + i + '" role="option" style="--d:' + i * 40 + 'ms">' + (it.pics ? '<span class="em">' + o.em + '</span>' : '<span class="k">' + (i + 1) + '</span>') + '<span>' + esc(txt) + '</span></button>'; }).join('') + '</div>';
  else if (it.t === 'read') h += '<div class="passage">' + it.passage.map((s, i) => i === it.hi ? '<mark>' + esc(s) + '</mark>' : esc(s)).join(' ') + '</div><div class="bline">' + sayBtn(it.passage.join(' ')) + sayBtn(it.passage.join(' '), true) + '</div><div class="opts">' + it.opts.map((o, i) => '<button class="opt" data-opt="' + i + '" style="--d:' + i * 40 + 'ms"><span class="k">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>';
  else if (it.t === 'type') h += promptHTML(it) + '<textarea class="typebox" id="tbox" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" lang="' + (it.lang === 'es' ? 'es' : M().voice) + '" placeholder="' + (it.lang === 'es' ? 'Escribe en español' : it.lang === 'num' ? 'Escribe el número' : 'Escribe en ' + L()) + '" aria-label="Tu respuesta"></textarea>' + keyboard(it.lang) + (LS.strict && it.lang !== 'num' ? '<small class="sub">Modo riguroso: acentos y artículos cuentan.</small>' : '');
  else if (it.t === 'table') h += '<div class="prompt"><div class="pm" id="pmasc">' + mascot({ mood: 'think' }) + '</div><div class="bubble"><div class="big" style="font-size:24px">' + esc(it.q.replace('Conjuga ', '')) + '</div><small>' + esc(it.sub || '') + '</small></div></div><div class="ctable">' + it.rows.map((r, i) => '<label><span>' + r.label + '</span><input id="tb' + i + '" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + r.label + ' …" aria-label="Forma para ' + r.label + '"></label>').join('') + '</div>' + keyboard('fr');
  else if (it.t === 'tiles') { h += promptHTML(it) + '<div class="tline" id="tline" aria-label="Tu respuesta"></div><div class="bank" id="tbank">' + it.bank.map((t, i) => '<button class="tile" data-tile="' + i + '">' + esc(t) + '</button>').join('') + '</div>'; LS.sel = []; }
  else if (it.t === 'pairs') { const Lf = shuffle(it.pairs.map((w, i) => [i, w.fr])), R = shuffle(it.pairs.map((w, i) => [i, w.es])); h += '<div class="pairs"><div class="col">' + Lf.map(([i, t]) => '<button class="opt" data-pl="' + i + '">' + esc(t) + '</button>').join('') + '</div><div class="col">' + R.map(([i, t]) => '<button class="opt" data-pr="' + i + '">' + esc(t) + '</button>').join('') + '</div></div>'; LS.sel = { l: null, r: null, left: it.pairs.length, miss: 0 }; }
  else if (it.t === 'speak') h += '<div class="prompt"><div class="pm" id="pmasc">' + mascot({ mood: 'happy', anim: 'wave' }) + '</div><div class="bubble"><div class="bline">' + sayBtn(it.text) + '<div class="big" style="font-size:26px">' + esc(it.text) + '</div></div>' + (it.es ? '<small>' + esc(it.es) + '</small>' : '') + '</div></div><button class="mic" id="micBtn" aria-label="Hablar">' + ico('habla') + '</button><p class="center sub" id="micMsg">' + (SR ? 'Toca el micrófono y lee en voz alta.' : 'Escucha, repite en voz alta y marca cómo te fue.') + '</p><div class="center" id="selfBox">' + (SR ? '<p class="sub small">¿Sin micrófono? Repite en voz alta y márcalo tú:</p>' : '') + '<div class="row-btn center-row"><button class="btn ok sm" data-act="selfok">Lo dije bien</button><button class="btn ghost sm" data-act="selfbad">Me costó</button></div></div>';
  b.innerHTML = h;
  foot(it.t === 'pairs' ? 'none' : 'ask');
  if (it.t === 'pairs') $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn" disabled>Encuentra todos los pares</button></div></div>';
  if (it.t === 'type') { const t = $('#tbox'); setTimeout(() => t.focus({ preventScroll: true }), 60); t.addEventListener('input', () => ready(t.value.trim().length > 0)); t.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (LS.state === 'ask' && t.value.trim()) check(); else if (LS.state !== 'ask') next(); } }); }
  if (it.t === 'table') { const ins = $$('.ctable input'); setTimeout(() => ins[0].focus({ preventScroll: true }), 60); ins.forEach((inp, i) => { inp.addEventListener('focus', () => { LS.focusIn = inp; }); inp.addEventListener('input', () => ready(ins.every(x => x.value.trim()))); inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (LS.state !== 'ask') return next(); if (i < 5) ins[i + 1].focus(); else if (ins.every(x => x.value.trim())) check(); } }); }); LS.focusIn = ins[0]; }
  if (it.audio && (it.listen || S.set.auto)) setTimeout(() => say(it.audio), 260);
}
function check() {
  const it = LS.cur; if (LS.state !== 'ask') return;
  let ok = false, msg = '';
  if (it.t === 'choice' || it.t === 'read') {
    if (LS.sel == null) return;
    const o = it.opts[LS.sel], txt = typeof o === 'string' ? o : o.text; ok = norm(txt) === norm(it.ans);
    $$('#lbody [data-opt]').forEach((bt, i) => { bt.disabled = true; const t = typeof it.opts[i] === 'string' ? it.opts[i] : it.opts[i].text; if (norm(t) === norm(it.ans)) bt.classList.add('right'); else if (i === LS.sel) bt.classList.add('wrong'); });
    if (it.cloze) $('#gap').textContent = it.ans;
    msg = ok ? (it.reveal ? esc(it.reveal) : it.after ? esc(it.after) : '') : esc(it.ans) + (it.reveal ? '<br>' + esc(it.reveal) : '');
  } else if (it.t === 'type') {
    const g = grade($('#tbox').value, it.answers, LS.strict && it.lang !== 'num'); ok = g.ok; $('#tbox').readOnly = true;
    msg = ok ? (g.note ? esc(g.note) : it.lang === 'num' ? esc(it.answers[0] + ' = ' + it.answers[1]) : '') : esc(it.answers[0]) + (it.lang === 'num' ? ' · ' + esc(it.answers[1]) : '');
  } else if (it.t === 'tiles') {
    const got = LS.sel.map(i => it.bank[i]).join(' '); ok = deacc(norm(got)) === deacc(norm(it.answer.join(' ')));
    msg = ok ? (it.after ? esc(it.after) : '') : esc(it.answer.join(' '));
  } else if (it.t === 'table') {
    let all = true; it.rows.forEach((r, i) => { const inp = $('#tb' + i), g = grade(inp.value, r.answers, LS.strict); inp.readOnly = true; inp.parentNode.classList.add(g.ok ? 'right' : 'wrong'); if (!g.ok) { all = false; inp.value = inp.value + '  →  ' + r.answers[0]; } });
    ok = all; if (ok) S.st.table++; msg = ok ? 'Las seis formas, perfectas.' : 'Revisa las formas en rojo.';
  }
  resolve(ok, msg);
}
function resolve(ok, msg) {
  const it = LS.cur; LS.state = ok ? 'ok' : 'bad'; LS.graded++; S.st.ex++; const C = CS(); C.ex++;
  if (ok) { LS.ok++; S.st.ok++; C.ok++; LS.combo++; LS.maxCombo = Math.max(LS.maxCombo, LS.combo); S.st.combo = Math.max(S.st.combo, LS.combo); LS.step++; SFX.ok(); if (it.conj) S.st.conj++; if (it.dict) S.st.dict++; if (it.phon) S.st.phon++; }
  else { LS.combo = 0; SFX.bad(); if (LS.retry && !LS.again.has(it.key)) { LS.again.add(it.key); LS.queue.push(it); } else LS.step++; const lb = $('#lbody'); if (lb && !RM()) { lb.classList.remove('shake-x'); void lb.offsetWidth; lb.classList.add('shake-x'); } }
  (it.wid || []).forEach(id => { touchWord(id, ok); if (!ok) addMistake('w', id); else if (LS.ctx.mode === 'errores') dropMistake('w', id); });
  if (it.sid) { if (!ok) addMistake('s', it.sid); else if (LS.ctx.mode === 'errores') dropMistake('s', it.sid); }
  const pm = $('#pmasc'); if (pm) pm.innerHTML = mascot({ mood: ok ? 'happy' : 'sad' });
  const tgt = ok ? ((it.after || (it.t === 'choice' && it.optSay)) ? (it.after || it.ans) : null) : ((it.after || it.lang === 'fr' || it.optSay) ? (it.after || (it.answers ? it.answers[0] : it.ans)) : null);
  const title = ok ? pick(PRAISE) : null;
  if (ok) { if (it.listen) qbump('listen', 1); if (['type', 'table', 'tiles'].includes(it.t)) qbump('write', 1); if (it.t === 'speak') qbump('speak', 1); }
  if (ok) { if (LS.combo === 1 || LS.combo % 4 === 0 || !tgt) grisou(title, tgt); else if (tgt) say(tgt); }
  else grisou(tgt ? pick(['Casi. Se dice así:', 'Uy, casi. Escucha:', 'No pasa nada. Es así:']) : pick(['Casi. Mira la respuesta.', 'No pasa nada, a la próxima.']), tgt);
  progress(); foot(ok ? 'ok' : 'bad', { msg, title }); save();
}
function finishLesson() {
  const Ls = LS, ctx = Ls.ctx, acc = Ls.graded ? Ls.ok / Ls.graded : 1, ms = Date.now() - Ls.t0;
  const need = ctx.cert ? CERT_PASS : PASS, passed = !ctx.exam || acc >= need;
  S.st.ms += ms; const t = dkey(), day = S.days[t] || (S.days[t] = { l: 0, x: 0 }); day.ms = (day.ms || 0) + ms;
  $('#lesson .l-prog i').style.width = '100%';
  if (!passed) {
    $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'sad' }) + '</div><h1>Casi lo logras</h1><p class="sub">Necesitas ' + Math.round(need * 100) + ' % y obtuviste ' + Math.round(acc * 100) + ' %. Repasa tus errores en Practicar y vuelve a intentarlo.</p></div>';
    $('#lfoot').className = 'l-foot'; $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn ghost" data-act="close">Salir</button><button class="btn" data-act="retry">Reintentar</button></div></div>';
    save(); return;
  }
  const perfect = Ls.graded > 0 && Ls.ok === Ls.graded && Ls.again.size === 0;
  let xp = 10 + (perfect ? 5 : 0) + Math.floor(Ls.maxCombo / 5) + (ctx.exam ? 10 : 0) + (ctx.cert ? 40 : 0);
  if (S.boost > Date.now()) xp *= 2;
  const gems = 2 + (perfect ? 3 : 0) + (ctx.exam ? 5 : 0) + (ctx.cert ? 50 : 0), before = day.l, lvBefore = lvlInfo().lv;
  day.l++; day.x += xp; day.c = day.c || {}; day.c[S.cur] = (day.c[S.cur] || 0) + 1; S.xp += xp; S.gems += gems; S.st.les++; CS().les++; if (perfect) S.st.perf++;
  const hr = new Date().getHours(), wd = new Date().getDay(); if (hr < 7) S.st.early++; if (hr >= 23) S.st.night++; if (wd === 0 || wd === 6) S.st.wknd++;
  let extended = false; if (S.last !== t) { S.streak = (S.last && dayDiff(S.last, t) === 1) ? S.streak + 1 : 1; S.last = t; extended = true; S.best = Math.max(S.best, S.streak); }
  const goalHit = before < S.goal && day.l >= S.goal; if (goalHit) { S.st.goalDays++; S.gems += 10; }
  let newCard = null;
  if (ctx.type === 'node') { const k = ctx.u + '-' + ctx.ni, was = CS().nodes[k] || 0; CS().nodes[k] = Math.min(PER_NODE, was + 1); if (ctx.exam) S.st.exam++; if (ctx.exam && was < PER_LEVEL && CS().nodes[k] >= PER_LEVEL && !S.cards[S.cur + ':' + ctx.u]) { S.cards[S.cur + ':' + ctx.u] = Date.now(); S.st.cards++; S.gems += 20; newCard = ctx.u; } }
  qbump('xp', xp); qbump('les', 1); if (perfect) qbump('perf', 1); qbump('combo', Ls.maxCombo, true);
  const lvAfter = lvlInfo().lv, lvUp = lvAfter > lvBefore; if (lvUp) S.gems += 15 * lvAfter;
  const MILES = [3, 7, 14, 30, 50, 100, 200, 365, 500, 1000]; let mile = null; if (extended && MILES.includes(S.streak) && !S.miles[S.streak]) { mile = S.streak; S.miles[mile] = Date.now(); S.gems += mile * 5; if (S.freezes < 3) S.freezes++; }
  if (ctx.type === 'jump') { CS().floor = Math.max(CS().floor, ctx.u); S.st.jump++; }
  if (ctx.cert) { if (!CS().cert[ctx.lv]) S.st.cert++; CS().cert[ctx.lv] = Date.now(); }
  save(); SFX.done(); confetti();
  grisou((ctx.cert ? '¡Aprobaste la certificación!' : ctx.exam ? '¡Aprobaste el examen!' : perfect ? '¡Lección perfecta!' : '¡Lección completada!') + ' Ganaste ' + xp + ' puntos de experiencia.');
  const mins = Math.floor(ms / 60000), secs = Math.round(ms % 60000 / 1000);
  const title = ctx.cert ? 'Certificación ' + ctx.lv + ' aprobada' : ctx.type === 'jump' ? '¡Salto aprobado!' : ctx.exam ? '¡Examen aprobado!' : perfect ? '¡Lección perfecta!' : '¡Lección completada!';
  $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'happy', anim: 'cheer', wear: ctx.cert ? { crown: 1 } : undefined }) + '</div><h1>' + title + '</h1>' +
    (ctx.type === 'jump' ? '<p class="sub">Desbloqueaste la unidad ' + (ctx.u + 1) + ' y todo lo anterior.</p>' : ctx.cert ? '<p class="sub">Tu sello ' + M().flag + ' ' + ctx.lv + ' ya aparece en tu placa.</p>' : '') +
    '<div class="rstats"><div class="rs" style="--c:var(--gold)"><small>XP</small><b>+' + xp + '</b></div><div class="rs" style="--c:var(--ok)"><small>Precisión</small><b>' + Math.round(acc * 100) + '%</b></div><div class="rs" style="--c:var(--acc)"><small>Tiempo</small><b>' + mins + ':' + String(secs).padStart(2, '0') + '</b></div></div>' +
    '<p class="sub ih center-ih">+' + gems + ' ' + ico('croissant') + ' · Hoy: ' + day.l + '/' + S.goal + (Ls.maxCombo >= 5 ? ' · Mejor combo ×' + Ls.maxCombo : '') + '</p></div>';
  $('#lfoot').className = 'l-foot';
  const after = [];
  if (extended) after.push(() => { grisou(S.streak === 1 ? '¡Empezaste una racha! Vuelve mañana.' : '¡Llevas ' + S.streak + ' días de racha!' + (mile ? ' Te ganaste un premio.' : '')); return '<div class="result"><div class="flame">' + ico('flame') + '</div><h1>' + S.streak + (S.streak === 1 ? ' día' : ' días') + ' de racha</h1>' + weekStrip() + (mile ? '<div class="reward">' + ico('gift') + '<div><b>Premio de racha</b><small>+' + mile * 5 + ' croissants y un protector</small></div></div>' : '') + '<p class="sub">' + (S.streak === 1 ? '¡Empezaste una racha! Vuelve mañana para que crezca.' : '¡Sigue así! Vuelve mañana.') + '</p></div>'; });
  if (goalHit) after.push(() => { grisou('¡Cumpliste tu meta diaria! Estoy muy orgulloso de ti.'); return '<div class="result"><div class="rm">' + mascot({ mood: 'happy', anim: 'party', wear: { party: 1 } }) + '</div><h1>¡Meta diaria cumplida!</h1><p class="sub">' + S.goal + ' lecciones hoy. +10 croissants. ' + PET() + ' está orgulloso de ti.</p></div>'; });
  if (newCard != null) after.push(() => { grisou('¡Nueva postal para tu álbum!'); return '<div class="result"><h1>¡Nueva postal!</h1>' + postcard(S.cur, newCard, true) + '<p class="sub">+20 croissants. Búscala en Logros, pestaña Álbum.</p></div>'; });
  if (lvUp) after.push(() => { const unl = POSES.filter(p => p.lv === lvAfter); grisou('¡Subiste al nivel ' + lvAfter + '!' + (unl.length ? ' Desbloqueaste una pose nueva.' : '')); return '<div class="result"><div class="lvbig">' + ico('level') + '<b>' + lvAfter + '</b></div><h1>¡Nivel ' + lvAfter + '!</h1><p class="sub">+' + 15 * lvAfter + ' croissants.</p>' + (unl.length ? '<div class="reward">' + '<div class="rw-m">' + mascot({ mood: unl[0].mood, anim: unl[0].anim, wear: unl[0].wear }) + '</div><div><b>Pose desbloqueada: ' + unl[0].n + '</b><small>Úsala como logo en Perfil.</small></div></div>' : '') + '</div>'; });
  LS.after = after;
  $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns">' + (ctx.type === 'node' ? '<button class="btn ghost" data-act="again">Otra lección</button>' : '') + '<button class="btn" data-act="done">Continuar</button></div></div>';
}
function closeLesson() { $('#lesson').hidden = true; $('#lesson').innerHTML = ''; document.body.style.overflow = ''; if (HAS_TTS) try { speechSynthesis.cancel(); } catch (e) { /* nada */ } LS = null; render(); checkAch(); }

/* ---- contrarreloj ---- */
function startSpeed() {
  const seen = Object.keys(CS().words).filter(id => WMAP[id]).map(id => WMAP[id]); const ws = seen.length >= 10 ? seen : availUnits().flatMap(u => CD().units[u].words);
  LS = { ctx: { type: 'speed' }, score: 0, end: Date.now() + 60000, speed: true, ws, t0: Date.now() };
  const el = $('#lesson'); el.hidden = false; document.body.style.overflow = 'hidden';
  el.innerHTML = '<div class="l-top"><button class="l-x" data-act="quit" aria-label="Salir">' + ico('x') + '</button><div class="l-prog"><i style="width:100%;background:var(--acc)"></i></div><div class="timer" id="stimer">60</div></div><div class="l-body"><div class="l-inner" id="lbody"></div></div><div class="l-foot" id="lfoot"><div class="f-in"><div class="mono" id="sscore">Aciertos: 0</div></div></div>';
  speedQ();
  LS.iv = setInterval(() => { if (!LS || !LS.speed) return; const left = Math.max(0, LS.end - Date.now()); $('#stimer').textContent = Math.ceil(left / 1000); $('#lesson .l-prog i').style.width = (left / 600) + '%'; if (left <= 0) speedEnd(); }, 200);
}
function speedQ() { let it = null, g = 0; while (!it && g++ < 20) { const w = pick(LS.ws); it = Math.random() < 0.5 ? X.mcFrEs(w, LS.ws) : X.mcEsFr(w, LS.ws); } if (!it) return speedEnd(); LS.cur = it; $('#lbody').innerHTML = '<div class="l-kind">Contrarreloj</div><div class="big center pop-in">' + esc(it.big) + '</div><div class="opts">' + it.opts.map((o, i) => '<button class="opt" data-sopt="' + i + '"><span class="k">' + (i + 1) + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>'; }
function speedAnswer(i) { const it = LS.cur, ok = norm(it.opts[i]) === norm(it.ans); (it.wid || []).forEach(id => touchWord(id, ok)); if (ok) { LS.score++; SFX.ok(); } else { SFX.bad(); LS.end -= 3000; } $('#sscore').textContent = 'Aciertos: ' + LS.score + (ok ? '' : ' · −3 s'); speedQ(); }
function speedEnd() {
  if (!LS || !LS.speed) return; clearInterval(LS.iv); const sc = LS.score; LS.speed = false; const rec = sc > S.st.speed; S.st.speed = Math.max(S.st.speed, sc);
  const xp = Math.max(5, sc) * (S.boost > Date.now() ? 2 : 1), t = dkey(), day = S.days[t] || (S.days[t] = { l: 0, x: 0 }); day.x += xp; S.xp += xp; S.st.ms += 60000; save(); SFX.done(); if (rec) confetti();
  grisou(sc + ' aciertos. ' + (rec ? '¡Nuevo récord!' : '¡Bien jugado!'));
  $('#lbody').innerHTML = '<div class="result"><div class="rm">' + mascot({ mood: 'happy', anim: 'cheer' }) + '</div><h1>' + sc + ' aciertos</h1><p class="sub">' + (rec ? '¡Nuevo récord personal!' : 'Tu récord: ' + S.st.speed) + ' · +' + xp + ' XP</p></div>';
  $('#lfoot').innerHTML = '<div class="f-in"><div></div><div class="f-btns"><button class="btn ghost" data-act="speedagain">Otra vez</button><button class="btn" data-act="close">Listo</button></div></div>';
}

/* ================= eventos ================= */
document.addEventListener('click', e => {
  const t = e.target.closest('button, [data-say]'); if (!t) { if (e.target === $('#modal')) closeModal(); return; }
  const d = t.dataset;
  if (d.say !== undefined && !t.closest('.opt')) { say(d.say, !!d.slow); if (t.classList.contains('say') && !RM()) { t.classList.remove('pulse'); void t.offsetWidth; t.classList.add('pulse'); } return; }
  if (d.go) { go(d.go); return; }
  if (d.node) { const [u, i] = d.node.split(',').map(Number); openNode(u, i); return; }
  if (d.guide) { const u = CD().units[+d.guide]; modal('<div class="eyebrow">Unidad ' + (u.i + 1) + ' · ' + u.lv + '</div><h2>' + esc(u.gt) + '</h2>' + md(u.note) + '<button class="btn block" data-act="closemodal">Cerrar</button>'); return; }
  if (d.jump) { openJump(+d.jump); return; }
  if (d.cert) { modal('<div class="eyebrow">' + M().flag + ' ' + M().name + '</div><h2>Certificación ' + d.cert + '</h2><p>30 preguntas de todas las unidades de ' + d.cert + ', en modo riguroso: escritura, dictado, comprensión y gramática. Necesitas 85 %. Al aprobar ganas +50 croissants y un sello en tu placa.</p><div class="row-btn"><button class="btn ghost" data-act="closemodal">Ahora no</button><button class="btn" data-act="startcert" data-lv="' + d.cert + '">Empezar</button></div>'); return; }
  if (d.prac) { if (d.prac === 'speed') startSpeed(); else startLesson(practiceLesson(d.prac)); return; }
  if (d.buy) { buy(d.buy); return; }
  if (d.wear) { const id = d.wear; if (S.wear[id]) delete S.wear[id]; else { if (HATS.includes(id)) HATS.forEach(h => delete S.wear[h]); S.wear[id] = 1; } save(); render(); return; }
  if (d.logo) { const p = poseOf(d.logo); if (p.lv > lvlInfo().lv) { toast('lock', 'Se desbloquea en el nivel ' + p.lv, 'Gana XP con lecciones para subir'); grisou('Esa pose se desbloquea en el nivel ' + p.lv + '.'); return; } if (S.logo !== d.logo) { S.logo = d.logo; S.st.logo++; save(); setFavicon(); render(); SFX.boop(); toast('palette', 'Nuevo logo: ' + p.n); grisou('¡Me encanta mi nueva pose!'); checkAch(); } return; }
  if (d.claim !== undefined) { claim(d.claim); return; }
  if (d.card) { const [c, u] = d.card.split(':'); const un = course(c).units[+u]; const tip = (un.note || '').split('\n').find(l => l.startsWith('!')); modal(postcard(c, +u, true) + (tip ? '<p class="tipp">' + esc(tip.slice(1)) + '</p>' : '') + '<button class="btn block" data-act="closemodal">Cerrar</button>'); return; }
  if (d.atab) { achTab = d.atab; render(); return; }
  if (d.plate) { S.plate = d.plate; save(); $$('[data-plate]').forEach(bt => bt.setAttribute('aria-pressed', bt.dataset.plate === S.plate)); drawPlate($('#plate')); return; }
  if (d.gtab) { guideTab = d.gtab; render(); return; }
  if (d.course) { switchCourse(d.course); return; }
  if (d.goal) { S.goal = +d.goal; save(); render(); return; }
  if (d.set) { const v = d.val; S.set[d.set] = isNaN(+v) ? v : +v; save(); render(); if (d.set === 'rate') say(pick(M().hi)[0]); return; }
  if (d.sopt !== undefined && LS && LS.speed) { speedAnswer(+d.sopt); return; }
  if (d.opt !== undefined && LS && LS.state === 'ask') { LS.sel = +d.opt; $$('#lbody [data-opt]').forEach((bt, i) => bt.classList.toggle('sel', i === LS.sel)); ready(true); SFX.tap(); const o = LS.cur.opts[LS.sel]; if (LS.cur.optSay) say(typeof o === 'string' ? o : o.text); if (LS.cur.cloze) $('#gap').textContent = typeof o === 'string' ? o : o.text; return; }
  if (d.acc !== undefined) { const tb = LS && LS.cur && LS.cur.t === 'table' ? LS.focusIn : $('#tbox'); if (tb && !tb.readOnly) { const s = tb.selectionStart ?? tb.value.length, en = tb.selectionEnd ?? s; tb.value = tb.value.slice(0, s) + d.acc + tb.value.slice(en); tb.focus(); tb.selectionStart = tb.selectionEnd = s + d.acc.length; tb.dispatchEvent(new Event('input')); } return; }
  if (d.tile !== undefined && LS && LS.state === 'ask') { const i = +d.tile; if (t.closest('#tbank')) { LS.sel.push(i); t.classList.add('ghost'); const nb = document.createElement('button'); nb.className = 'tile pop-in'; nb.dataset.tile = i; nb.textContent = LS.cur.bank[i]; $('#tline').appendChild(nb); if (LS.cur.lang === 'fr') say(LS.cur.bank[i]); } else { LS.sel.splice(LS.sel.indexOf(i), 1); t.remove(); const g = $('#tbank [data-tile="' + i + '"]'); if (g) g.classList.remove('ghost'); } SFX.tap(); ready(LS.sel.length > 0); return; }
  if ((d.pl !== undefined || d.pr !== undefined) && LS && LS.cur.t === 'pairs') { pairTap(t); return; }
  if (t.id === 'micBtn') { micGo(); return; }
  const a = d.act; if (!a) return;
  if (a === 'check') check();
  else if (a === 'next') { if (LS.state === 'ask' && LS.cur.t !== 'intro' && LS.cur.t !== 'note') return; if (LS.cur.t === 'intro') { touchWord(LS.cur.w.id, true); LS.step++; } if (LS.cur.t === 'note') LS.step++; next(); }
  else if (a === 'skip') { const c = LS.cur; resolve(false, esc(c.answers ? c.answers[0] : c.answer ? c.answer.join(' ') : c.rows ? c.rows.map(r => r.answers[0]).join(' · ') : c.ans)); }
  else if (a === 'bksp') { const tb = LS && LS.cur && LS.cur.t === 'table' ? LS.focusIn : $('#tbox'); if (tb && !tb.readOnly) { tb.value = tb.value.slice(0, -1); tb.focus(); tb.dispatchEvent(new Event('input')); } }
  else if (a === 'noaudio') { S.offL = Date.now() + 15 * 60e3; save(); toast('mute', 'Sin escucha por 15 minutos'); LS.queue = LS.queue.filter(x => !x.listen); LS.total = LS.step + LS.queue.length; next(); }
  else if (a === 'nomic') { S.offS = Date.now() + 15 * 60e3; save(); toast('micoff', 'Sin pronunciación por 15 minutos'); LS.queue = LS.queue.filter(x => x.t !== 'speak'); LS.total = LS.step + LS.queue.length; next(); }
  else if (a === 'selfok' || a === 'selfbad') { S.st.speak++; resolve(a === 'selfok', a === 'selfok' ? '' : esc(LS.cur.text)); }
  else if (a === 'quit') { if (LS && (LS.step > 0 || LS.speed)) modal('<h2>¿Salir de la lección?</h2><p>Perderás el progreso de esta lección.</p><div class="row-btn"><button class="btn ghost" data-act="closemodal">Seguir</button><button class="btn bad" data-act="forcequit">Salir</button></div>'); else closeLesson(); }
  else if (a === 'forcequit') { closeModal(); if (LS && LS.iv) clearInterval(LS.iv); closeLesson(); }
  else if (a === 'closemodal') closeModal();
  else if (a === 'close') closeLesson();
  else if (a === 'retry') { const c = LS.ctx; closeLesson(); startLesson(c.cert ? certLesson(c.lv) : c.type === 'jump' ? jumpLesson(c.u) : nodeLesson(c.u, c.ni)); }
  else if (a === 'done' || a === 'again') {
    if (LS.after && LS.after.length) { $('#lbody').innerHTML = LS.after.shift()(); SFX.match(); confetti(); LS.pendingAgain = LS.pendingAgain || a === 'again'; return; }
    const again = a === 'again' || LS.pendingAgain, c = LS.ctx; closeLesson();
    if (again && c.type === 'node') { const [u, i] = nd(c.u, c.ni) >= PER_NODE ? current() : [c.u, c.ni]; startLesson(nodeLesson(u, i)); }
  }
  else if (a === 'speedagain') { closeLesson(); startSpeed(); }
  else if (a === 'poke') poke(t);
  else if (a === 'readnote') { const u = course(S.cur).units[+t.dataset.u]; grisou((u.gt + '. ' + (u.note || '').replace(/\*\*/g, '').split('\n').filter(l => !l.startsWith('|')).map(l => l.replace(/^!/, 'Ojo: ')).join(' ')).slice(0, 900)); }
  else if (a === 'course') openCourses();
  else if (a === 'share') sharePlate(false);
  else if (a === 'download') sharePlate(true);
  else if (a === 'install') { if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; render(); }); } }
  else if (a === 'rename') askName();
  else if (a === 'export') modal('<h2>Respaldo</h2><p>Copia este texto y guárdalo (notas, correo, WhatsApp). Para restaurar, pégalo en «Restaurar respaldo».</p><textarea class="code" id="bk" readonly>' + esc(JSON.stringify(S)) + '</textarea><div class="row-btn"><button class="btn" data-act="copybk">Copiar</button><button class="btn ghost" data-act="closemodal">Cerrar</button></div>');
  else if (a === 'copybk') { const ta = $('#bk'); try { navigator.clipboard.writeText(ta.value).then(() => toast('clipboard', 'Respaldo copiado'), () => { ta.select(); toast('clipboard', 'Selecciona y copia el texto'); }); } catch (err) { ta.select(); } }
  else if (a === 'import') modal('<h2>Restaurar respaldo</h2><p>Pega aquí tu respaldo. Reemplazará el progreso de este navegador.</p><textarea class="code" id="bkin" placeholder="{&quot;v&quot;:2,…}"></textarea><p id="bkerr" class="err" hidden></p><div class="row-btn"><button class="btn" data-act="doimport">Restaurar</button><button class="btn ghost" data-act="closemodal">Cancelar</button></div>');
  else if (a === 'doimport') { try { const o = JSON.parse($('#bkin').value); if (!o || typeof o !== 'object' || !('xp' in o)) throw new Error('x'); S = migrate(o); save(); closeModal(); setFavicon(); render(); toast('checkc', 'Progreso restaurado'); } catch (err) { const p = $('#bkerr'); p.hidden = false; p.textContent = 'Ese texto no es un respaldo válido de Grey~Spell. Copia el respaldo completo, desde { hasta }.'; } }
  else if (a === 'reset') modal('<h2>¿Borrar todo tu progreso?</h2><p>Se eliminan racha, XP, palabras, logros y accesorios de los 4 idiomas en este navegador. No se puede deshacer.</p><div class="row-btn"><button class="btn ghost" data-act="closemodal">Cancelar</button><button class="btn bad" data-act="doreset">Borrar todo</button></div>');
  else if (a === 'doreset') { S = fresh(); save(); closeModal(); setFavicon(); render(); onboarding(); }
  else if (a === 'startnode') { const [u, i] = t.dataset.n.split(',').map(Number); startLesson(nodeLesson(u, i)); }
  else if (a === 'startjump') startLesson(jumpLesson(+t.dataset.u));
  else if (a === 'startcert') startLesson(certLesson(t.dataset.lv));
  else if (a === 'onbname') { S.name = (($('#nm').value || '').trim().slice(0, 24)) || 'Estudiante'; save(); grisou('¡Mucho gusto, ' + S.name + '! ¿Qué idioma quieres aprender?'); onbCourse(); }
  else if (a === 'onbcourse') { S.cur = t.dataset.c; CS(); save(); setFavicon(); applyTheme(); grisou('¡Hola! Yo soy ' + PET() + '. ¡Vamos a aprender ' + M().adj + '!', pick(M().hi)[0]); onbGoal(); }
  else if (a === 'onbgoal') { S.goal = +t.dataset.v; save(); onbLevel(); }
  else if (a === 'onbzero') { S.onb = true; save(); closeModal(); render(); startLesson(nodeLesson(0, 0)); }
  else if (a === 'onbjump') { S.onb = true; save(); closeModal(); render(); startLesson(jumpLesson(+t.dataset.u)); }
  else if (a === 'savename') { const v = ($('#nm').value || '').trim().slice(0, 24); if (v) S.name = v; save(); closeModal(); render(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#modal').hidden) { closeModal(); return; }
  if (!LS || $('#lesson').hidden) return;
  if (e.target && (e.target.id === 'tbox' || (e.target.closest && e.target.closest('.ctable')))) return;
  if (LS.speed && /^[1-4]$/.test(e.key)) { speedAnswer(+e.key - 1); return; }
  if (/^[1-9]$/.test(e.key) && LS.state === 'ask') { const bt = $('#lbody [data-opt="' + (+e.key - 1) + '"]'); if (bt) bt.click(); }
  if (e.key === 'Enter') { const bt = $('#lfoot .f-btns .btn:not([disabled]):last-child'); if (bt) { e.preventDefault(); bt.click(); } }
});
document.addEventListener('change', e => { const k = e.target.dataset && e.target.dataset.sw; if (k) { S.set[k] = e.target.checked; save(); renderChips(); } });
window.addEventListener('hashchange', render);
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S.set.theme === 'auto') render(); }); } catch (e) { /* navegador viejo */ }

function pairTap(t) {
  const P = LS.sel, isL = t.dataset.pl !== undefined, idx = +(isL ? t.dataset.pl : t.dataset.pr);
  if (isL) { $$('#lbody [data-pl]').forEach(b => b.classList.remove('sel')); P.l = idx; t.classList.add('sel'); say(LS.cur.pairs[idx].fr); } else { $$('#lbody [data-pr]').forEach(b => b.classList.remove('sel')); P.r = idx; t.classList.add('sel'); }
  if (P.l == null || P.r == null) return;
  const Lb = $('#lbody [data-pl="' + P.l + '"]'), Rb = $('#lbody [data-pr="' + P.r + '"]');
  if (P.l === P.r) { Lb.className = Rb.className = 'opt gone'; SFX.match(); P.left--; touchWord(LS.cur.pairs[P.l].id, true); }
  else { P.miss++; [Lb, Rb].forEach(b => { b.classList.remove('sel'); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 320); }); SFX.bad(); }
  P.l = P.r = null;
  if (P.left === 0) { const ok = P.miss <= 2; LS.state = ok ? 'ok' : 'bad'; LS.graded++; S.st.ex++; CS().ex++; LS.step++; if (ok) { LS.ok++; S.st.ok++; CS().ok++; LS.combo++; LS.maxCombo = Math.max(LS.maxCombo, LS.combo); } else LS.combo = 0; progress(); foot(ok ? 'ok' : 'bad', { msg: ok ? '' : 'Tuviste ' + P.miss + ' confusiones.' }); save(); }
}
let recog = null;
function micGo() {
  const it = LS.cur, btn = $('#micBtn'), msg = $('#micMsg');
  if (!SR) { say(it.text); return; }
  if (recog) { try { recog.stop(); } catch (e) { /* nada */ } return; }
  try {
    recog = new SR(); recog.lang = M().voice; recog.interimResults = false; recog.maxAlternatives = 3;
    btn.classList.add('rec'); msg.textContent = 'Escuchando… lee la frase.';
    recog.onresult = ev => { const alts = [...ev.results[0]].map(x => x.transcript); const best = Math.max(...alts.map(x => speechSim(x, it.text))); S.st.speak++; recog = null; btn.classList.remove('rec'); if (best >= 0.7) resolve(true, 'Entendí: «' + esc(alts[0]) + '»'); else msg.textContent = 'Entendí: «' + alts[0] + '». Inténtalo otra vez o márcalo tú.'; };
    recog.onerror = ev => { recog = null; btn.classList.remove('rec'); msg.textContent = ev.error === 'not-allowed' || ev.error === 'service-not-allowed' ? 'El micrófono no está disponible aquí. Repite en voz alta y márcalo tú.' : 'No te escuché bien. Intenta de nuevo o márcalo tú.'; };
    recog.onend = () => { if (recog) { recog = null; btn.classList.remove('rec'); } };
    recog.start();
  } catch (err) { recog = null; btn.classList.remove('rec'); msg.textContent = 'El micrófono no está disponible. Repite en voz alta y márcalo tú.'; }
}

/* ---- nodos, salto, idiomas, tienda ---- */
function openNode(u, i) {
  const node = NODES[i], unit = CD().units[u], done = nd(u, i), ok = nodeAvail(u, i), lvl = Math.floor(done / PER_LEVEL);
  if (!ok) { modal('<div class="eyebrow">Unidad ' + (u + 1) + '</div><h2>Bloqueado</h2><p>Completa el nivel 1 del paso anterior para abrir «' + esc(node.n) + '».</p>' + (!unitAvail(u) ? '<button class="btn block" data-jump="' + u + '">Hacer prueba para saltar aquí</button><div class="gap10"></div>' : '') + '<button class="btn ghost block" data-act="closemodal">Entendido</button>'); return; }
  const full = done >= PER_NODE;
  const desc = { vocab: 'Palabras nuevas con imágenes, audio, parejas y escritura.', frases: 'Construye y traduce frases reales.', gram: unit.gt + '. Empieza con una guía breve.', escucha: 'Dictados, comprensión auditiva y fonética.', habla: 'Lee en voz alta; Grisou te escucha.', lectura: 'Lee textos breves y demuestra que entiendes.', cultura: 'Trampas para hispanohablantes, costumbres y expresiones.', repaso: 'Toda la unidad más repaso espaciado.', examen: '16 preguntas sin pistas y en modo riguroso. Necesitas 85 % para abrir la siguiente unidad.' }[node.k];
  modal('<div class="eyebrow">Unidad ' + (u + 1) + ' · ' + unit.lv + ' · ' + esc(unit.t) + '</div><h2>' + esc(node.k === 'gram' ? unit.gt : node.n) + '</h2><p>' + esc(desc) + '</p><div class="crowns left">' + Array.from({ length: LEVELS }, (_, k) => '<i class="' + (k < lvl ? 'on' : '') + '"></i>').join('') + '</div><p class="mono small">' + (full ? 'Nivel leyenda · ' + PER_NODE + '/' + PER_NODE : 'Nivel ' + Math.min(LEVELS, lvl + 1) + ' de ' + LEVELS + ' · Lección ' + (done + 1) + ' de ' + PER_NODE) + '</p><div class="row-btn">' + (node.k === 'gram' ? '<button class="btn ghost" data-guide="' + u + '">Ver guía</button>' : '') + '<button class="btn" data-act="startnode" data-n="' + u + ',' + i + '">' + (full ? 'Practicar' : done ? 'Continuar · +10 XP' : 'Empezar · +10 XP') + '</button></div>');
}
function openJump(u) { modal('<div class="eyebrow">Prueba de salto · ' + M().flag + '</div><h2>Saltar a la unidad ' + (u + 1) + '</h2><p>16 preguntas rigurosas de las unidades anteriores. Con 85 % desbloqueas «' + esc(CD().units[u].t) + '» y todo lo anterior.</p><div class="row-btn"><button class="btn ghost" data-act="closemodal">Ahora no</button><button class="btn" data-act="startjump" data-u="' + u + '">Empezar prueba</button></div>'); }
function openCourses() {
  modal('<h2>Tus idiomas</h2><p>Cada idioma tiene su propio camino de 48 unidades. La racha, el XP y los logros son compartidos.</p><div class="courses">' + CIDS.map(id => { const m = META[id], c = S.C[id], n = unitsDoneOf(id); return '<button class="course' + (S.cur === id ? ' on' : '') + '" data-course="' + id + '"><span class="cpet">' + mascot({ course: id, mood: 'happy', anim: S.cur === id ? 'hop' : 'idle', wear: {} }) + '</span><span class="cflag">' + m.flag + '</span><span class="cinfo"><b>' + m.name + '</b><small>' + (c && c.les ? levelOf(id) + ' · ' + n + '/48 unidades · ' + learned(id) + ' palabras' : 'Empieza desde cero') + '</small></span>' + (S.cur === id ? '<span class="ctag">Actual</span>' : '') + '</button>'; }).join('') + '</div>');
}
function switchCourse(id) { if (!META[id]) return; S.cur = id; CS(); save(); closeModal(); render.scrolled = null; setFavicon(); render(); const hi = pick(META[id].hi); toast(META[id].flag, 'Ahora estudias ' + META[id].adj, PET() + ' te acompaña'); grisou('¡Hola! Soy ' + PET() + '. ¡Vamos con el ' + META[id].adj + '!', hi[0]); }
function buy(id) {
  const it = SHOP.find(x => x[0] === id); if (!it || S.gems < it[4]) return;
  S.gems -= it[4];
  if (id === 'freeze') S.freezes = Math.min(3, S.freezes + 1); else if (id === 'boost') S.boost = Date.now() + 15 * 60e3;
  else { S.own[id] = 1; S.st.shop++; if (HATS.includes(id)) HATS.forEach(h => delete S.wear[h]); S.wear[id] = 1; }
  save(); SFX.match(); toast(['freeze', 'boost'].includes(id) ? it[1] : 'shop', 'Compraste: ' + it[2]); grisou('¡Buena compra!'); render(); checkAch();
}

/* ---- bienvenida ---- */
function askName() { modal('<h2>¿Cómo te llamas?</h2><input type="text" id="nm" maxlength="24" value="' + esc(S.name) + '" placeholder="Tu nombre"><div class="row-btn"><button class="btn" data-act="savename">Guardar</button></div>', () => setTimeout(() => $('#nm').focus(), 50)); }
function onboarding() { modal('<div class="onb-m">' + mascot({ mood: 'happy', anim: 'wave', wear: { beret: 1 } }) + '</div><h2 class="center">¡Hola! Soy Grisou</h2><p class="center">Te llevo de cero a dominar un idioma en 4 años: 48 unidades, una por mes, ~20 lecciones al día. Francés, portugués, sueco o ruso, todo explicado desde el español de México.</p><input type="text" id="nm" maxlength="24" placeholder="¿Cómo te llamas?" aria-label="Tu nombre"><button class="btn block" data-act="onbname">Continuar</button>', () => setTimeout(() => $('#nm').focus(), 80)); }
function onbCourse() { modal('<h2>¿Qué idioma quieres aprender?</h2><p>Puedes estudiar los cuatro; empieza con uno.</p><div class="courses">' + CIDS.map(id => '<button class="course" data-act="onbcourse" data-c="' + id + '"><span class="cpet">' + mascot({ course: id, mood: 'happy', anim: 'idle', wear: {} }) + '</span><span class="cflag">' + META[id].flag + '</span><span class="cinfo"><b>' + META[id].name + ' · con ' + THEME[id].pet + '</b><small>' + { fr: 'El idioma del arte, la diplomacia y 29 países.', pt: 'Brasil, Portugal y 260 millones de hablantes.', sv: 'Escandinavia, diseño, fika y lagom.', ru: 'Nuevo alfabeto, Tolstói y 11 husos horarios.' }[id] + '</small></span></button>').join('') + '</div>'); }
function onbGoal() { const G = [[5, 'Casual', '≈ 10 min al día'], [10, 'Regular', '≈ 20 min al día'], [20, 'Intenso', '≈ 40 min · el plan de 4 años'], [30, 'Bestia', '≈ 1 hora al día']]; modal('<h2>Tu meta diaria</h2><p>¿Cuántas lecciones al día? La puedes cambiar cuando quieras.</p><div class="choicegrid">' + G.map(([v, n, d]) => '<button class="opt" data-act="onbgoal" data-v="' + v + '"><b>' + v + ' · ' + n + '</b><small>' + d + '</small></button>').join('') + '</div>'); }
function onbLevel() { modal('<h2>¿Cuánto ' + L() + ' sabes?</h2><p>Si ya sabes algo, haz una prueba y salta a tu nivel.</p><div class="choicegrid one"><button class="opt" data-act="onbzero"><b>Empiezo de cero</b><small>Desde la primera palabra.</small></button><button class="opt" data-act="onbjump" data-u="8"><b>Sé lo básico → prueba A2</b><small>Salta a la unidad 9</small></button><button class="opt" data-act="onbjump" data-u="16"><b>Me defiendo → prueba B1</b><small>Salta a la unidad 17</small></button><button class="opt" data-act="onbjump" data-u="24"><b>Nivel intermedio → prueba B2</b><small>Salta a la unidad 25</small></button></div>'); }

/* ================= arranque ================= */
checkStreak(); CS(); setFavicon(); render(); checkAch(true);
if (!S.onb) onboarding();
if ('serviceWorker' in navigator && location.protocol === 'https:') window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { /* sin modo offline */ }));
window.GreySpell = { THEME, lvlInfo, quests, conj, frNum, course, nodeLesson, practiceLesson, certLesson, translit, grade, META, mascot, POSES };
})();

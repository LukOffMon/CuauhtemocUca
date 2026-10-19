#!/usr/bin/env python3
"""
Verifica el contenido matemático de la app:
  1) Cada derivada de la guía (a..r) contra sympy.
  2) Los problemas de aplicación 1-6 con aritmética exacta.
  3) Que las funciones JS del verificador numérico coincidan (node).
  4) Que TODAS las fórmulas LaTeX compilen en KaTeX (node).
Uso:  pip install sympy && python3 verify.py
"""
import json
import subprocess
import sys
from fractions import Fraction
from pathlib import Path

import sympy as sp
from sympy import Rational, exp, log, sin, cos, tan  # noqa: F401  (usados en eval)

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT / "src"))
import data_src  # noqa: E402

x = sp.symbols("x", positive=True)
ns = dict(x=x, Rational=Rational, exp=exp, log=log, sin=sin, cos=cos, tan=tan)
fails = 0


def check(cond, msg):
    global fails
    print(("  OK   " if cond else "  FAIL ") + msg)
    if not cond:
        fails += 1


print("== Derivadas (sympy) ==")
POINTS = [8.5, 9.3, 11.2]  # válidos para TODAS las funciones de la guía
for d in data_src.DERIVS:
    f = eval(d["sym_f"], ns)
    ans = eval(d["sym_ans"], ns)
    diff = sp.diff(f, x)
    ok = sp.simplify(diff - ans) == 0
    if not ok:  # respaldo numérico
        ok = all(abs(float((diff - ans).subs(x, p))) < 1e-8 * max(1, abs(float(diff.subs(x, p)))) for p in POINTS)
    check(ok, f"{d['label']}: d/dx = {sp.simplify(diff)}")

print("== Aplicaciones (aritmética exacta) ==")
F = Fraction
f1 = lambda t: -3 * t**3 - 5 * t + 8
s2 = lambda t: -4 * t**2 + 17 * t
check((f1(F(11, 2)) - f1(5)) / F(1, 2) == F(-253.25), "app1 = -253.25")
check((s2(3) - s2(1)) / 2 == 1, "app2 = 1")
check(-9 * 25 - 5 == -230, "app3 = -230")
check(-8 * 3 + 17 == -7, "app4 = -7")
z = lambda t: -7 * t**4 + 3 * t**3 + t**2 - 6 * t + 10
zp = lambda t: -28 * t**3 + 9 * t**2 + 2 * t - 6
m5, y5 = zp(2), z(2)
check((y5, m5, y5 - m5 * 2) == (-86, -190, 294), f"app5: z(2)={y5}, m={m5}, b={y5 - m5 * 2}")
w = lambda t: 5 * t**2 + 2 * t - 15
m6 = 10 * (-1) + 2
check((w(-1), m6, -12 - m6 * (-1)) == (-12, -8, -20), "app6: w(-1)=-12, m=-8, b=-20")
vals = {e["id"]: e["val"] for e in data_src.EXERCISES if e["group"] == "app"}
check(vals == {"app1": -253.25, "app2": 1.0, "app3": -230.0, "app4": -7.0, "app5": 294.0, "app6": -20.0},
      "valores `val` del verificador coinciden")
for q in data_src.APP_QUIZ:
    if q["kind"] == "num":
        errs = [v for v, _ in q["errs"]]
        check(q["correct"] not in errs, f"{q['exid']}: ningún error típico coincide con la respuesta correcta")

print("== Funciones JS y LaTeX (node) ==")
data = data_src.build_data()
payload = json.dumps(data, ensure_ascii=False)
js = r"""
const katex = require(process.argv[process.argv.length - 1]);
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
let bad = 0, n = 0;
function T(t){ n++; try{ katex.renderToString(t,{throwOnError:true,strict:'error'}); }catch(e){ bad++; console.log('  TEX FAIL:', t.slice(0,70), '->', e.message); } }
function R(s){ (s.match(/\$[^$]+\$/g)||[]).forEach(m=>T(m.slice(1,-1))); }
for (const e of data.exercises){
  T(e.statement); T(e.answer);
  e.steps.forEach(s=>{ if(s.tex) T(s.tex); if(s.note) R(s.note); });
  if (e.js_f){
    const f = eval(e.js_f), df = eval(e.js_df);
    for (const p of [e.x0, e.x0+0.37, e.x0+1.1]){
      const h=1e-5, num=(f(p+h)-f(p-h))/(2*h), an=df(p);
      if (!(Math.abs(num-an) <= 1e-4*Math.max(1,Math.abs(an)))) { bad++; console.log('  JS FAIL', e.id, p, num, an); }
    }
  }
}
data.hub.forEach(h=>{ T(h.glyph); R(h.summary); h.steps.forEach(([t,x])=>{T(t);R(x)}); h.pitfalls.forEach(R); });
data.cheat.forEach(c=>c.items.forEach(i=>{T(i.tex); if(i.note) R(i.note);}));
data.checklist.forEach(R);
data.quiz.forEach(q=>{ T(q.tex); R(q.text); if(q.kind==='mc'){ T(q.correct); q.wrong.forEach(w=>{T(w.tex);R(w.msg)}); } else q.errs.forEach(w=>R(w.msg)); });
console.log('  fórmulas comprobadas:', n, '| problemas:', bad);
process.exit(bad?1:0);
"""
katex_path = str(ROOT / "vendor" / "katex" / "katex.min.js")
r = subprocess.run(["node", "-e", js, katex_path], input=payload, capture_output=True, text=True)
print(r.stdout + r.stderr, end="")
check(r.returncode == 0, "JS numérico + LaTeX")

print("\nRESULTADO:", "TODO CORRECTO" if fails == 0 else f"{fails} FALLO(S)")
sys.exit(1 if fails else 0)

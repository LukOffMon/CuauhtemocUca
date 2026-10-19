# -*- coding: utf-8 -*-
"""
Fuente de verdad de TODO el contenido de la app (ejercicios, pasos, quiz, hub, formulario).
build.py lo convierte en JSON e lo incrusta en index.html.
verify.py comprueba con sympy que cada derivada sea correcta.

Convención: las cadenas LaTeX van en r'...' ; en textos normales, las fórmulas van entre $...$ .
"""


def S(t, tex=None, note=None, kind="tip"):
    """Un paso del procedimiento. kind: 'tip' (consejo) o 'warn' (atención)."""
    d = {"t": t}
    if tex:
        d["tex"] = tex
    if note:
        d["note"] = note
        d["kind"] = kind
    return d


# ---------------------------------------------------------------------------
# EJERCICIOS DE LA GUÍA (Repaso del 2do Parcial – Mtro. Juan Carlos García Soledad)
# ---------------------------------------------------------------------------
EXERCISES = []

# ---- Problemas de aplicación 1 a 6 ----------------------------------------
EXERCISES += [
    dict(
        id="app1", group="app", label="Aplicación 1", tag="Tasa de cambio promedio", rule="Tasa de cambio promedio",
        statement=r"f(x)=-3x^3-5x+8,\quad x\ \text{varía de } 5 \text{ a } 5.5",
        steps=[
            S("Fórmula general", r"\text{TCP}=\frac{f(x_2)-f(x_1)}{x_2-x_1}",
              "Es la pendiente de la recta secante entre los dos puntos."),
            S("Evalúa f(5)", r"f(5)=-3(5)^3-5(5)+8=-3(125)-25+8=-392",
              "Primero la potencia: $5^3=125$. Después multiplica por $-3$.", "warn"),
            S("Evalúa f(5.5)", r"\begin{aligned}f(5.5)&=-3(5.5)^3-5(5.5)+8\\&=-3(166.375)-27.5+8\\&=-518.625\end{aligned}",
              "Usa calculadora para $5.5^3 = 166.375$ y escribe cada resultado parcial."),
            S("Sustitución impecable", r"\text{TCP}=\frac{-518.625-(-392)}{5.5-5}=\frac{-126.625}{0.5}",
              "Atención: $-518.625-(-392)=-518.625+392=-126.625$. No olvides este signo.", "warn"),
            S("Simplificación final", r"\text{TCP}=-253.25",
              "La función decrece en promedio 253.25 unidades de $f$ por cada unidad de $x$."),
        ],
        answer=r"-253.25", val=-253.25, valLabel="Tu tasa de cambio promedio",
    ),
    dict(
        id="app2", group="app", label="Aplicación 2", tag="Velocidad promedio", rule="Velocidad promedio",
        statement=r"s(t)=-4t^2+17t,\quad t=1 \text{ a } t=3",
        steps=[
            S("Fórmula general", r"v_{\text{prom}}=\frac{s(t_2)-s(t_1)}{t_2-t_1}"),
            S("Evalúa s(1) y s(3)", r"\begin{aligned}s(1)&=-4(1)^2+17(1)=13\\s(3)&=-4(9)+17(3)=-36+51=15\end{aligned}",
              "Cuidado con $-4(3)^2$: el 3 se eleva al cuadrado ANTES de multiplicar por $-4$.", "warn"),
            S("Sustitución", r"v_{\text{prom}}=\frac{15-13}{3-1}=\frac{2}{2}"),
            S("Resultado", r"v_{\text{prom}}=1",
              "Unidades: si $s$ está en metros y $t$ en segundos, la respuesta es $1\\ \\text{m/s}$."),
        ],
        answer=r"1", val=1.0, valLabel="Tu velocidad promedio",
    ),
    dict(
        id="app3", group="app", label="Aplicación 3", tag="Tasa de cambio instantánea", rule="Tasa de cambio instantánea",
        statement=r"f(x)=-3x^3-5x+8\quad\text{en } x=5",
        steps=[
            S("Idea clave", r"\text{TCI en } x_0 = f'(x_0)",
              "Instantánea = derivada evaluada en el punto."),
            S("Deriva f(x)", r"f'(x)=-3(3)x^2-5=-9x^2-5",
              "La derivada de la constante $8$ es $0$.", "tip"),
            S("Evalúa en x = 5", r"f'(5)=-9(5)^2-5=-9(25)-5=-225-5",
              "$(5)^2=25$, no $10$. Es el error más común.", "warn"),
            S("Resultado", r"f'(5)=-230"),
        ],
        answer=r"-230", val=-230.0, valLabel="Tu tasa de cambio instantánea",
    ),
    dict(
        id="app4", group="app", label="Aplicación 4", tag="Velocidad instantánea", rule="Velocidad instantánea",
        statement=r"s(t)=-4t^2+17t\quad\text{en } t=3",
        steps=[
            S("Idea clave", r"v(t)=s'(t)"),
            S("Deriva s(t)", r"s'(t)=-4(2)t+17=-8t+17"),
            S("Evalúa en t = 3", r"v(3)=-8(3)+17=-24+17",
              "$-8\\cdot3=-24$: el signo negativo se conserva.", "warn"),
            S("Resultado", r"v(3)=-7",
              "Velocidad negativa: el cuerpo se mueve en el sentido contrario al positivo del eje."),
        ],
        answer=r"-7", val=-7.0, valLabel="Tu velocidad instantánea",
    ),
    dict(
        id="app5", group="app", label="Aplicación 5", tag="Recta tangente", rule="Recta tangente",
        statement=r"z(x)=-7x^4+3x^3+x^2-6x+10\quad\text{en } x=2",
        steps=[
            S("Fórmula general", r"y-y_0=m(x-x_0),\qquad m=f'(x_0),\ \ y_0=f(x_0)"),
            S("Punto de tangencia", r"z(2)=-7(16)+3(8)+4-12+10=-112+24+4-12+10=-86",
              "Punto: $(2,-86)$.", "tip"),
            S("Pendiente", r"z'(x)=-28x^3+9x^2+2x-6\ \Rightarrow\ z'(2)=-28(8)+9(4)+4-6=-190",
              "Revisa cada exponente: $-7x^4\\to-28x^3$.", "warn"),
            S("Sustitución impecable", r"y-(-86)=-190(x-2)\ \Rightarrow\ y+86=-190x+380",
              "$y-(-86)=y+86$. No olvides este signo."),
            S("Despeja y", r"y=-190x+294"),
        ],
        answer=r"y=-190x+294", val=294.0, valLabel="Tu ordenada al origen b (valor de y cuando x = 0)",
    ),
    dict(
        id="app6", group="app", label="Aplicación 6", tag="Recta tangente en un punto dado", rule="Recta tangente",
        statement=r"w(x)=5x^2+2x-15\quad\text{en } P(-1,-12)",
        steps=[
            S("Comprueba que P está en la curva", r"w(-1)=5(1)+2(-1)-15=5-2-15=-12\ \checkmark",
              "Si no coincidiera, tendrías que pedir aclaración: el punto de tangencia debe estar en la curva.", "tip"),
            S("Pendiente", r"w'(x)=10x+2\ \Rightarrow\ m=w'(-1)=10(-1)+2=-8"),
            S("Sustitución impecable", r"y-(-12)=-8\big(x-(-1)\big)\ \Rightarrow\ y+12=-8(x+1)",
              "Dos dobles signos: $y-(-12)$ y $x-(-1)$.", "warn"),
            S("Despeja y", r"y+12=-8x-8\ \Rightarrow\ y=-8x-20"),
        ],
        answer=r"y=-8x-20", val=-20.0, valLabel="Tu ordenada al origen b (valor de y cuando x = 0)",
    ),
]

# ---- Derivadas a(x) ... r(x) ----------------------------------------------
# sym_f / sym_ans -> sympy (x positivo) | js_f / js_df -> verificador numérico en el navegador
DERIVS = [
    dict(
        id="a", label="a(x)", tag="Potencias, exponentes negativos y fraccionarios", rule="Regla de la potencia",
        statement=r"a(x)=-7x^3+8x^2-5x+5-\frac{3}{x}+\frac{7}{x^2}+6\sqrt[3]{x^5}",
        steps=[
            S("Reescribe todo como potencias", r"a(x)=-7x^3+8x^2-5x+5-3x^{-1}+7x^{-2}+6x^{5/3}",
              "Recuerda convertir la raíz a exponente fraccionario: $\\sqrt[3]{x^5}=x^{5/3}$ y $\\frac{1}{x^n}=x^{-n}$.", "warn"),
            S("Fórmula general", r"\frac{d}{dx}\big(kx^n\big)=k\,n\,x^{n-1}",
              "La derivada de una constante ($+5$) es $0$."),
            S("Deriva término a término",
              r"a'(x)=-7(3)x^2+8(2)x-5+0-3(-1)x^{-2}+7(-2)x^{-3}+6\cdot\tfrac{5}{3}x^{2/3}",
              "Atención: no olvides este signo. $-3\\cdot(-1)=+3$ y $7\\cdot(-2)=-14$.", "warn"),
            S("Simplificación final", r"a'(x)=-21x^2+16x-5+3x^{-2}-14x^{-3}+10x^{2/3}",
              "$\\frac{5}{3}-1=\\frac{2}{3}$; y $6\\cdot\\frac{5}{3}=10$."),
        ],
        answer=r"-21x^2+16x-5+\frac{3}{x^2}-\frac{14}{x^3}+10\sqrt[3]{x^2}",
        sym_f="-7*x**3+8*x**2-5*x+5-3/x+7/x**2+6*x**Rational(5,3)",
        sym_ans="-21*x**2+16*x-5+3/x**2-14/x**3+10*x**Rational(2,3)",
        js_f="x=>-7*x**3+8*x**2-5*x+5-3/x+7/x**2+6*Math.cbrt(x)**5",
        js_df="x=>-21*x**2+16*x-5+3/x**2-14/x**3+10*Math.cbrt(x)**2", x0=2,
        wrong=[
            (r"-21x^2+16x-5-\frac{3}{x^2}+\frac{14}{x^3}+10\sqrt[3]{x^2}",
             "¡Cuidado con los signos! $(-3x^{-1})'=+3x^{-2}$ y $(7x^{-2})'=-14x^{-3}$: el exponente negativo cambia el signo."),
            (r"-21x^2+16x-5+\frac{3}{x^2}-\frac{14}{x^3}+10\sqrt[3]{x^5}",
             "¡Cuidado! Olvidaste restar 1 al exponente fraccionario: $\\frac{5}{3}-1=\\frac{2}{3}$, no $\\frac{5}{3}$."),
            (r"-21x^2+16x+\frac{3}{x^2}-\frac{14}{x^3}+10\sqrt[3]{x^2}",
             "Te faltó derivar $-5x$: su derivada es $-5$ (no desaparece; solo la constante $+5$ desaparece)."),
        ],
    ),
    dict(
        id="b", label="b(x)", tag="Cociente con denominador de un solo término", rule="Dividir primero / Regla del cociente",
        statement=r"b(x)=\frac{5x^4-9x^2-x+8}{x^3}",
        steps=[
            S("Divide cada término entre x³", r"b(x)=\frac{5x^4}{x^3}-\frac{9x^2}{x^3}-\frac{x}{x^3}+\frac{8}{x^3}=5x-9x^{-1}-x^{-2}+8x^{-3}",
              "Como el denominador es un solo término, dividir primero evita la regla del cociente.", "tip"),
            S("Fórmula general", r"\frac{d}{dx}\big(kx^n\big)=k\,n\,x^{n-1}"),
            S("Deriva", r"b'(x)=5-9(-1)x^{-2}-(-2)x^{-3}+8(-3)x^{-4}",
              "Atención: no olvides este signo. Dos negativos seguidos dan positivo.", "warn"),
            S("Simplificación final", r"b'(x)=5+9x^{-2}+2x^{-3}-24x^{-4}",
              "Si prefieres la regla del cociente debes llegar al mismo resultado después de simplificar."),
        ],
        answer=r"5+\frac{9}{x^2}+\frac{2}{x^3}-\frac{24}{x^4}",
        sym_f="(5*x**4-9*x**2-x+8)/x**3", sym_ans="5+9/x**2+2/x**3-24/x**4",
        js_f="x=>(5*x**4-9*x**2-x+8)/x**3", js_df="x=>5+9/x**2+2/x**3-24/x**4", x0=1,
        wrong=[
            (r"5-\frac{9}{x^2}-\frac{2}{x^3}+\frac{24}{x^4}",
             "¡Cuidado con los signos! $(-9x^{-1})'=+9x^{-2}$, $(-x^{-2})'=+2x^{-3}$ y $(8x^{-3})'=-24x^{-4}$."),
            (r"\frac{20x^3-18x-1}{3x^2}",
             "¡Cuidado! La derivada de un cociente NO es el cociente de las derivadas."),
            (r"5+\frac{9}{x^2}+\frac{2}{x^3}-\frac{24}{x^3}",
             "Al derivar $8x^{-3}$ el exponente baja a $-4$ ($-3-1=-4$), no se queda en $-3$."),
        ],
    ),
    dict(
        id="c", label="c(x)", tag="Regla del producto", rule="Regla del producto",
        statement=r"c(x)=(6-3x^3)(2x^2+7x-1)",
        steps=[
            S("Fórmula general", r"(uv)'=u'v+uv'"),
            S("Identificación de partes",
              r"u=6-3x^3,\quad v=2x^2+7x-1,\quad u'=-9x^2,\quad v'=4x+7"),
            S("Sustitución impecable", r"c'(x)=(-9x^2)(2x^2+7x-1)+(6-3x^3)(4x+7)"),
            S("Expande cada producto",
              r"\begin{aligned}(-9x^2)(2x^2+7x-1)&=-18x^4-63x^3+9x^2\\(6-3x^3)(4x+7)&=24x+42-12x^4-21x^3\end{aligned}",
              "Aquí se pierden puntos: $(-9x^2)(-1)=+9x^2$ y $(-3x^3)(7)=-21x^3$.", "warn"),
            S("Simplificación final (términos semejantes)", r"c'(x)=-30x^4-84x^3+9x^2+24x+42",
              "Ordena de mayor a menor grado: $-18x^4-12x^4=-30x^4$; $-63x^3-21x^3=-84x^3$."),
        ],
        answer=r"-30x^4-84x^3+9x^2+24x+42",
        sym_f="(6-3*x**3)*(2*x**2+7*x-1)", sym_ans="-30*x**4-84*x**3+9*x**2+24*x+42",
        js_f="x=>(6-3*x**3)*(2*x**2+7*x-1)", js_df="x=>-30*x**4-84*x**3+9*x**2+24*x+42", x0=1,
        wrong=[
            (r"(-9x^2)(4x+7)=-36x^3-63x^2",
             "¡Cuidado! La derivada de un producto NO es el producto de las derivadas. Usa $u'v+uv'$."),
            (r"-30x^4-84x^3-9x^2+24x+42",
             "Revisa el signo: $(-9x^2)(-1)=+9x^2$, no $-9x^2$."),
            (r"-30x^4-63x^3+9x^2+24x+42",
             "Te faltó un término al sumar: $-63x^3$ y $-21x^3$ son semejantes y dan $-84x^3$."),
        ],
    ),
    dict(
        id="d", label="d(x)", tag="Regla del producto", rule="Regla del producto",
        statement=r"d(x)=(5x^2+2x-9)(x+x^2)",
        steps=[
            S("Fórmula general", r"(uv)'=u'v+uv'"),
            S("Identificación de partes", r"u=5x^2+2x-9,\quad v=x+x^2,\quad u'=10x+2,\quad v'=1+2x"),
            S("Sustitución impecable", r"d'(x)=(10x+2)(x+x^2)+(5x^2+2x-9)(1+2x)"),
            S("Expande cada producto",
              r"\begin{aligned}(10x+2)(x+x^2)&=10x^3+12x^2+2x\\(5x^2+2x-9)(1+2x)&=10x^3+9x^2-16x-9\end{aligned}",
              "En el segundo: $2x\\cdot2x=4x^2$ se suma con $5x^2$; y $2x-18x=-16x$.", "warn"),
            S("Simplificación final", r"d'(x)=20x^3+21x^2-14x-9"),
        ],
        answer=r"20x^3+21x^2-14x-9",
        sym_f="(5*x**2+2*x-9)*(x+x**2)", sym_ans="20*x**3+21*x**2-14*x-9",
        js_f="x=>(5*x**2+2*x-9)*(x+x**2)", js_df="x=>20*x**3+21*x**2-14*x-9", x0=1,
        wrong=[
            (r"(10x+2)(1+2x)=20x^2+14x+2",
             "¡Cuidado! Multiplicaste las derivadas. La regla es $u'v+uv'$ (dos sumandos)."),
            (r"20x^3+21x^2-14x+9",
             "Revisa el signo del término constante: $(-9)(1)=-9$."),
            (r"10x^3+12x^2+2x",
             "Solo calculaste $u'v$. Falta el segundo sumando $uv'$."),
        ],
    ),
    dict(
        id="f", label="f(x)", tag="Regla del cociente", rule="Regla del cociente",
        statement=r"f(x)=\frac{5+x^2}{x^2-4}",
        steps=[
            S("Fórmula general", r"\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}",
              "El orden importa: arriba-derivado · abajo MENOS arriba · abajo-derivado.", "warn"),
            S("Identificación de partes", r"u=5+x^2,\quad v=x^2-4,\quad u'=2x,\quad v'=2x"),
            S("Sustitución impecable", r"f'(x)=\frac{2x(x^2-4)-(5+x^2)(2x)}{(x^2-4)^2}"),
            S("Expande el numerador", r"2x^3-8x-10x-2x^3=-18x",
              "Atención: el signo $-$ delante de $(5+x^2)(2x)$ afecta a los DOS términos.", "warn"),
            S("Simplificación final", r"f'(x)=-\frac{18x}{(x^2-4)^2}",
              "No expandas el denominador; déjalo como $(x^2-4)^2$.", "tip"),
        ],
        answer=r"-\frac{18x}{(x^2-4)^2}",
        sym_f="(5+x**2)/(x**2-4)", sym_ans="-18*x/(x**2-4)**2",
        js_f="x=>(5+x**2)/(x**2-4)", js_df="x=>-18*x/(x**2-4)**2", x0=1,
        wrong=[
            (r"\frac{18x}{(x^2-4)^2}",
             "Invertiste el orden de la resta. El numerador es $u'v-uv'$, en ese orden."),
            (r"\frac{2x}{2x}=1",
             "¡Cuidado! La derivada de un cociente NO es la derivada de arriba entre la derivada de abajo."),
            (r"-\frac{18x}{x^2-4}",
             "Olvidaste elevar al cuadrado el denominador: es $v^2=(x^2-4)^2$."),
        ],
    ),
    dict(
        id="g", label="g(x)", tag="Regla del cociente", rule="Regla del cociente",
        statement=r"g(x)=\frac{9-x}{8-x^2}",
        steps=[
            S("Fórmula general", r"\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}"),
            S("Identificación de partes", r"u=9-x,\quad v=8-x^2,\quad u'=-1,\quad v'=-2x"),
            S("Sustitución impecable", r"g'(x)=\frac{(-1)(8-x^2)-(9-x)(-2x)}{(8-x^2)^2}"),
            S("Expande el numerador",
              r"\begin{aligned}(-1)(8-x^2)&=-8+x^2\\-(9-x)(-2x)&=+18x-2x^2\end{aligned}",
              "Atención: no olvides este signo. Menos por menos: $-(9-x)(-2x)=+(9-x)(2x)=18x-2x^2$.", "warn"),
            S("Simplificación final", r"g'(x)=\frac{-x^2+18x-8}{(8-x^2)^2}",
              "$-8+x^2+18x-2x^2=-x^2+18x-8$."),
        ],
        answer=r"\frac{-x^2+18x-8}{(8-x^2)^2}",
        sym_f="(9-x)/(8-x**2)", sym_ans="(-x**2+18*x-8)/(8-x**2)**2",
        js_f="x=>(9-x)/(8-x**2)", js_df="x=>(-(x**2)+18*x-8)/(8-x**2)**2", x0=1,
        wrong=[
            (r"\frac{x^2-18x+8}{(8-x^2)^2}",
             "Invertiste el orden de la resta. Es $u'v-uv'$, no $uv'-u'v$."),
            (r"\frac{-x^2-18x-8}{(8-x^2)^2}",
             "Cuidado al restar un producto negativo: $-(9-x)(-2x)=+18x-2x^2$, no $-18x+\\ldots$"),
            (r"\frac{-x^2+18x-8}{8-x^2}",
             "Olvidaste elevar al cuadrado el denominador: $v^2=(8-x^2)^2$."),
        ],
    ),
    dict(
        id="h", label="h(x)", tag="Regla de la cadena con exponente racional", rule="Regla de la cadena",
        statement=r"h(x)=5\left(x^2-7x\right)^{4/3}",
        steps=[
            S("Fórmula general (cadena + potencia)", r"\frac{d}{dx}\big[u^n\big]=n\,u^{n-1}\cdot u'"),
            S("Identificación de partes", r"u=x^2-7x,\qquad n=\tfrac{4}{3},\qquad u'=2x-7"),
            S("Sustitución impecable", r"h'(x)=5\cdot\frac{4}{3}\left(x^2-7x\right)^{1/3}(2x-7)",
              "$\\frac{4}{3}-1=\\frac{1}{3}$. La derivada interna $u'$ NO se puede olvidar.", "warn"),
            S("Simplificación final", r"h'(x)=\frac{20}{3}(2x-7)\sqrt[3]{x^2-7x}",
              "Un exponente $\\frac{1}{3}$ es una raíz cúbica."),
        ],
        answer=r"\frac{20}{3}(2x-7)\sqrt[3]{x^2-7x}",
        sym_f="5*(x**2-7*x)**Rational(4,3)", sym_ans="Rational(20,3)*(2*x-7)*(x**2-7*x)**Rational(1,3)",
        js_f="x=>5*Math.cbrt(x**2-7*x)**4", js_df="x=>(20/3)*(2*x-7)*Math.cbrt(x**2-7*x)", x0=8,
        wrong=[
            (r"\frac{20}{3}\sqrt[3]{x^2-7x}",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $u'=2x-7$ (Regla de la Cadena)."),
            (r"\frac{20}{3}(2x-7)\left(x^2-7x\right)^{4/3}",
             "El exponente debe bajar: $\\frac{4}{3}-1=\\frac{1}{3}$, no se queda en $\\frac{4}{3}$."),
            (r"\frac{5}{3}(2x-7)\sqrt[3]{x^2-7x}",
             "Revisa el coeficiente: $5\\cdot\\frac{4}{3}=\\frac{20}{3}$."),
        ],
    ),
    dict(
        id="i", label="i(x)", tag="Regla de la cadena con raíz cuarta", rule="Regla de la cadena",
        statement=r"i(x)=\frac{8}{9}\sqrt[4]{2x^9-5}",
        steps=[
            S("Reescribe la raíz como potencia", r"i(x)=\frac{8}{9}\left(2x^9-5\right)^{1/4}",
              "Recuerda convertir la raíz a exponente fraccionario.", "warn"),
            S("Identificación de partes", r"u=2x^9-5,\qquad n=\tfrac{1}{4},\qquad u'=18x^8"),
            S("Sustitución impecable", r"i'(x)=\frac{8}{9}\cdot\frac{1}{4}\left(2x^9-5\right)^{-3/4}\cdot18x^8",
              "$\\frac{1}{4}-1=-\\frac{3}{4}$ (exponente negativo)."),
            S("Simplificación final",
              r"\frac{8\cdot18}{9\cdot4}=4\ \Rightarrow\ i'(x)=\frac{4x^8}{\sqrt[4]{(2x^9-5)^3}}",
              "El exponente negativo manda la potencia al denominador."),
        ],
        answer=r"\frac{4x^8}{\sqrt[4]{(2x^9-5)^3}}",
        sym_f="Rational(8,9)*(2*x**9-5)**Rational(1,4)", sym_ans="4*x**8/(2*x**9-5)**Rational(3,4)",
        js_f="x=>(8/9)*Math.pow(2*x**9-5,0.25)", js_df="x=>4*x**8/Math.pow(2*x**9-5,0.75)", x0=2,
        wrong=[
            (r"\frac{2}{9\sqrt[4]{(2x^9-5)^3}}",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $18x^8$ (Regla de la Cadena)."),
            (r"\frac{4x^8}{\sqrt[4]{(2x^9-5)^5}}",
             "Al restar 1 al exponente: $\\frac{1}{4}-1=-\\frac{3}{4}$, no $-\\frac{5}{4}$."),
            (r"4x^8\sqrt[4]{(2x^9-5)^3}",
             "Un exponente negativo ($-\\frac{3}{4}$) manda la potencia al DENOMINADOR."),
        ],
    ),
    dict(
        id="j", label="j(x)", tag="Trigonométrica: coseno con cadena", rule="Trigonométricas",
        statement=r"j(x)=-4\cos\left(x^3-7\right)",
        steps=[
            S("Fórmula general", r"\frac{d}{dx}\cos u=-\sin u\cdot u'"),
            S("Identificación de partes", r"u=x^3-7,\qquad u'=3x^2"),
            S("Sustitución impecable", r"j'(x)=-4\cdot\big(-\sin(x^3-7)\big)\cdot3x^2",
              "Atención: no olvides este signo. Menos por menos da MÁS.", "warn"),
            S("Simplificación final", r"j'(x)=12x^2\sin\left(x^3-7\right)",
              "La función de adentro, $x^3-7$, se queda igual dentro del seno."),
        ],
        answer=r"12x^2\sin(x^3-7)",
        sym_f="-4*cos(x**3-7)", sym_ans="12*x**2*sin(x**3-7)",
        js_f="x=>-4*Math.cos(x**3-7)", js_df="x=>12*x**2*Math.sin(x**3-7)", x0=1,
        wrong=[
            (r"4\sin(x^3-7)",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $3x^2$ (Regla de la Cadena)."),
            (r"-12x^2\sin(x^3-7)",
             "Revisa el signo: la derivada de $\\cos$ es $-\\sin$, y $(-4)(-\\sin)=+4\\sin$."),
            (r"12x^2\cos(x^3-7)",
             "La derivada del coseno es $-\\sin u$; el coseno NO se conserva."),
        ],
    ),
    dict(
        id="k", label="k(x)", tag="Trigonométrica: tangente con cadena", rule="Trigonométricas",
        statement=r"k(x)=3\tan\left(2x^6+5x\right)",
        steps=[
            S("Fórmula general", r"\frac{d}{dx}\tan u=\sec^2u\cdot u'"),
            S("Identificación de partes", r"u=2x^6+5x,\qquad u'=12x^5+5"),
            S("Sustitución impecable", r"k'(x)=3\sec^2\left(2x^6+5x\right)\left(12x^5+5\right)"),
            S("Simplificación final", r"k'(x)=\left(36x^5+15\right)\sec^2\left(2x^6+5x\right)",
              "Distribuye el $3$: $3\\cdot12x^5=36x^5$ y $3\\cdot5=15$. Además $\\sec^2(u)$ significa $(\\sec u)^2$.", "warn"),
        ],
        answer=r"(36x^5+15)\sec^2(2x^6+5x)",
        sym_f="3*tan(2*x**6+5*x)", sym_ans="(36*x**5+15)/cos(2*x**6+5*x)**2",
        js_f="x=>3*Math.tan(2*x**6+5*x)", js_df="x=>(36*x**5+15)/Math.cos(2*x**6+5*x)**2", x0=0.3,
        wrong=[
            (r"3\sec^2(2x^6+5x)",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $12x^5+5$ (Regla de la Cadena)."),
            (r"(36x^5+15)\sec(2x^6+5x)",
             "La derivada de $\\tan u$ es $\\sec^2 u$ (al cuadrado), no $\\sec u$."),
            (r"(12x^5+5)\sec^2(2x^6+5x)",
             "Olvidaste el coeficiente $3$ de la función original."),
        ],
    ),
    dict(
        id="l", label="l(x)", tag="Producto: exponencial por seno", rule="Regla del producto",
        statement=r"l(x)=e^x\sin(x)",
        steps=[
            S("Fórmula general", r"(uv)'=u'v+uv'"),
            S("Identificación de partes", r"u=e^x,\quad v=\sin x,\quad u'=e^x,\quad v'=\cos x"),
            S("Sustitución impecable", r"l'(x)=e^x\sin x+e^x\cos x",
              "La derivada de $e^x$ es ella misma; no uses la regla de la potencia en $e^x$.", "warn"),
            S("Simplificación final", r"l'(x)=e^x\left(\sin x+\cos x\right)",
              "Factoriza $e^x$ como factor común."),
        ],
        answer=r"e^x(\sin x+\cos x)",
        sym_f="exp(x)*sin(x)", sym_ans="exp(x)*(sin(x)+cos(x))",
        js_f="x=>Math.exp(x)*Math.sin(x)", js_df="x=>Math.exp(x)*(Math.sin(x)+Math.cos(x))", x0=1,
        wrong=[
            (r"e^x\cos x",
             "¡Cuidado! Regla del producto: $u'v+uv'$. Te faltó el sumando $e^x\\sin x$."),
            (r"e^x(\sin x-\cos x)",
             "Revisa el signo: la derivada de $\\sin x$ es $+\\cos x$."),
            (r"xe^{x-1}\sin x+e^x\cos x",
             "La derivada de $e^x$ es $e^x$. No se usa la regla de la potencia con la exponencial."),
        ],
    ),
    dict(
        id="m", label="m(x)", tag="Producto: potencia por logaritmo base 4", rule="Exponenciales y logarítmicas",
        statement=r"m(x)=7x^3\log_4 x",
        steps=[
            S("Fórmula general", r"(uv)'=u'v+uv',\qquad \frac{d}{dx}\log_a x=\frac{1}{x\ln a}"),
            S("Identificación de partes", r"u=7x^3,\quad v=\log_4x,\quad u'=21x^2,\quad v'=\frac{1}{x\ln4}"),
            S("Sustitución impecable", r"m'(x)=21x^2\log_4x+7x^3\cdot\frac{1}{x\ln4}",
              "$\\ln 4$ queda en el DENOMINADOR.", "warn"),
            S("Simplificación final", r"m'(x)=21x^2\log_4x+\frac{7x^2}{\ln4}",
              "$x^3\\cdot\\frac{1}{x}=x^2$."),
        ],
        answer=r"21x^2\log_4x+\frac{7x^2}{\ln4}",
        sym_f="7*x**3*log(x)/log(4)", sym_ans="21*x**2*log(x)/log(4)+7*x**2/log(4)",
        js_f="x=>7*x**3*Math.log(x)/Math.log(4)", js_df="x=>21*x**2*Math.log(x)/Math.log(4)+7*x**2/Math.log(4)", x0=2,
        wrong=[
            (r"21x^2\log_4x+7x^2\ln4",
             "En $(\\log_a x)'=\\frac{1}{x\\ln a}$, el $\\ln a$ va dividiendo (denominador)."),
            (r"\frac{21x}{\ln4}",
             "¡Cuidado! Multiplicaste las derivadas. La regla del producto es $u'v+uv'$."),
            (r"21x^2\log_4x+\frac{7x^3}{\ln4}",
             "Olvidaste el $x$ de $\\frac{1}{x\\ln4}$: $x^3\\cdot\\frac{1}{x}=x^2$."),
        ],
    ),
    dict(
        id="n", label="n(x)", tag="Cociente: logaritmo natural entre potencia", rule="Regla del cociente",
        statement=r"n(x)=\frac{\ln x}{x^3}",
        steps=[
            S("Fórmula general", r"\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}"),
            S("Identificación de partes", r"u=\ln x,\quad v=x^3,\quad u'=\frac{1}{x},\quad v'=3x^2"),
            S("Sustitución impecable", r"n'(x)=\frac{\frac{1}{x}\cdot x^3-\ln x\cdot3x^2}{(x^3)^2}=\frac{x^2-3x^2\ln x}{x^6}"),
            S("Simplificación final", r"n'(x)=\frac{x^2(1-3\ln x)}{x^6}=\frac{1-3\ln x}{x^4}",
              "Factoriza $x^2$ en el numerador y cancela con $x^6$: queda $x^4$.", "warn"),
        ],
        answer=r"\frac{1-3\ln x}{x^4}",
        sym_f="log(x)/x**3", sym_ans="(1-3*log(x))/x**4",
        js_f="x=>Math.log(x)/x**3", js_df="x=>(1-3*Math.log(x))/x**4", x0=2,
        wrong=[
            (r"\frac{1+3\ln x}{x^4}",
             "Revisa el signo: el segundo término se RESTA ($u'v-uv'$), así que queda $-3\\ln x$."),
            (r"\frac{1-3\ln x}{x^6}",
             "Falta simplificar: $\\frac{x^2(1-3\\ln x)}{x^6}=\\frac{1-3\\ln x}{x^4}$."),
            (r"\frac{1}{3x^3}",
             "¡Cuidado! La derivada de un cociente NO es el cociente de las derivadas."),
        ],
    ),
    dict(
        id="p", label="p(x)", tag="Exponencial con cadena", rule="Exponenciales y logarítmicas",
        statement=r"p(x)=11e^{x^3-4}",
        steps=[
            S("Fórmula general", r"\frac{d}{dx}e^u=e^u\cdot u'"),
            S("Identificación de partes", r"u=x^3-4,\qquad u'=3x^2"),
            S("Sustitución impecable", r"p'(x)=11\,e^{x^3-4}\cdot3x^2",
              "El exponente de $e$ se queda igual; solo se multiplica por $u'$.", "warn"),
            S("Simplificación final", r"p'(x)=33x^2e^{x^3-4}"),
        ],
        answer=r"33x^2e^{x^3-4}",
        sym_f="11*exp(x**3-4)", sym_ans="33*x**2*exp(x**3-4)",
        js_f="x=>11*Math.exp(x**3-4)", js_df="x=>33*x**2*Math.exp(x**3-4)", x0=1,
        wrong=[
            (r"11e^{x^3-4}",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $3x^2$ (Regla de la Cadena)."),
            (r"33x^2e^{3x^2}",
             "No derives el exponente de $e$ dentro de la exponencial: solo multiplica por $u'$."),
            (r"11(x^3-4)e^{x^3-5}",
             "$e^u$ NO se deriva con la regla de la potencia."),
        ],
    ),
    dict(
        id="q", label="q(x)", tag="Logaritmo natural con cadena", rule="Exponenciales y logarítmicas",
        statement=r"q(x)=\ln\left(x^3-5x+3\right)",
        steps=[
            S("Fórmula general", r"\frac{d}{dx}\ln u=\frac{u'}{u}"),
            S("Identificación de partes", r"u=x^3-5x+3,\qquad u'=3x^2-5"),
            S("Sustitución impecable", r"q'(x)=\frac{3x^2-5}{x^3-5x+3}",
              "El denominador es $u$ completo, incluyendo el $+3$.", "warn"),
            S("Simplificación final", r"q'(x)=\frac{3x^2-5}{x^3-5x+3}",
              "No hay nada más que simplificar: no cancelas términos sueltos de una suma."),
        ],
        answer=r"\frac{3x^2-5}{x^3-5x+3}",
        sym_f="log(x**3-5*x+3)", sym_ans="(3*x**2-5)/(x**3-5*x+3)",
        js_f="x=>Math.log(x**3-5*x+3)", js_df="x=>(3*x**2-5)/(x**3-5*x+3)", x0=3,
        wrong=[
            (r"\frac{1}{x^3-5x+3}",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $3x^2-5$ (Regla de la Cadena)."),
            (r"3x^2-5",
             "Falta dividir entre $u$: $(\\ln u)'=\\frac{u'}{u}$."),
            (r"\frac{3x^2-5}{x^3-5x}",
             "El denominador es $u$ completo: $x^3-5x+3$."),
        ],
    ),
    dict(
        id="r", label="r(x)", tag="Logaritmo base 5", rule="Exponenciales y logarítmicas",
        statement=r"r(x)=\log_5\left(x^3\right)",
        steps=[
            S("Propiedad del logaritmo (opcional, más rápido)", r"\log_5\left(x^3\right)=3\log_5x",
              "Propiedad: $\\log_a(x^n)=n\\log_a x$."),
            S("Fórmula general", r"\frac{d}{dx}\log_au=\frac{u'}{u\ln a}"),
            S("Sustitución impecable", r"r'(x)=3\cdot\frac{1}{x\ln5}\quad\left(\text{o}\ \frac{3x^2}{x^3\ln5}\right)",
              "$\\ln 5$ queda en el DENOMINADOR.", "warn"),
            S("Simplificación final", r"r'(x)=\frac{3}{x\ln5}",
              "Con $u=x^3$: $\\frac{3x^2}{x^3\\ln5}=\\frac{3}{x\\ln5}$. Mismo resultado."),
        ],
        answer=r"\frac{3}{x\ln5}",
        sym_f="log(x**3)/log(5)", sym_ans="3/(x*log(5))",
        js_f="x=>Math.log(x**3)/Math.log(5)", js_df="x=>3/(x*Math.log(5))", x0=2,
        wrong=[
            (r"\frac{3x^2}{x^3}",
             "Olvidaste dividir entre $\\ln 5$ (la base del logaritmo)."),
            (r"\frac{3x^2\ln5}{x^3}",
             "$\\ln a$ va en el denominador: $\\frac{u'}{u\\ln a}$."),
            (r"\frac{1}{x^3\ln5}",
             "¡Cuidado! Olvidaste multiplicar por la derivada de $u$: $3x^2$ (Regla de la Cadena)."),
        ],
    ),
]

for d in DERIVS:
    d["group"] = "der"
    d["kindEx"] = "der"
EXERCISES += DERIVS

# ---------------------------------------------------------------------------
# QUIZ - preguntas de las aplicaciones (las derivadas se generan desde DERIVS)
# 'mc' = opción múltiple | 'num' = respuesta numérica
# ---------------------------------------------------------------------------
APP_QUIZ = [
    dict(exid="app1", kind="num", text="Obtén la tasa de cambio promedio de:",
         tex=r"f(x)=-3x^3-5x+8\ \ \text{cuando } x \text{ varía de } 5 \text{ a } 5.5",
         correct=-253.25,
         errs=[(-126.625, "¡Cuidado! Olvidaste dividir entre $\\Delta x = 5.5-5 = 0.5$."),
               (253.25, "Revisa el signo: $f(5.5)-f(5)$ es negativo."),
               (-910.625, "Al restar un negativo: $-518.625-(-392)=-126.625$, no $-910.625$.")]),
    dict(exid="app2", kind="num", text="Calcula la velocidad promedio de:",
         tex=r"s(t)=-4t^2+17t\ \ \text{entre } t=1 \text{ y } t=3",
         correct=1,
         errs=[(2, "¡Cuidado! Olvidaste dividir entre $\\Delta t=3-1=2$."),
               (-1, "Revisa el orden de la resta: $s(3)-s(1)=15-13=+2$."),
               (14, "Calculaste el promedio de las posiciones $\\frac{13+15}{2}$. La velocidad promedio es $\\frac{\\Delta s}{\\Delta t}$.")]),
    dict(exid="app3", kind="num", text="¿Cuál es la tasa de cambio instantánea de:",
         tex=r"f(x)=-3x^3-5x+8\ \ \text{en } x=5\,?",
         correct=-230,
         errs=[(-392, "Evaluaste $f(5)$, pero la tasa instantánea es $f'(5)$."),
               (-50, "$(5)^2=25$, no $5$: $f'(5)=-9(25)-5$."),
               (-1130, "Al derivar $-3x^3$ el exponente baja a $2$ y el coeficiente es $-9$.")]),
    dict(exid="app4", kind="num", text="Determina la velocidad instantánea en $t=3$ de:",
         tex=r"s(t)=-4t^2+17t",
         correct=-7,
         errs=[(41, "Revisa el signo: $-8\\cdot3=-24$, no $+24$."),
               (15, "Evaluaste la posición $s(3)$; la velocidad es $s'(3)$."),
               (-31, "No olvides el $+17$: $s'(t)=-8t+17$.")]),
    dict(exid="app5", kind="mc", text="Obtén la ecuación de la recta tangente a:",
         tex=r"z(x)=-7x^4+3x^3+x^2-6x+10\ \ \text{en } x=2",
         correct=r"y=-190x+294",
         wrong=[(r"y=-190x+380", "Te olvidaste de $y_0=z(2)=-86$: la fórmula es $y-y_0=m(x-x_0)$."),
                (r"y=-190x-86", "Usaste $y_0$ como ordenada al origen. Hay que despejar $y$ de $y+86=-190(x-2)$."),
                (r"y=-190x+466", "Error de signo: $y-(-86)=y+86$, por lo tanto $y=-190x+380-86$.")]),
    dict(exid="app6", kind="mc", text="Calcula la ecuación de la recta que toca a $w(x)=5x^2+2x-15$ en $P(-1,-12)$:",
         tex=r"w(x)=5x^2+2x-15,\quad P(-1,-12)",
         correct=r"y=-8x-20",
         wrong=[(r"y=-8x+4", "Error de signo: $y-(-12)=y+12$, no $y-12$."),
                (r"y=-8x-12", "Usaste $y_0=-12$ como ordenada al origen. Despeja: $y+12=-8(x+1)$."),
                (r"y=8x-4", "Evaluaste mal $w'(-1)$: $10(-1)+2=-8$, no $+8$.")]),
]

# ---------------------------------------------------------------------------
# MASTERY HUB - 9 estrategias, cada una con los 4 pasos
# ---------------------------------------------------------------------------
HUB_LABELS = ["Fórmula general", "Identificación de partes", "Sustitución impecable", "Simplificación algebraica final"]

HUB = [
    dict(id="promedio", glyph=r"\frac{\Delta y}{\Delta x}", title="Tasa de cambio promedio y velocidad promedio",
         summary="Pendiente de la recta secante entre dos puntos.",
         steps=[
             (r"\text{TCP}=\frac{f(x_2)-f(x_1)}{x_2-x_1}", "Para posición: $v_{prom}=\\frac{s(t_2)-s(t_1)}{t_2-t_1}$."),
             (r"x_1,\ x_2,\ f(x_1),\ f(x_2)", "Evalúa la función en cada extremo POR SEPARADO y con paréntesis."),
             (r"\frac{f(5.5)-f(5)}{5.5-5}=\frac{-518.625-(-392)}{0.5}", "Escribe la resta de negativos con paréntesis."),
             (r"\frac{-126.625}{0.5}=-253.25", "Divide al final. Si olvidas dividir entre $\\Delta x$, pierdes todo el punto.")],
         pitfalls=["Olvidar dividir entre $x_2-x_1$.", "Restar al revés ($f(x_1)-f(x_2)$ con denominador $x_2-x_1$).", "Mal cálculo de $a-(-b)$."],
         examples=["app1", "app2"]),
    dict(id="instantanea", glyph=r"f'(a)", title="Tasa de cambio y velocidad instantánea",
         summary="La derivada evaluada en un punto.",
         steps=[
             (r"\text{TCI}(x_0)=f'(x_0),\qquad v(t_0)=s'(t_0)", "Instantánea = derivada. Promedio = cociente de diferencias."),
             (r"f'(x)\ \text{con regla de la potencia},\quad x_0", "Deriva primero, evalúa después."),
             (r"f'(5)=-9(5)^2-5", "Sustituye con paréntesis: $(5)^2=25$."),
             (r"-225-5=-230", "Interpreta el signo: negativa = la función decrece / el cuerpo va hacia atrás.")],
         pitfalls=["Evaluar la función original en vez de la derivada.", "Evaluar antes de derivar.", "$(5)^2=10$ en lugar de $25$."],
         examples=["app3", "app4"]),
    dict(id="tangente", glyph=r"y=mx+b", title="Recta tangente",
         summary="Punto + pendiente = ecuación de la recta.",
         steps=[
             (r"y-y_0=m(x-x_0),\quad m=f'(x_0)", "Punto-pendiente. La pendiente SIEMPRE sale de la derivada."),
             (r"x_0,\quad y_0=f(x_0),\quad m=f'(x_0)", "Si te dan el punto $P$, comprueba que cumple $y_0=f(x_0)$."),
             (r"y-(-86)=-190(x-2)", "Dobles signos: $y-(-86)=y+86$."),
             (r"y=-190x+294", "Despeja $y$ y deja la forma $y=mx+b$.")],
         pitfalls=["Usar $f(x_0)$ como pendiente.", "Olvidar $y_0$.", "Errores de signo al despejar."],
         examples=["app5", "app6"]),
    dict(id="potencia", glyph=r"x^n", title="Regla de la potencia (con raíces y fracciones)",
         summary="Reescribe todo como potencias y deriva término a término.",
         steps=[
             (r"\frac{d}{dx}\big(kx^n\big)=k\,n\,x^{n-1}", "La derivada de una constante es $0$; la de $kx$ es $k$."),
             (r"\sqrt[n]{x^m}=x^{m/n},\qquad\frac{1}{x^n}=x^{-n}", "Convierte raíces y fracciones ANTES de derivar."),
             (r"\frac{d}{dx}\big(-3x^{-1}\big)=-3(-1)x^{-2}", "Multiplica coeficiente por exponente (con signo) y resta 1."),
             (r"=\frac{3}{x^2}", "Regresa a fracciones/raíces al final.")],
         pitfalls=["Signo del exponente negativo.", "No restar 1 a un exponente fraccionario.", "Derivar constantes como si fueran $x$."],
         examples=["a", "b"]),
    dict(id="producto", glyph=r"u\cdot v", title="Regla del producto",
         summary="Derivada del primero por el segundo, más el primero por la derivada del segundo.",
         steps=[
             (r"(uv)'=u'v+uv'", "Dos sumandos. No es $u'\\cdot v'$."),
             (r"u=6-3x^3,\ v=2x^2+7x-1,\ u'=-9x^2,\ v'=4x+7", "Escribe $u$, $v$, $u'$ y $v'$ por separado."),
             (r"(-9x^2)(2x^2+7x-1)+(6-3x^3)(4x+7)", "Sustituye todo entre paréntesis."),
             (r"-30x^4-84x^3+9x^2+24x+42", "Expande y reduce términos semejantes. Aquí la mayoría pierde puntos.")],
         pitfalls=["Multiplicar derivadas.", "Perder un término al expandir.", "Signos de $(-)(-)$."],
         examples=["c", "d", "l", "m"]),
    dict(id="cociente", glyph=r"\frac{u}{v}", title="Regla del cociente",
         summary="Abajo por derivada de arriba, MENOS arriba por derivada de abajo, todo entre abajo al cuadrado.",
         steps=[
             (r"\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}", "El orden de la resta importa."),
             (r"u=5+x^2,\ v=x^2-4,\ u'=2x,\ v'=2x", "Antes de sustituir, escribe las cuatro piezas."),
             (r"\frac{2x(x^2-4)-(5+x^2)(2x)}{(x^2-4)^2}", "Pon el segundo producto entre paréntesis para repartir el signo."),
             (r"-\frac{18x}{(x^2-4)^2}", "Simplifica el numerador; deja el denominador factorizado.")],
         pitfalls=["Cociente de derivadas.", "Invertir el orden de la resta.", "Olvidar elevar $v$ al cuadrado."],
         examples=["f", "g", "n", "b"]),
    dict(id="cadena", glyph=r"f(g(x))", title="Regla de la cadena con potencias y raíces",
         summary="Deriva por fuera, luego multiplica por la derivada de lo de adentro.",
         steps=[
             (r"\frac{d}{dx}\big[u^n\big]=n\,u^{n-1}\cdot u'", "Función compuesta = hay algo más complicado que $x$ dentro."),
             (r"u=x^2-7x,\quad n=\tfrac{4}{3},\quad u'=2x-7", "Identifica $u$ (lo de adentro) y calcula $u'$."),
             (r"5\cdot\frac{4}{3}\left(x^2-7x\right)^{1/3}(2x-7)", "Baja el exponente, réstale 1 y multiplica por $u'$."),
             (r"\frac{20}{3}(2x-7)\sqrt[3]{x^2-7x}", "Convierte el exponente fraccionario a raíz si se pide.")],
         pitfalls=["Olvidar $u'$.", "No restar 1 al exponente.", "Multiplicar mal los coeficientes."],
         examples=["h", "i"]),
    dict(id="trig", glyph=r"\sin u", title="Derivadas trigonométricas (con cadena)",
         summary="Derivada de la trigonométrica, función de adentro igual, por $u'$.",
         steps=[
             (r"(\sin u)'=\cos u\,u',\ (\cos u)'=-\sin u\,u',\ (\tan u)'=\sec^2u\,u'", "Memoriza estas tres: son las del examen."),
             (r"u=x^3-7,\qquad u'=3x^2", "La función de adentro NO cambia."),
             (r"-4\cdot\big(-\sin(x^3-7)\big)\cdot3x^2", "Cuida el signo del coseno."),
             (r"12x^2\sin(x^3-7)", "Menos por menos da más.")],
         pitfalls=["Olvidar el signo $-$ del coseno.", "Olvidar $u'$.", "Confundir $\\sec^2u$ con $\\sec u$."],
         examples=["j", "k"]),
    dict(id="explog", glyph=r"e^u,\ \ln u", title="Exponenciales y logarítmicas",
         summary="$e^u$ se queda igual; $\\ln u$ pasa a $u'/u$; con base $a$ aparece $\\ln a$ abajo.",
         steps=[
             (r"(e^u)'=e^uu',\quad(\ln u)'=\frac{u'}{u},\quad(\log_au)'=\frac{u'}{u\ln a}", "Con base $a$ el $\\ln a$ va en el denominador."),
             (r"u=x^3-5x+3,\qquad u'=3x^2-5", "Identifica $u$ y $u'$ antes de armar la respuesta."),
             (r"\frac{3x^2-5}{x^3-5x+3}", "El denominador es $u$ completo."),
             (r"\log_5(x^3)=3\log_5x\ \Rightarrow\ \frac{3}{x\ln5}", "Una propiedad de logaritmos a veces ahorra la cadena.")],
         pitfalls=["Derivar $e^u$ con la regla de la potencia.", "Poner $\\ln a$ arriba.", "Olvidar $u'$."],
         examples=["p", "q", "r", "m"]),
]

# ---------------------------------------------------------------------------
# CHEAT SHEET
# ---------------------------------------------------------------------------
CHEAT = [
    dict(cat="Reglas de derivación", items=[
        dict(n="Constante", tex=r"\frac{d}{dx}(k)=0"),
        dict(n="Potencia", tex=r"\frac{d}{dx}\big(x^n\big)=n\,x^{n-1}", note="Con coeficiente: $(kx^n)'=kn\\,x^{n-1}$."),
        dict(n="Suma y resta", tex=r"(f\pm g)'=f'\pm g'", note="Se deriva término a término."),
        dict(n="Producto", tex=r"(uv)'=u'v+uv'"),
        dict(n="Cociente", tex=r"\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}"),
        dict(n="Cadena", tex=r"\frac{d}{dx}f(g(x))=f'(g(x))\cdot g'(x)"),
        dict(n="Cadena con potencia", tex=r"\frac{d}{dx}\big[u^n\big]=n\,u^{n-1}\,u'"),
    ]),
    dict(cat="Trigonométricas", items=[
        dict(n="Seno", tex=r"(\sin u)'=\cos u\cdot u'"),
        dict(n="Coseno", tex=r"(\cos u)'=-\sin u\cdot u'", note="No olvides el signo menos."),
        dict(n="Tangente", tex=r"(\tan u)'=\sec^2u\cdot u'"),
        dict(n="Secante", tex=r"(\sec u)'=\sec u\tan u\cdot u'"),
        dict(n="Cosecante", tex=r"(\csc u)'=-\csc u\cot u\cdot u'"),
        dict(n="Cotangente", tex=r"(\cot u)'=-\csc^2u\cdot u'"),
    ]),
    dict(cat="Exponenciales y logarítmicas", items=[
        dict(n="Exponencial natural", tex=r"(e^u)'=e^u\cdot u'"),
        dict(n="Exponencial base a", tex=r"(a^u)'=a^u\ln a\cdot u'"),
        dict(n="Logaritmo natural", tex=r"(\ln u)'=\frac{u'}{u}"),
        dict(n="Logaritmo base a", tex=r"(\log_au)'=\frac{u'}{u\ln a}", note="El $\\ln a$ va en el denominador."),
    ]),
    dict(cat="Leyes de los exponentes", items=[
        dict(n="Producto de potencias", tex=r"x^a\cdot x^b=x^{a+b}"),
        dict(n="Cociente de potencias", tex=r"\frac{x^a}{x^b}=x^{a-b}"),
        dict(n="Potencia de potencia", tex=r"\left(x^a\right)^b=x^{ab}"),
        dict(n="Exponente negativo", tex=r"x^{-n}=\frac{1}{x^n}"),
        dict(n="Exponente fraccionario", tex=r"x^{m/n}=\sqrt[n]{x^m}", note="Ejemplo de la guía: $\\sqrt[3]{x^5}=x^{5/3}$."),
        dict(n="Exponente cero", tex=r"x^0=1\quad(x\neq0)"),
    ]),
    dict(cat="Propiedades de los logaritmos", items=[
        dict(n="Producto", tex=r"\log_a(xy)=\log_ax+\log_ay"),
        dict(n="Cociente", tex=r"\log_a\!\left(\frac{x}{y}\right)=\log_ax-\log_ay"),
        dict(n="Potencia", tex=r"\log_a(x^n)=n\log_ax", note="Útil en $r(x)=\\log_5(x^3)$."),
        dict(n="Cambio de base", tex=r"\log_ax=\frac{\ln x}{\ln a}"),
        dict(n="Valores clave", tex=r"\ln e=1,\quad\ln1=0,\quad\log_aa=1"),
    ]),
    dict(cat="Tasas de cambio y tangente", items=[
        dict(n="Tasa de cambio promedio", tex=r"\frac{f(x_2)-f(x_1)}{x_2-x_1}", note="Pendiente de la secante."),
        dict(n="Velocidad promedio", tex=r"v_{prom}=\frac{s(t_2)-s(t_1)}{t_2-t_1}"),
        dict(n="Tasa instantánea / velocidad", tex=r"f'(x_0),\qquad v(t)=s'(t)"),
        dict(n="Definición de derivada", tex=r"f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}"),
        dict(n="Recta tangente", tex=r"y-y_0=f'(x_0)\,(x-x_0),\quad y_0=f(x_0)"),
    ]),
    dict(cat="Álgebra que salva puntos", items=[
        dict(n="Resta de negativos", tex=r"a-(-b)=a+b"),
        dict(n="Signo repartido", tex=r"-(a+b)=-a-b"),
        dict(n="Factor común", tex=r"ax+ay=a(x+y)"),
        dict(n="Cancelar", tex=r"\frac{x^2(1-3\ln x)}{x^6}=\frac{1-3\ln x}{x^4}", note="Solo se cancelan FACTORES, no sumandos."),
    ]),
]

CHECKLIST = [
    "Reescribí raíces y fracciones como exponentes antes de derivar.",
    "Escribí $u$, $v$, $u'$ y $v'$ por separado.",
    "Apliqué la regla de la cadena en TODA función compuesta.",
    "Revisé los signos al restar productos y con exponentes negativos.",
    "Sustituí los valores con paréntesis.",
    "Simplifiqué: términos semejantes, factor común, denominador factorizado.",
    "Recta tangente: usé $y-y_0=m(x-x_0)$ con $y_0=f(x_0)$.",
    "Escribí unidades y interpreté el signo en velocidad y tasa de cambio.",
]


def build_quiz():
    """Arma la lista de preguntas del simulador a partir de EXERCISES/APP_QUIZ."""
    quiz = []
    for q in APP_QUIZ:
        item = dict(id="q_" + q["exid"], exid=q["exid"], kind=q["kind"], text=q["text"], tex=q["tex"])
        if q["kind"] == "num":
            item["correct"] = q["correct"]
            item["errs"] = [dict(val=v, msg=m) for v, m in q["errs"]]
        else:
            item["correct"] = q["correct"]
            item["wrong"] = [dict(tex=t, msg=m) for t, m in q["wrong"]]
        quiz.append(item)
    for d in DERIVS:
        quiz.append(dict(
            id="q_" + d["id"], exid=d["id"], kind="mc",
            text="Calcula la derivada:", tex=d["statement"],
            correct=d["answer"], wrong=[dict(tex=t, msg=m) for t, m in d["wrong"]],
            hint="Estrategia: " + d["rule"] + ".",
        ))
    return quiz


def build_data():
    return dict(exercises=EXERCISES, hub=HUB, hubLabels=HUB_LABELS, cheat=CHEAT, checklist=CHECKLIST, quiz=build_quiz())

# CALC//100 · Cálculo Diferencial (2.º parcial)

App web interactiva para preparar el examen de **Cálculo Diferencial** basada en la guía
*Repaso del 2do Parcial* del Mtro. Juan Carlos García Soledad. Todo el contenido (22 ejercicios) está
resuelto paso a paso y **verificado con álgebra simbólica (sympy)**.

**Funciona sin conexión**: `index.html` es un único archivo con HTML, CSS, JS, KaTeX y fuentes incrustados.
Ábrelo con doble clic, súbelo a GitHub Pages / Netlify / Vercel o compártelo por mensaje.

## Módulos

| Módulo | Qué hace |
|---|---|
| **Mastery Hub** | 9 estrategias (tasa promedio/instantánea, tangente, potencia, producto, cociente, cadena, trigonométricas, exp/log) con la rutina de 4 pasos: fórmula → partes → sustitución → simplificación. |
| **Solucionador y Verificador** | Aplicaciones 1-6 y derivadas a(x)–r(x) con pasos desplegables, notas de «Atención» y un verificador numérico de tu resultado. |
| **Simulador 100/100** | 22 preguntas de la guía (opción múltiple y numéricas). Modos: Entrenamiento, Bajo presión (60 s) y Aleatorio ∞. Detecta errores típicos con mensaje específico (p. ej. «Olvidaste multiplicar por la derivada de u»), puntos, racha, precisión y repaso de errores. Atajos: `1-4` / `A-D`, `Enter`. |
| **Formulario** | Reglas de derivación, trigonométricas, exp/log, leyes de exponentes, propiedades de logaritmos, álgebra clave, con buscador, filtros y lista de verificación. |

## Publicar en GitHub Pages

1. Sube todo el contenido de la carpeta al repositorio (`index.html` en la raíz).
2. *Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.
3. Tu app queda en `https://<usuario>.github.io/<repo>/`.

## Desarrollo

```
src/data_src.py   ← todo el contenido: ejercicios, pasos, distractores del quiz, formulario
src/app.js        ← lógica de la app (vanilla JS, sin framework)
src/styles.css    ← estilos (modo oscuro neón, responsivo)
src/template.html ← esqueleto del HTML
vendor/katex/     ← KaTeX (MIT) vendorizado para funcionar sin internet
build.py          ← genera index.html (un solo archivo)
verify.py         ← comprueba todas las derivadas con sympy + todas las fórmulas LaTeX + funciones JS
tests/smoke.js    ← prueba de punta a punta de todos los módulos (jsdom)
```

```bash
python3 build.py                                  # regenera index.html tras editar src/
pip install sympy && python3 verify.py            # verifica las matemáticas
npm install && npm test                           # prueba de interfaz (requiere Node 18+)
```

Para añadir un ejercicio: agrégalo en `src/data_src.py` (con `sym_f`/`sym_ans` para que `verify.py` lo valide),
corre `verify.py` y luego `build.py`.

## Licencias

KaTeX © Khan Academy y colaboradores, licencia MIT (`vendor/katex/LICENSE`).

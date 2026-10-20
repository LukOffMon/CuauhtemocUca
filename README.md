# CuauhtemocUca

## Mi Horario Escolar (v4)

App web de un solo archivo, sin servidor, que se usa directo desde GitHub Pages:
**https://lukoffmon.github.io/CuauhtemocUca/Mi%20Horario%20Escolar.html**

- `Mi Horario Escolar.html` — la app completa (horario, exámenes, tareas de Moodle/ALEKS, estudio, herramientas).
- `mi-horario-sw.js`, `mi-horario.webmanifest`, `mi-horario-icon*` — permiten instalarla como app y abrirla sin internet.

Los datos se guardan en el navegador de cada dispositivo. Para pasarlos a otro: Ajustes → *Pasar a otro dispositivo* (enlace o QR, opcionalmente con contraseña) o un respaldo `.json` (también cifrado).

Para actualizar el horario, edita los bloques `SEED_CLASSES`, `SEED_EXAMS`, `SEED_PERIODS` y `SEED_TASKS` al inicio del script: los cambios llegan solos a la app sin borrar lo que el alumno editó desde ella.

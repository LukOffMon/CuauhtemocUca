# CuauhtemocUca

## Mi Horario Escolar (v4)

App web de un solo archivo, sin servidor, que se usa directo desde GitHub Pages:
**https://lukoffmon.github.io/CuauhtemocUca/Mi%20Horario%20Escolar.html**

- `Mi Horario Escolar.html` — la app completa (horario, exámenes, tareas de Moodle/ALEKS, estudio, herramientas).
- `mi-horario-sw.js`, `mi-horario.webmanifest`, `mi-horario-icon*` — permiten instalarla como app y abrirla sin internet.

Los datos se guardan en el navegador de cada dispositivo. Para pasarlos a otro: Ajustes → *Pasar a otro dispositivo* (enlace o QR, opcionalmente con contraseña) o un respaldo `.json` (también cifrado).

Para actualizar el horario, edita los bloques `SEED_CLASSES`, `SEED_EXAMS`, `SEED_PERIODS` y `SEED_TASKS` al inicio del script: los cambios llegan solos a la app sin borrar lo que el alumno editó desde ella.

## Playlist → MP3

`playlist-mp3/`: página para convertir una playlist de YouTube a MP3 en un ZIP. Corre en tu computadora (`python3 server.py`); ver `playlist-mp3/README.md`.

## Relación de trabajos

`trabajos/index.html`: lista de trabajos de la casa para marcar como hechos o pendientes. Se guarda en el navegador de cada dispositivo.

## Astra Hik's

`astra-hiks/index.html`: bitácora de entrenamiento (ejercicios, series, peso en kg, lb, placas o indf). Sin cuentas: todo se guarda en el dispositivo.
**https://lukoffmon.github.io/CuauhtemocUca/astra-hiks/**

- Rutinas base: viene con **full Body x3**; al empezarla carga tus últimos números de cada ejercicio. Se pueden crear, editar, exportar y pegar rutinas.
- Notas por ejercicio (UNI, altura H12, agarre…), siempre visibles y copiadas a cada sesión.
- Retro al terminar cada sesión (mejoró / igual / bajó) y resumen de la semana contra la anterior.
- PDF detallado por sesión con retro y calendario del mes (asistencia y duración).
- Archivo `.hiks` (texto simple) para exportar, editar fuera y volver a importar; también acepta pegar listas tipo "• Ejercicio / 143Lb x 8".
- Récords personales en la retro y en el PDF; pestaña *Progreso* con la evolución de cada ejercicio.
- En el celular, el PDF y los `.hiks` se abren en *Compartir* (Archivos, WhatsApp, Drive…). Borrar se puede deshacer.
- Animación de entrada (nebulosa) solo al abrir la app.
- Funciona sin internet: abre desde la copia guardada y se actualiza sola cuando hay conexión. Al publicar cambios, sube `VERSION` en `sw.js`.
- `vendor/jspdf.umd.min.js` es jsPDF 2.5.1 (MIT). `fonts/` son Big Shoulders Display, Archivo y JetBrains Mono (OFL), guardadas localmente.

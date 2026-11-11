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

`astra-hiks/index.html`: bitácora de entrenamiento (ejercicios, series, peso en kg, lb o indf). Sin cuentas: todo se guarda en el navegador.
**https://lukoffmon.github.io/CuauhtemocUca/astra-hiks/**

- Retro al terminar cada sesión (mejoró / igual / bajó contra la vez anterior) y resumen de la semana contra la anterior.
- PDF detallado por sesión, con la retro y un calendario del mes (días que asististe, días que no y cuánto duró cada sesión).
- Archivo `.hiks` (texto simple) para exportar una sesión o un respaldo, editarlo fuera y volver a importarlo.
- 8 temas de color, nombre personalizado y funciona sin internet una vez abierta.
- `vendor/jspdf.umd.min.js` es jsPDF 2.5.1 (licencia MIT), incluido para generar el PDF sin depender de un CDN.

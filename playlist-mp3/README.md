# Playlist de YouTube o Spotify → MP3 (ZIP)

Página sencilla: pegas el enlace de una playlist y te devuelve un `.zip` con todas las canciones en MP3 a 320 kbps (con título, artista y portada).

Acepta enlaces de YouTube y de Spotify (playlist, álbum o canción). Spotify no deja descargar su audio, así que el programa lee la lista de canciones de Spotify y baja cada una desde YouTube, eligiendo el resultado con la duración más parecida. Casi siempre es la versión correcta, pero de vez en cuando puede salir otra (en vivo, remix…). La playlist de Spotify tiene que ser pública, y no hace falta cuenta ni claves. Spotify solo muestra las primeras 100 canciones de cada lista.

## Cómo usarla

Necesitas Python 3.10 o más reciente, [ffmpeg](https://ffmpeg.org/download.html) y Node.js o [Deno](https://deno.com).

```bash
cd playlist-mp3
pip install -r requirements.txt
python3 server.py
```

Abre http://localhost:8000, pega el enlace y pulsa **Convertir**.

En Windows usa `python server.py` (no `python3`, que abre la Microsoft Store), o simplemente haz doble clic en `iniciar.bat`.
Deja esa ventana abierta mientras usas la página: si la cierras, el convertidor deja de funcionar.

Tiene que correr en tu propia computadora, no en GitHub Pages, porque la conversión la hace el servidor (yt-dlp + ffmpeg).
Si YouTube empieza a fallar, actualiza: `pip install -U "yt-dlp[default]"`.

Úsala solo con contenido propio o que tengas derecho a descargar.

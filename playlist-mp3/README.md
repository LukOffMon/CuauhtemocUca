# Playlist de YouTube o Spotify → MP3 (ZIP)

Página sencilla: pegas el enlace de una playlist y te devuelve un `.zip` con todas las canciones en MP3 a 320 kbps (con título, artista y portada).

Acepta enlaces de YouTube y de Spotify (playlist, álbum o canción). Spotify no deja descargar su audio, así que el programa lee la lista de canciones de Spotify y baja cada una desde YouTube, eligiendo el resultado con la duración más parecida. Casi siempre es la versión correcta, pero de vez en cuando puede salir otra (en vivo, remix…). La playlist de Spotify tiene que ser pública. Sin claves, Spotify solo deja leer las primeras 100 canciones de cada lista.

### Listas de más de 100 canciones (Spotify)

Para bajar la lista completa, crea tus propias claves gratuitas de la API de Spotify:

1. Entra a https://developer.spotify.com/dashboard con tu cuenta de Spotify y pulsa **Create app**.
2. Ponle cualquier nombre y descripción, en *Redirect URI* escribe `http://127.0.0.1:8000`, marca **Web API** y guarda.
3. En **Settings** copia el *Client ID* y el *Client Secret*.
4. Copia `spotify.example.json` como `spotify.json` (en esta misma carpeta), pega ahí tus dos claves y vuelve a abrir `iniciar.bat`.

`spotify.json` es privado: no lo compartas ni lo subas a GitHub (ya está en `.gitignore`). Las listas hechas por Spotify (por ejemplo "Today's Top Hits") no se pueden leer con la API; las listas creadas por usuarios sí.

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

# Playlist de YouTube o Spotify → MP3 (ZIP)

Página sencilla: pegas el enlace de una playlist y te devuelve un `.zip` con todas las canciones en MP3 a 320 kbps (con título, artista y portada).

Acepta enlaces de YouTube y de Spotify (playlist, álbum o canción). Spotify no deja descargar su audio, así que el programa lee la lista de canciones de Spotify y baja cada una desde YouTube, eligiendo el resultado con la duración más parecida. Casi siempre es la versión correcta, pero de vez en cuando puede salir otra (en vivo, remix…). La playlist de Spotify tiene que ser pública. Sin claves, Spotify solo deja leer las primeras 100 canciones de cada lista.

### Listas de más de 100 canciones (Spotify)

Para bajar la lista completa, crea tus propias claves gratuitas de la API de Spotify:

Abre el convertidor: en la página aparece el recuadro **Conectar Spotify** con estos pasos.

1. Entra a https://developer.spotify.com/dashboard con tu cuenta de Spotify y pulsa **Create app**.
2. Ponle cualquier nombre y descripción, en *Redirect URI* escribe `http://127.0.0.1:8000`, marca **Web API** y guarda.
3. En **Settings** copia el *Client ID* y el *Client Secret*, pégalos en la página y pulsa **Guardar y continuar** (se guardan en `spotify.json`).
4. Pulsa **Iniciar sesión con Spotify** y acepta. Solo hace falta una vez.

Spotify solo deja leer por la API las playlists **tuyas** o en las que colaboras. Si la lista es de otra persona, cópiala: en la app de Spotify ábrela, selecciona todas las canciones (Ctrl+A), clic derecho → **Agregar a playlist** → **Nueva playlist**, y usa el enlace de tu copia.

Ojo: Spotify solo deja usar su API si la cuenta que creó la app en developer.spotify.com tiene **Spotify Premium** activo. Sin Premium, el programa lee solo las primeras 100 canciones y lo avisa.

**Sin Premium:** parte la playlist en listas de 100 o menos (en la app de Spotify selecciona un bloque de canciones, clic derecho → **Agregar a playlist** → **Nueva playlist**) y pega todos los enlaces en la página, uno por línea y en orden. Todo sale en un solo ZIP, numerado seguido: con **Separar en carpetas de 100** cada enlace va en su carpeta («Mi lista 001-100», «Mi lista 101-200»…). El ZIP y las carpetas se llaman como el primer enlace.

`spotify.json` y `spotify_token.json` (la sesión guardada) son privados: no los compartas ni los subas a GitHub (ya están en `.gitignore`). Para cerrar la sesión, pulsa **Cerrar sesión** en la página.

## Cómo usarla

**En Windows, lo más fácil:** en la carpeta principal del repo hay dos archivos.

1. `Instalar-Playlist-MP3.bat`: doble clic una sola vez. Instala Python, ffmpeg, Node.js y las librerías con winget. Vuelve a ejecutarlo si YouTube empieza a fallar, porque también actualiza yt-dlp. No lo ejecutes mientras haya una descarga en curso.
2. `Abrir-Playlist-MP3.bat`: doble clic cada vez que quieras usar el convertidor. Si ya está abierto, solo abre el navegador.

**A mano (cualquier sistema):**

Necesitas Python 3.10 o más reciente, [ffmpeg](https://ffmpeg.org/download.html) y Node.js o [Deno](https://deno.com).

```bash
cd playlist-mp3
pip install -r requirements.txt
python3 server.py
```

Abre http://127.0.0.1:8000, pega el enlace y pulsa **Convertir**.

En Windows usa `python server.py` (no `python3`, que abre la Microsoft Store), o simplemente haz doble clic en `iniciar.bat`.
Deja esa ventana abierta mientras usas la página: si la cierras, el convertidor deja de funcionar.

Tiene que correr en tu propia computadora, no en GitHub Pages, porque la conversión la hace el servidor (yt-dlp + ffmpeg).
Si YouTube empieza a fallar, actualiza: `pip install -U "yt-dlp[default]"`.

Úsala solo con contenido propio o que tengas derecho a descargar.

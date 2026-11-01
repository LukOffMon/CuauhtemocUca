#!/usr/bin/env python3
"""Playlist (YouTube o Spotify) → MP3 (ZIP). Servidor mínimo: sirve index.html y una API de trabajos.

Uso:  pip install -r requirements.txt   (y tener ffmpeg instalado)
      python3 server.py                 → http://localhost:8000
"""
import base64
import json
import os
import re
import shutil
import tempfile
import threading
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import uuid
import zipfile
from concurrent.futures import ThreadPoolExecutor
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import yt_dlp
from yt_dlp.postprocessor import MetadataParserPP

HERE = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8000))
KEYS_FILE = os.path.join(HERE, "spotify.json")
TOKEN_FILE = os.path.join(HERE, "spotify_token.json")  # sesión de Spotify guardada; es privada, igual que spotify.json
REDIRECT_URI = f"http://127.0.0.1:{PORT}"  # tiene que ser idéntico al Redirect URI de la app en developer.spotify.com
LOGIN_STATES = set()
WORKERS = 4  # canciones que se bajan a la vez; con muchas más YouTube puede bloquear un rato
SPLIT_SIZE = 100  # canciones por carpeta cuando se marca "Separar en carpetas de 100"
SLOTS = threading.Semaphore(WORKERS)  # límite total, aunque haya varias descargas (pestañas) a la vez
RETRY_ROUNDS = 2  # vueltas extra para las canciones que fallaron
RETRY_PAUSE = 30  # segundos de espera antes de cada vuelta extra
JOBS = {}


YOUTUBE_RE = re.compile(r"^https?://([\w-]+\.)?(youtube\.com|youtu\.be)/")
SPOTIFY_RE = re.compile(r"^https?://open\.spotify\.com/(?:intl-[\w-]+/)?(playlist|album|track)/(\w+)")


WINDOWS_RESERVED = {"CON", "PRN", "AUX", "NUL", *(f"COM{i}" for i in range(1, 10)), *(f"LPT{i}" for i in range(1, 10))}


def safe_name(text, fallback):
    """Deja solo caracteres seguros en cualquier PC: quita acentos (á→a, ñ→n), emojis y símbolos raros."""
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode()
    text = re.sub(r"[^A-Za-z0-9 ()&,'!._-]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip(" .-_")[:120].rstrip(" .-_")
    if not re.search(r"[A-Za-z]", text):  # p. ej. un título solo en japonés queda vacío o en solo números
        text = f"{text} - {fallback}" if text else fallback
    if text.split(".")[0].upper() in WINDOWS_RESERVED:
        text = "_" + text
    return text


def ydl_opts(work, outtmpl, log, pre=()):
    return {
        "logger": log,
        "format": "bestaudio/best",
        "retries": 10,  # reintenta si la conexión se corta a media canción
        "fragment_retries": 10,
        "extractor_retries": 3,
        "socket_timeout": 30,
        "js_runtimes": {"deno": {}, "node": {}},
        "outtmpl": os.path.join(work, outtmpl),
        "restrictfilenames": False,
        "windowsfilenames": True,
        "ignoreerrors": True,
        "quiet": True,
        "noprogress": True,
        "writethumbnail": True,
        "postprocessors": [
            *pre,
            {"key": "FFmpegExtractAudio", "preferredcodec": "mp3", "preferredquality": "320"},
            {"key": "FFmpegMetadata"},
            {"key": "EmbedThumbnail"},
        ],
    }


def spotify_keys():
    """Claves propias de la API de Spotify (spotify.json), si el usuario las creó. Sin ellas solo se leen 100 canciones."""
    try:
        with open(KEYS_FILE, encoding="utf-8") as f:
            keys = json.load(f)
        return keys["client_id"].strip(), keys["client_secret"].strip()
    except (OSError, ValueError, KeyError, AttributeError):
        return None


def spotify_token_request(fields, client_id, client_secret):
    auth = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    req = urllib.request.Request("https://accounts.spotify.com/api/token", data=urllib.parse.urlencode(fields).encode(),
                                 headers={"Authorization": "Basic " + auth, "Content-Type": "application/x-www-form-urlencoded"})
    return json.load(urllib.request.urlopen(req, timeout=20))


def save_refresh_token(refresh):
    with open(TOKEN_FILE, "w", encoding="utf-8") as f:
        json.dump({"refresh_token": refresh}, f)


def spotify_user_token(client_id, client_secret):
    """Token de la sesión de Spotify que el usuario inició en la página (spotify_token.json), o None."""
    try:
        with open(TOKEN_FILE, encoding="utf-8") as f:
            refresh = json.load(f)["refresh_token"]
        res = spotify_token_request({"grant_type": "refresh_token", "refresh_token": refresh}, client_id, client_secret)
    except (OSError, ValueError, KeyError, urllib.error.HTTPError):
        return None  # nunca inició sesión, o la sesión venció o fue revocada
    if res.get("refresh_token"):
        save_refresh_token(res["refresh_token"])
    return res["access_token"]


def spotify_api_get(path, token):
    req = urllib.request.Request(path if path.startswith("https://") else "https://api.spotify.com/v1/" + path,
                                 headers={"Authorization": "Bearer " + token})
    return json.load(urllib.request.urlopen(req, timeout=20))


def spotify_api_tracks(kind, sid, token):
    """Lista completa con la API oficial de Spotify, página por página (sin el límite de 100)."""
    def track(t):
        return ", ".join(a["name"] for a in t["artists"]), t["name"], (t.get("duration_ms") or 0) / 1000

    try:
        if kind == "track":
            t = spotify_api_get(f"tracks/{sid}", token)
            return t["name"], [track(t)]
        info = spotify_api_get(f"{kind}s/{sid}", token)
        if kind == "playlist":
            page = spotify_api_get(f"playlists/{sid}/items?limit=50", token)
        else:
            page = info["tracks"]
        tracks = []
        while page:
            for item in page["items"]:
                t = (item.get("item") or item.get("track")) if kind == "playlist" else item
                if t and t.get("name") and t.get("artists") and not t.get("is_local"):  # huecos, archivos locales, podcasts
                    tracks.append(track(t))
            page = spotify_api_get(page["next"], token) if page.get("next") else None
        return info["name"], tracks
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            raise RuntimeError("Spotify solo deja leer playlists tuyas o en las que colaboras. "
                               "Copia las canciones a una playlist tuya y usa ese enlace (mira el README).") from e
        if e.code == 404:
            raise RuntimeError("Spotify no encontró esa lista. ¿Es privada o una lista hecha por Spotify?") from e
        raise


def spotify_tracks(url):
    """Lee nombre y canciones (artista, título, segundos), más un aviso si la lista quedó cortada en 100."""
    kind, sid = SPOTIFY_RE.match(url).groups()
    keys = spotify_keys()
    if keys:
        token = spotify_user_token(*keys)
        if not token and kind != "playlist":  # álbumes y canciones se leen sin iniciar sesión
            try:
                token = spotify_token_request({"grant_type": "client_credentials"}, *keys)["access_token"]
            except urllib.error.HTTPError as e:
                raise RuntimeError("Spotify rechazó las claves de spotify.json. Revisa el Client ID y el Client Secret.") from e
        if token:
            name, tracks = spotify_api_tracks(kind, sid, token)
            return name, tracks, None
    req = urllib.request.Request(f"https://open.spotify.com/embed/{kind}/{sid}", headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=20).read().decode()
    m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
    if not m:
        raise RuntimeError("No se pudo leer el enlace de Spotify. Revisa que la playlist sea pública.")
    entity = json.loads(m.group(1))["props"]["pageProps"]["state"]["data"]["entity"]
    tracks = []
    for t in entity.get("trackList") or [entity]:
        artist = t.get("subtitle") or ", ".join(a["name"] for a in t.get("artists") or [])
        tracks.append((artist.replace(" ", " "), t.get("title") or t.get("name"), (t.get("duration") or 0) / 1000))
    if len(tracks) < 100:
        return entity.get("name") or "spotify", tracks, None
    if keys:
        return entity.get("name"), tracks, "Spotify solo dejó leer las primeras 100 canciones. Pulsa \"Iniciar sesión con Spotify\" para bajar la lista completa."
    return entity.get("name"), tracks, "Spotify solo dejó leer las primeras 100 canciones. Para bajar la lista completa, crea spotify.json (mira el README)."


def youtube_match(artist, title, seconds, log):
    """Busca la canción en YouTube y elige el resultado con la duración más parecida a la de Spotify."""
    opts = {"extract_flat": True, "quiet": True, "ignoreerrors": True, "socket_timeout": 30, "extractor_retries": 3, "logger": log}
    with yt_dlp.YoutubeDL(opts) as ydl:
        res = ydl.extract_info(f"ytsearch5:{artist} - {title} audio", download=False) or {}
    entries = [e for e in res.get("entries") or [] if e]
    if not entries:
        return None
    if seconds:
        close = [e for e in entries if e.get("duration") and abs(e["duration"] - seconds) <= 15]
        best = close[0] if close else min(entries, key=lambda e: abs((e.get("duration") or 0) - seconds))
    else:
        best = entries[0]
    return best["url"]


class SongLog:
    """Logger de yt-dlp que guarda el último error de una canción, para explicar en faltantes.txt por qué faltó."""

    def __init__(self):
        self.last = None

    def debug(self, msg):
        pass

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        self.last = msg.removeprefix("ERROR: ")


def download_parallel(job, pending, work, fn, label, width):
    """Corre fn(prefijo, item, log) para cada (número, item), varias a la vez, y reintenta las que fallen.

    Devuelve las que faltaron como (número, item, motivo)."""
    job.update(total=len(pending), index=1, percent=None)
    finished = 0
    retry = False
    lock = threading.Lock()
    reasons = {}

    def one(args):
        nonlocal finished
        i, item = args
        prefix = f"{i:0{width}d} - "
        log = SongLog()
        with SLOTS:
            job["current"] = ("Reintento: " if retry else "") + label(item)
            try:
                fn(prefix, item, log)
            except Exception as e:  # noqa: BLE001  una canción que falla no detiene las demás
                log.last = str(e)
        ok = any(f.startswith(prefix) and f.endswith(".mp3") for f in os.listdir(work))
        reasons[i] = None if ok else log.last or "No se encontró en YouTube."
        with lock:
            finished += 1
            job["index"] = min(finished + 1, len(pending))
        return ok

    for attempt in range(1 + RETRY_ROUNDS):
        if attempt:  # casi siempre son bloqueos pasajeros de YouTube: se espera un poco y se vuelve a intentar
            retry = True
            job["current"] = f"Reintentando {len(pending)} canciones que fallaron…"
            time.sleep(RETRY_PAUSE)
        with ThreadPoolExecutor(WORKERS) as pool:
            results = list(pool.map(one, pending))
        pending = [p for p, ok in zip(pending, results) if not ok]
        if not pending:
            break
    return [(i, item, reasons[i]) for i, item in pending]


def prepare_spotify(job, url, work):
    name, tracks, warning = spotify_tracks(url)
    if warning:
        job["warning"] = warning

    def one(prefix, track, log):
        artist, title, seconds = track
        video = youtube_match(artist, title, seconds, log)
        if not video:
            return
        # Las etiquetas del MP3 usan los datos de Spotify, no el título del video de YouTube.
        tags = f"{artist} ::: {title}".replace("%", "%%")
        pre = [{"key": "MetadataParser", "when": "pre_process",
                "actions": [(MetadataParserPP.Actions.INTERPRET, tags, r"(?P<artist>.+) ::: (?P<title>(?P<track>.+))")]}]
        with yt_dlp.YoutubeDL(ydl_opts(work, prefix + "%(artist)s - %(title)s.%(ext)s", log, pre)) as ydl:
            ydl.download([video])

    return name, tracks, one, lambda t: f"{t[0]} - {t[1]}"


def prepare_youtube(job, url, work):
    with yt_dlp.YoutubeDL({"extract_flat": "in_playlist", "quiet": True, "ignoreerrors": True, "socket_timeout": 30}) as ydl:
        info = ydl.extract_info(url, download=False) or {}
    entries = [e for e in info.get("entries") or [info] if e]  # un video suelto no trae "entries"

    def one(prefix, entry, log):
        with yt_dlp.YoutubeDL(ydl_opts(work, prefix + "%(title)s.%(ext)s", log)) as ydl:
            ydl.download([entry.get("webpage_url") or entry["url"]])

    return info.get("title"), entries, one, lambda e: e.get("title") or e.get("url") or "?"


def windows_text(lines):
    """Texto para el Bloc de notas: BOM UTF-8 y saltos de línea de Windows."""
    return "\ufeff" + "\r\n".join(lines) + "\r\n"


def split_folder(job, filename):
    """Carpeta dentro del ZIP ("001-100/", "101-200/"…) si se pidió separar de 100 en 100; si no, ninguna."""
    if not job.get("_split"):
        return ""
    total, width = job["_total"], job["_width"]
    start = (int(filename.split(" - ", 1)[0]) - 1) // SPLIT_SIZE * SPLIT_SIZE + 1
    return f"{start:0{width}d}-{min(start + SPLIT_SIZE - 1, total):0{width}d}/"


def download_and_zip(job, pending):
    """Baja las canciones pendientes y arma el ZIP con todos los MP3 que haya en la carpeta del trabajo."""
    work = job["dir"]
    missing = download_parallel(job, pending, work, job["_fn"], job["_label"], job["_width"])
    failed = [[i, job["_label"](item), reason] for i, item, reason in missing]
    job.update(_missing=missing, missing=len(missing), failed=failed)
    mp3s = sorted(f for f in os.listdir(work) if f.endswith(".mp3"))
    if not mp3s:
        if job.get("downloaded"):  # reintento después de bajar el ZIP y no se recuperó ninguna
            return job.update(status="done", zip=None, count=0)
        raise RuntimeError("No se pudo descargar ninguna canción. Revisa que la lista sea pública o actualiza yt-dlp (pip install -U 'yt-dlp[default]').")
    job["status"] = "zipping"
    if job.get("zip"):  # un reintento antes de bajar el ZIP lo rehace con las canciones recuperadas
        os.remove(job["zip"])
    name = job["_name"] + (" - recuperadas" if job.get("downloaded") else "")
    zpath = os.path.join(work, name + ".zip")
    used = set()
    listing = []  # (carpeta, canción) para "lista de canciones.txt"
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_STORED) as z:  # el MP3 ya está comprimido
        for f in mp3s:
            base = clean = safe_name(f[:-4], "Cancion")
            n = 2
            while clean.lower() in used:  # dos títulos que quedan iguales tras limpiarlos
                clean, n = f"{base} ({n})", n + 1
            used.add(clean.lower())
            folder = split_folder(job, f)
            z.write(os.path.join(work, f), folder + clean + ".mp3")
            listing.append((folder.rstrip("/"), clean))
        songs = [f"Lista de canciones ({len(listing)})"]
        prev = None
        for folder, song in listing:
            if folder != prev:  # con carpetas de 100, un encabezado por carpeta
                songs += ["", f"== {folder} =="] if folder else [""]
                prev = folder
            songs.append(song)
        z.writestr("lista de canciones.txt", windows_text(songs))
        if failed:
            lines = [f"{i}. {song}  ->  {reason}" for i, song, reason in failed]
            z.writestr("faltantes.txt", windows_text(["Canciones que no se pudieron bajar (número en la lista, nombre y motivo):", "", *lines]))
    job.update(status="done", zip=zpath, filename=name + ".zip", count=len(mp3s))


def run_job(job, url):
    work = tempfile.mkdtemp(prefix="pl2mp3-")
    job["dir"] = work
    try:
        prepare = prepare_spotify if SPOTIFY_RE.match(url) else prepare_youtube
        title, items, fn, label = prepare(job, url, work)
        # Se guarda lo necesario para el botón "Reintentar las que faltaron"
        job.update(_name=safe_name(title, "playlist"), _fn=fn, _label=label, _width=len(str(len(items))), _total=len(items))
        download_and_zip(job, list(enumerate(items, 1)))
    except Exception as e:  # noqa: BLE001
        job.update(status="error", error=str(e))


def retry_job(job):
    try:
        download_and_zip(job, [(i, item) for i, item, _ in job["_missing"]])
    except Exception as e:  # noqa: BLE001
        job.update(status="error", error=str(e))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        m = re.match(r"^/api/retry/(\w+)$", self.path)
        if m:
            job = JOBS.get(m.group(1))
            if not job or job["status"] != "done" or not job.get("_missing"):
                return self.send_json({"error": "No hay canciones que reintentar."}, 400)
            job.update(status="working", current=None)
            threading.Thread(target=retry_job, args=(job,), daemon=True).start()
            return self.send_json({"id": m.group(1)})
        if self.path != "/api/start":
            return self.send_error(404)
        data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        url = (data.get("url") or "").strip()
        if not (YOUTUBE_RE.match(url) or SPOTIFY_RE.match(url)):
            return self.send_json({"error": "Pega un enlace de YouTube o de Spotify válido."}, 400)
        job_id = uuid.uuid4().hex
        JOBS[job_id] = {"status": "working", "current": None, "index": None, "total": None, "percent": None,
                        "_split": bool(data.get("split"))}
        threading.Thread(target=run_job, args=(JOBS[job_id], url), daemon=True).start()
        self.send_json({"id": job_id})

    def redirect(self, location):
        self.send_response(302)
        self.send_header("Location", location)
        self.end_headers()

    def spotify_login(self):
        keys = spotify_keys()
        if not keys:
            return self.send_json({"error": "Primero crea spotify.json (mira el README)."}, 400)
        state = uuid.uuid4().hex
        LOGIN_STATES.add(state)
        query = urllib.parse.urlencode({"client_id": keys[0], "response_type": "code", "redirect_uri": REDIRECT_URI,
                                        "scope": "playlist-read-private playlist-read-collaborative", "state": state,
                                        "show_dialog": "true"})  # deja elegir cuenta en "Cambiar de cuenta"
        self.redirect("https://accounts.spotify.com/authorize?" + query)

    def spotify_callback(self, params):
        """Spotify regresa aquí (al Redirect URI) después de que el usuario inicia sesión."""
        state = params.get("state", [""])[0]
        if state not in LOGIN_STATES or "code" not in params:
            return self.redirect("/?spotify=error")
        LOGIN_STATES.discard(state)
        try:
            res = spotify_token_request({"grant_type": "authorization_code", "code": params["code"][0],
                                         "redirect_uri": REDIRECT_URI}, *spotify_keys())
            save_refresh_token(res["refresh_token"])
        except (urllib.error.HTTPError, KeyError, TypeError):
            return self.redirect("/?spotify=error")
        self.redirect("/?spotify=ok")

    def do_GET(self):
        url = urllib.parse.urlsplit(self.path)
        params = urllib.parse.parse_qs(url.query)
        if url.path == "/" and ("code" in params or "error" in params):
            return self.spotify_callback(params)
        if url.path == "/api/spotify/login":
            return self.spotify_login()
        if url.path == "/api/spotify/session":
            return self.send_json({"keys": bool(spotify_keys()), "logged": os.path.exists(TOKEN_FILE)})
        m = re.match(r"^/api/(status|download)/(\w+)$", self.path)
        if not m:
            return super().do_GET()
        job = JOBS.get(m.group(2))
        if not job:
            return self.send_json({"error": "Trabajo no encontrado."}, 404)
        if m.group(1) == "status":
            public = {k: v for k, v in job.items() if k not in ("dir", "zip") and not k.startswith("_")}
            return self.send_json({**public, "ready": bool(job.get("zip"))})
        if job["status"] != "done":
            return self.send_json({"error": "Aún no está listo."}, 409)
        if not job.get("zip"):
            return self.send_json({"error": "Ese ZIP ya se descargó."}, 410)
        self.send_response(200)
        self.send_header("Content-Type", "application/zip")
        self.send_header("Content-Length", str(os.path.getsize(job["zip"])))
        self.send_header("Content-Disposition", f"attachment; filename*=UTF-8''{urllib.parse.quote(job['filename'])}")
        self.end_headers()
        with open(job["zip"], "rb") as f:
            shutil.copyfileobj(f, self.wfile)
        if job.get("_missing"):  # se guarda el trabajo para poder reintentar las que faltaron, pero sin lo ya bajado
            for f in os.listdir(job["dir"]):
                try:
                    os.remove(os.path.join(job["dir"], f))
                except OSError:
                    pass
            job.update(downloaded=True, zip=None)
        else:
            shutil.rmtree(job["dir"], ignore_errors=True)
            JOBS.pop(m.group(2), None)


if __name__ == "__main__":
    print(f"Abre http://localhost:{PORT}")
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()

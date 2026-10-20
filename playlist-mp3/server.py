#!/usr/bin/env python3
"""Playlist → MP3 (ZIP). Servidor mínimo: sirve index.html y una API de trabajos.

Uso:  pip install -r requirements.txt   (y tener ffmpeg instalado)
      python3 server.py                 → http://localhost:8000
"""
import json
import os
import re
import shutil
import tempfile
import threading
import urllib.parse
import uuid
import zipfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import yt_dlp

HERE = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8000))
JOBS = {}


def run_job(job, url):
    work = tempfile.mkdtemp(prefix="pl2mp3-")
    job["dir"] = work

    def hook(d):
        info = d.get("info_dict") or {}
        job["current"] = info.get("title") or job["current"]
        job["index"] = info.get("playlist_index") or job["index"]
        job["total"] = info.get("n_entries") or job["total"]
        if d["status"] == "downloading":
            done, total = d.get("downloaded_bytes") or 0, d.get("total_bytes") or d.get("total_bytes_estimate")
            job["percent"] = round(done * 100 / total) if total else None
        elif d["status"] == "finished":
            job["percent"] = 100

    opts = {
        "format": "bestaudio/best",
        "js_runtimes": {"deno": {}, "node": {}},
        "outtmpl": os.path.join(work, "%(playlist_index)03d - %(title)s.%(ext)s"),
        "restrictfilenames": False,
        "windowsfilenames": True,
        "ignoreerrors": True,
        "quiet": True,
        "noprogress": True,
        "writethumbnail": True,
        "progress_hooks": [hook],
        "postprocessors": [
            {"key": "FFmpegExtractAudio", "preferredcodec": "mp3", "preferredquality": "320"},
            {"key": "FFmpegMetadata"},
            {"key": "EmbedThumbnail"},
        ],
    }
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=True)
        name = re.sub(r'[\\/:*?"<>|]+', "_", (info or {}).get("title") or "playlist").strip() or "playlist"
        mp3s = sorted(f for f in os.listdir(work) if f.endswith(".mp3"))
        if not mp3s:
            raise RuntimeError("No se pudo descargar ninguna canción. Revisa que la lista sea pública o actualiza yt-dlp (pip install -U 'yt-dlp[default]').")
        job["status"] = "zipping"
        zpath = os.path.join(work, name + ".zip")
        with zipfile.ZipFile(zpath, "w", zipfile.ZIP_STORED) as z:  # el MP3 ya está comprimido
            for f in mp3s:
                z.write(os.path.join(work, f), f)
        job.update(status="done", zip=zpath, filename=name + ".zip", count=len(mp3s))
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
        if self.path != "/api/start":
            return self.send_error(404)
        data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        url = (data.get("url") or "").strip()
        if not re.match(r"^https?://([\w-]+\.)?(youtube\.com|youtu\.be)/", url):
            return self.send_json({"error": "Pega un enlace de YouTube válido."}, 400)
        job_id = uuid.uuid4().hex
        JOBS[job_id] = {"status": "working", "current": None, "index": None, "total": None, "percent": None}
        threading.Thread(target=run_job, args=(JOBS[job_id], url), daemon=True).start()
        self.send_json({"id": job_id})

    def do_GET(self):
        m = re.match(r"^/api/(status|download)/(\w+)$", self.path)
        if not m:
            return super().do_GET()
        job = JOBS.get(m.group(2))
        if not job:
            return self.send_json({"error": "Trabajo no encontrado."}, 404)
        if m.group(1) == "status":
            return self.send_json({k: v for k, v in job.items() if k not in ("dir", "zip")})
        if job["status"] != "done":
            return self.send_json({"error": "Aún no está listo."}, 409)
        self.send_response(200)
        self.send_header("Content-Type", "application/zip")
        self.send_header("Content-Length", str(os.path.getsize(job["zip"])))
        self.send_header("Content-Disposition", f"attachment; filename*=UTF-8''{urllib.parse.quote(job['filename'])}")
        self.end_headers()
        with open(job["zip"], "rb") as f:
            shutil.copyfileobj(f, self.wfile)
        shutil.rmtree(job["dir"], ignore_errors=True)
        JOBS.pop(m.group(2), None)


if __name__ == "__main__":
    print(f"Abre http://localhost:{PORT}")
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()

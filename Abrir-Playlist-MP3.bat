@echo off
rem Abre el convertidor Playlist a MP3 sin necesitar Claude. Doble clic y listo.
rem Deja esta ventana abierta mientras lo usas: si la cierras, el convertidor se detiene.
title Playlist a MP3
cd /d "%~dp0playlist-mp3"

python -c "import yt_dlp" >nul 2>&1
if errorlevel 1 (
  echo Faltan cosas por instalar. Primero haz doble clic en Instalar-Playlist-MP3.bat
  pause
  exit /b 1
)

rem Si ya hay un convertidor abierto, por ejemplo con una descarga en curso, no se abre otro encima.
netstat -ano | findstr /r /c:":8000 .*LISTENING" >nul
if not errorlevel 1 (
  echo El convertidor ya esta abierto. Abriendo el navegador...
  start "" http://127.0.0.1:8000
  timeout /t 3 /nobreak >nul
  exit /b 0
)

echo Abriendo el convertidor en http://127.0.0.1:8000
echo No cierres esta ventana mientras lo usas.
rem Abre el navegador unos segundos despues, cuando el servidor ya esta escuchando.
start "" /b cmd /c "timeout /t 3 /nobreak >nul & start http://127.0.0.1:8000"
python server.py
pause

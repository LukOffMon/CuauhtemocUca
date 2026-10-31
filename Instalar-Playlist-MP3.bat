@echo off
rem Instala lo que necesita Playlist a MP3: Python, ffmpeg, Node.js y las librerias de Python.
rem Se puede volver a ejecutar cuando quieras: lo ya instalado se salta y yt-dlp se actualiza.
rem No lo ejecutes mientras haya una descarga en curso.
title Instalar Playlist a MP3
cd /d "%~dp0playlist-mp3"

where winget >nul 2>&1
if errorlevel 1 (
  echo No se encontro winget. Actualiza "Instalador de aplicacion" desde Microsoft Store y vuelve a intentar.
  pause
  exit /b 1
)

echo [1/4] Python
call :tiene_python
if not errorlevel 1 goto python_listo
winget install -e --id Python.Python.3.12 --scope user --accept-package-agreements --accept-source-agreements
call :recargar_path
call :tiene_python
if errorlevel 1 (
  echo No se pudo instalar Python. Instalalo desde https://www.python.org/downloads/ y marca "Add python.exe to PATH".
  pause
  exit /b 1
)
:python_listo
echo       OK

echo [2/4] ffmpeg
where ffmpeg >nul 2>&1
if not errorlevel 1 goto ffmpeg_listo
winget install -e --id Gyan.FFmpeg --accept-package-agreements --accept-source-agreements
call :recargar_path
:ffmpeg_listo
echo       OK

echo [3/4] Node.js
where node >nul 2>&1
if not errorlevel 1 goto node_listo
where deno >nul 2>&1
if not errorlevel 1 goto node_listo
winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
call :recargar_path
:node_listo
echo       OK

echo [4/4] Librerias de Python
python -m pip install -U -r requirements.txt
if errorlevel 1 (
  echo No se pudieron instalar las librerias de Python. Revisa tu conexion a internet.
  pause
  exit /b 1
)

echo.
set FALTA=
where ffmpeg >nul 2>&1 || set FALTA=%FALTA% ffmpeg
where node >nul 2>&1 || where deno >nul 2>&1 || set FALTA=%FALTA% Node.js
if defined FALTA (
  echo Falto instalar:%FALTA%. Cierra esta ventana, vuelve a abrir este archivo y si sigue fallando reinicia la PC.
) else (
  echo Todo listo. Ahora abre Abrir-Playlist-MP3.bat
)
pause
exit /b 0

:tiene_python
rem El "python" falso de Microsoft Store no pasa esta prueba; se necesita Python 3.10 o mas nuevo.
python -c "import sys; sys.exit(sys.version_info < (3, 10))" >nul 2>&1
exit /b %errorlevel%

:recargar_path
rem winget cambia el PATH, pero esta ventana no lo ve hasta recargarlo.
for /f "usebackq delims=" %%P in (`%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')"`) do set "PATH=%%P"
exit /b 0

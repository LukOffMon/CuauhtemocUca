@echo off
rem Doble clic para abrir el convertidor en Windows.
cd /d "%~dp0"
rem Abre el navegador unos segundos despues, cuando el servidor ya esta escuchando.
start "" /b cmd /c "timeout /t 3 /nobreak >nul & start http://127.0.0.1:8000"
python server.py
pause

@echo off
rem Doble clic para abrir el convertidor en Windows.
cd /d "%~dp0"
start "" http://localhost:8000
python server.py
pause

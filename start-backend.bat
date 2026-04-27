@echo off
set VENV_PYTHON=.venv\Scripts\python.exe
if not exist "%VENV_PYTHON%" (
  echo Error: virtual environment not found in .venv
  echo Create it with: python -m venv .venv
  exit /b 1
)
"%VENV_PYTHON%" -m backend.main

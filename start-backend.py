from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
VENV_PYTHON = ROOT / ".venv" / "Scripts" / "python.exe"
if not VENV_PYTHON.exists():
    VENV_PYTHON = ROOT / ".venv" / "bin" / "python"

if not VENV_PYTHON.exists():
    print("Error: Python virtual environment not found in .venv")
    print("Create it with: python -m venv .venv")
    sys.exit(1)

print(f"Starting backend with virtual environment: {VENV_PYTHON}")
subprocess.run([str(VENV_PYTHON), "-m", "backend.main"], check=True)

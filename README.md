# Todo App Prototype

A full-stack Todo application built with FastAPI (Python) and React (TypeScript).

## Features
- Create, Read, Update, and Delete Todos.
- Persistent storage using PostgreSQL.
- Modern, responsive UI with Vanilla CSS.
- Asynchronous backend operations.

## Prerequisites
- Python 3.9+
- Node.js & npm
- PostgreSQL (running locally or via Docker)

## Setup & Running

### 1. Backend (FastAPI)
1. From the repository root, create the Python virtual environment in `.venv` (if not already done):
   ```powershell
   python -m venv .venv
   ```
2. Activate the virtual environment:
   - Windows PowerShell: `.\.venv\Scripts\Activate.ps1`
   - Windows CMD: `.\.venv\Scripts\activate.bat`
   - macOS/Linux: `source .venv/bin/activate`
3. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Configure the database:
   - Create a file named `.env` in the `backend` directory.
   - Add your PostgreSQL connection string:
     ```env
     DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/todoapp
     ```
5. Start the backend server using the provided wrapper script:
   ```powershell
   python start-backend.py
   ```
   or on Windows CMD:
   ```cmd
   start-backend.bat
   ```
   The API will be available at `http://localhost:8000`.

> After a reboot, open a terminal in the repo root and run `python start-backend.py` or `start-backend.bat` so the correct `.venv` is always used.

### 2. Frontend (React + TypeScript)
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Project Structure
- `backend/`: FastAPI application, SQLAlchemy models, and database configuration.
- `frontend/`: React application with TypeScript and Vanilla CSS.

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
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (if not already done):
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Configure the database:
   - Create a file named `.env` in the `backend` directory.
   - Add your PostgreSQL connection string:
     ```env
     DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/todoapp
     ```
6. Start the backend server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

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

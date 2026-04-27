from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from typing import List
from uuid import UUID

from .database import engine, Base, get_db
from .models import Todo as TodoModel
from .schemas import Todo, TodoCreate, TodoUpdate

app = FastAPI(title="Todo App API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/api/todos", response_model=List[Todo])
async def read_todos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoModel).order_by(TodoModel.created_at))
    return result.scalars().all()

@app.post("/api/todos", response_model=Todo)
async def create_todo(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    db_todo = TodoModel(**todo.model_dump())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

@app.put("/api/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: UUID, todo: TodoUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoModel).where(TodoModel.id == todo_id))
    db_todo = result.scalar_one_or_none()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    update_data = todo.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TodoModel).where(TodoModel.id == todo_id))
    db_todo = result.scalar_one_or_none()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    await db.execute(delete(TodoModel).where(TodoModel.id == todo_id))
    await db.commit()
    return {"message": "Todo deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

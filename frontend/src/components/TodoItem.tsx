import React from 'react';
import type { Todo } from '../api';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      <span className="todo-title">{todo.title}</span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        &times;
      </button>
    </div>
  );
};

export default TodoItem;

import { useState, useEffect } from 'react';
import './App.css';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import type { Todo } from './api';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'AI' | 'Activate' | 'Completed'>('AI');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Could not load todos. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({ title });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const updated = await updateTodo(id, { completed });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handleFilterChange = (value: 'AI' | 'Activate' | 'Completed') => {
    setFilter(value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Activate') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <header>
        <h1>Todo App</h1>
      </header>

      <TodoInput onAdd={handleAddTodo} />

      <div className="filter-tabs">
        {(['AI', 'Activate', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => handleFilterChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="todo-list">
        {filteredTodos.length === 0 && !loading && !error && (
          <p className="empty-msg">No todos yet. Add one above!</p>
        )}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

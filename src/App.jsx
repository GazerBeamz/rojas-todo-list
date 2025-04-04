import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (!todo.completed && todo.deadline && new Date(todo.deadline) < now) {
            return { ...todo, uncompleted: true };
          }
          return todo;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTodo = (text, deadline) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        uncompleted: false,
        deadline: deadline || null,
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (todo.completed && todo.uncompleted) {
            return todo;
          }
          return {
            ...todo,
            completed: !todo.completed,
            uncompleted: todo.uncompleted && !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const editTodo = (id, newText, newDeadline) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, deadline: newDeadline || todo.deadline }
          : todo
      )
    );
  };

  const moveToAll = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, uncompleted: false } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return todo.uncompleted && !todo.completed;
    if (filter === 'all') return !todo.completed && !todo.uncompleted;
    return true;
  });

  // Calculate task counts
  const allCount = todos.filter((todo) => !todo.completed && !todo.uncompleted).length;
  const uncompletedCount = todos.filter((todo) => todo.uncompleted && !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">
          <FontAwesomeIcon icon={faListCheck} className="app-icon" /> Todo List
        </h1>
        <TodoForm addTodo={addTodo} />
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All <span className="counter">{allCount}</span>
          </button>
          <button
            className={`filter-button ${filter === 'uncompleted' ? 'active' : ''}`}
            onClick={() => setFilter('uncompleted')}
          >
            Uncomplete Task <span className="counter">{uncompletedCount}</span>
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed <span className="counter">{completedCount}</span>
          </button>
        </div>
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          moveToAll={moveToAll}
        />
      </div>
    </div>
  );
}

export default App;
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
  const [filter, setFilter] = useState('all'); // Add filter state

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Check for overdue tasks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (!todo.completed && todo.deadline && new Date(todo.deadline) < now) {
            return { ...todo, uncompleted: true }; // Mark as uncompleted if overdue
          }
          return todo;
        })
      );
    }, 1000); // Check every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          // Check if the task is overdue and not completed
          if (!todo.completed && todo.deadline && new Date(todo.deadline) < now) {
            return { ...todo, uncompleted: true }; // Mark as uncompleted
          }
          return todo;
        })
      );
    }, 1000); // Check every second for testing purposes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = [];

    todos.forEach((todo) => {
      if (!todo.completed && todo.deadline) {
        const timeUntilDeadline = new Date(todo.deadline) - new Date();
        if (timeUntilDeadline > 0) {
          // Schedule a timeout for when the task becomes overdue
          const timer = setTimeout(() => {
            setTodos((prevTodos) =>
              prevTodos.map((t) =>
                t.id === todo.id ? { ...t, uncompleted: true } : t
              )
            );
          }, timeUntilDeadline);

          timers.push(timer);
        } else {
          // If already overdue, mark as uncompleted immediately
          setTodos((prevTodos) =>
            prevTodos.map((t) =>
              t.id === todo.id ? { ...t, uncompleted: true } : t
            )
          );
        }
      }
    });

    return () => {
      // Clear all timeouts on cleanup
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [todos]);
  
  const addTodo = (text, deadline) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        uncompleted: false, // Add uncompleted state
        deadline: deadline || null, // Deadline is optional
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, uncompleted: false }
          : todo
      )
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

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return todo.uncompleted;
    if (filter === 'all') return !todo.completed && !todo.uncompleted;
    return true;
  });

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
            All
          </button>
          <button
            className={`filter-button ${filter === 'uncompleted' ? 'active' : ''
              }`}
            onClick={() => setFilter('uncompleted')}
          >
            Uncomplete Task
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''
              }`}
            onClick={() => setFilter('completed')}
          >
            Completed
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
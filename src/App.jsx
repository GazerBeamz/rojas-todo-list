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

  const addTodo = (todo) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text: todo, 
      completed: false 
    }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed; // Show only completed todos
    if (filter === 'all') return !todo.completed; // Show only active (not completed) todos
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
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`} 
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
        />
      </div>
    </div>
  );
}

export default App;
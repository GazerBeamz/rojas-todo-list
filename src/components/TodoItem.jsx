import React, { useState } from 'react';

const TodoItem = ({ todo, deleteTodo, toggleComplete, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`} onClick={() => toggleComplete(todo.id)}>
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-actions">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            editTodo(todo.id, prompt('Edit your todo:', todo.text));
          }} 
          className="edit-button"
        >
          Edit
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }} 
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
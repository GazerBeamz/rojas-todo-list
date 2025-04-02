// filepath: src/components/TodoList.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const TodoList = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const openModal = (todo) => {
    setCurrentTodo(todo);
    setEditText(todo.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (currentTodo) {
      editTodo(currentTodo.id, editText);
    }
    closeModal();
  };

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleComplete(todo.id)}
          >
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
              <button
                className="action-button edit"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(todo);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="action-button delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveEdit}
        value={editText}
        setValue={setEditText}
      />
    </>
  );
};

export default TodoList;
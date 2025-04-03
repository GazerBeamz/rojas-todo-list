import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const TodoList = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  const openModal = (todo) => {
    setCurrentTodo(todo);
    setEditText(todo.text);
    setEditDeadline(todo.deadline || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
    setEditText('');
    setEditDeadline('');
  };

  const saveEdit = () => {
    if (currentTodo) {
      editTodo(currentTodo.id, editText, editDeadline);
    }
    closeModal();
  };

  return (
    <>
      {todos.length === 0 && <p className="no-todos">No todo lists yet</p>}

      <ul className="todo-list">
        {todos.map((todo) => {
          const currentTime = new Date();
          const deadline = new Date(todo.deadline);
          const isOverdue = !todo.completed && deadline < currentTime;

          return (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleComplete(todo.id)}
            >
              <span className="todo-text">{todo.text}</span>
              {todo.deadline && (
                <span className="todo-deadline">
                  {isOverdue ? (
                    <span className="overdue-label">Overdue</span>
                  ) : (
                    <>
                      <strong>Deadline:</strong> {deadline.toLocaleString()}
                    </>
                  )}
                </span>
              )}
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
          );
        })}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveEdit}
        value={editText}
        setValue={setEditText}
        deadline={editDeadline}
        setDeadline={setEditDeadline}
      />
    </>
  );
};

export default TodoList;
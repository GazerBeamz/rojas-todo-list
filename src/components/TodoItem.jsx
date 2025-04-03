import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo, moveToAll }) => {
  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={() => !todo.uncompleted && toggleComplete(todo.id)} // Only toggle if not uncompleted
    >
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        {todo.deadline && (
          <span
            className={`todo-deadline ${
              todo.uncompleted ? 'overdue-label' : ''
            }`}
            onClick={(e) => {
              if (todo.uncompleted) {
                e.stopPropagation(); // Prevent toggling complete
                moveToAll(todo.id); // Move back to "All"
              }
            }}
          >
            {todo.uncompleted ? (
              <strong>Overdue</strong> // Display "Overdue" for uncompleted tasks
            ) : (
              <>
                <strong>Deadline:</strong> {new Date(todo.deadline).toLocaleString()}
              </>
            )}
          </span>
        )}
      </div>
      {!todo.uncompleted && (
        <div className="todo-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              editTodo(todo.id, todo.text, todo.deadline);
            }}
            className="edit-button"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
            className="delete-button"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
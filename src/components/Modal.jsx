import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onSave, value, setValue, deadline, setDeadline }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="modal-input"
          placeholder="Edit task"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button className="modal-button save" onClick={onSave}>
            Save
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
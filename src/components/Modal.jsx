// filepath: src/components/Modal.jsx
import React from 'react';
import '../styles/Modal.css'; // Add styles for the modal

const Modal = ({ isOpen, onClose, onSave, value, setValue }) => {
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
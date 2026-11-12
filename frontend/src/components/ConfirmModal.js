import React, { useEffect } from 'react';

/**
 * Confirmation dialog shown before a task is deleted.
 *
 * @param {Object} props
 * @param {Object} props.task - The task that is about to be deleted
 * @param {Function} props.onConfirm - Called when the user confirms
 * @param {Function} props.onCancel - Called when the user cancels or presses Escape
 */
const ConfirmModal = ({ task, onConfirm, onCancel }) => {
  // Let the user close the dialog with the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="modal-title">Delete this task?</h3>
        <p>
          "<strong>{task.title}</strong>" will be removed permanently.
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Keep it
          </button>
          <button className="btn btn-delete" onClick={onConfirm}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
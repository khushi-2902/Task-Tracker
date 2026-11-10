import React, { useEffect, useState } from 'react';
import {
  PRIORITIES,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from '../utils/constants';

const EMPTY_FORM = { title: '', description: '', priority: 'medium' };

/**
 * Form used for both adding and editing a task.
 * When `taskToEdit` is set the form switches to edit mode.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with the form data when valid
 * @param {Object|null} props.taskToEdit - Task being edited, or null
 * @param {Function} props.onCancelEdit - Leaves edit mode
 */
const TaskForm = ({ onSubmit, taskToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const isEditing = Boolean(taskToEdit);

  // Fill the form when a task is picked for editing, reset when edit ends
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        priority: taskToEdit.priority,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setError('');
  }, [taskToEdit]);

  /**
   * Keeps the form state in sync with the inputs
   * @param {Event} event - Change event from an input
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validates and submits the form
   * @param {Event} event - Submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    try {
      await onSubmit({ ...formData, title: formData.title.trim() });
      if (!isEditing) setFormData(EMPTY_FORM);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit task' : 'Add a new task'}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="e.g. Finish the React assignment"
        value={formData.title}
        maxLength={TITLE_MAX_LENGTH}
        onChange={handleChange}
      />

      <label htmlFor="description">Description (optional)</label>
      <textarea
        id="description"
        name="description"
        rows="3"
        placeholder="Add a few details..."
        value={formData.description}
        maxLength={DESCRIPTION_MAX_LENGTH}
        onChange={handleChange}
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        {PRIORITIES.map((level) => (
          <option key={level} value={level}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </option>
        ))}
      </select>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save changes' : 'Add task'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

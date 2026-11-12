import React from 'react';
import { formatDate } from '../utils/format-date';

/**
 * A single task card with complete, edit and delete actions.
 * The left border colour follows the task priority.
 *
 * @param {Object} props
 * @param {Object} props.task - The task to show
 * @param {Function} props.onToggle - Called with the task id to flip completion
 * @param {Function} props.onEdit - Called with the task to start editing
 * @param {Function} props.onDelete - Called with the task to delete it
 */
const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const doneClass = task.completed ? 'task-item--done' : '';

  return (
    <li className={`task-item task-item--${task.priority} ${doneClass}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'complete'}`}
      />

      <div className="task-content">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <span className={`badge badge-${task.priority}`}>{task.priority}</span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <small className="task-date">Added {formatDate(task.createdAt)}</small>
      </div>

      <div className="task-actions">
        <button className="btn btn-small" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
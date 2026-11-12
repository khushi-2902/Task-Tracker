import React from 'react';
import TaskItem from './TaskItem';

// Message shown when the selected filter has no tasks
const EMPTY_MESSAGES = {
  all: { icon: '📝', text: 'No tasks yet. Add your first one on the left!' },
  pending: { icon: '🎉', text: 'Nothing pending. Nice work!' },
  completed: { icon: '⏳', text: 'No completed tasks yet. Tick one off when it is done.' },
};

/**
 * Renders the list of tasks, or a friendly message when there are none.
 *
 * @param {Object} props
 * @param {Array} props.tasks - Tasks to show
 * @param {string} props.filter - Active filter, used to pick the empty message
 * @param {boolean} props.loading - True while tasks are being fetched
 * @param {Function} props.onToggle - Passed through to TaskItem
 * @param {Function} props.onEdit - Passed through to TaskItem
 * @param {Function} props.onDelete - Passed through to TaskItem
 */
const TaskList = ({ tasks, filter, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    const { icon, text } = EMPTY_MESSAGES[filter] || EMPTY_MESSAGES.all;
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">{icon}</span>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
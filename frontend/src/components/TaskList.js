import React from 'react';
import TaskItem from './TaskItem';

/**
 * Renders the list of tasks, or a friendly message when there are none.
 *
 * @param {Object} props
 * @param {Array} props.tasks - Tasks to show
 * @param {boolean} props.loading - True while tasks are being fetched
 * @param {Function} props.onToggle - Passed through to TaskItem
 * @param {Function} props.onEdit - Passed through to TaskItem
 * @param {Function} props.onDelete - Passed through to TaskItem
 */
const TaskList = ({ tasks, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks here yet. Add one to get started!</p>;
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

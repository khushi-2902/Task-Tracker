import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import StatsBar from '../components/StatsBar';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import * as TaskService from '../services/task-service';
import { filterTasks, getTaskCounts } from '../utils/filter-tasks';

/**
 * Main page. Owns the task state and talks to the API through TaskService,
 * so the child components stay simple and reusable.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Loads all tasks from the server. Filtering happens on the client,
   * which keeps the counts accurate and the filter instant.
   */
  const loadTasks = useCallback(async () => {
    try {
      const data = await TaskService.getTasks('all');
      setTasks(data);
      setError('');
    } catch (err) {
      setError(`Could not load tasks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load tasks once when the page opens
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Shows a toast message
   * @param {string} message - Text to show
   * @param {string} [type='success'] - 'success' or 'error'
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Stable function so the Toast timer is not reset on every render
  const closeToast = useCallback(() => setToast(null), []);

  /**
   * Creates a new task or saves edits, depending on the current mode.
   * Errors are thrown back to TaskForm so it can show them under the form.
   * @param {Object} formData - Data from TaskForm
   */
  const handleSubmit = async (formData) => {
    if (taskToEdit) {
      await TaskService.updateTask(taskToEdit._id, formData);
      setTaskToEdit(null);
      showToast('Task updated');
    } else {
      await TaskService.createTask(formData);
      showToast('Task added');
    }
    await loadTasks();
  };

  /**
   * Marks a task complete or pending
   * @param {string} id - Task id
   */
  const handleToggle = async (id) => {
    try {
      const updated = await TaskService.toggleTask(id);
      showToast(updated.completed ? 'Task completed' : 'Task moved back to pending');
      await loadTasks();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  /**
   * Deletes the task chosen in the confirmation dialog
   */
  const handleConfirmDelete = async () => {
    const { _id: id } = taskToDelete;
    setTaskToDelete(null);

    try {
      await TaskService.deleteTask(id);
      // If the deleted task was being edited, leave edit mode
      if (taskToEdit && taskToEdit._id === id) setTaskToEdit(null);
      showToast('Task deleted');
      await loadTasks();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  /**
   * Puts a task into the form for editing and scrolls to the top
   * @param {Object} task - Task to edit
   */
  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const counts = getTaskCounts(tasks);
  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Plan your day, tick things off, stay on top of it.</p>
      </header>

      <main className="app-layout">
        <section className="panel">
          <TaskForm
            onSubmit={handleSubmit}
            taskToEdit={taskToEdit}
            onCancelEdit={() => setTaskToEdit(null)}
          />
        </section>

        <section className="panel">
          <StatsBar counts={counts} />
          <FilterBar activeFilter={filter} onFilterChange={setFilter} counts={counts} />
          {error && <p className="form-error">{error}</p>}
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            loading={loading}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={setTaskToDelete}
          />
        </section>
      </main>

      {taskToDelete && (
        <ConfirmModal
          task={taskToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
};

export default Home;
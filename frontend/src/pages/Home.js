import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import * as TaskService from '../services/task-service';

/**
 * Main page. Owns the task state and talks to the API through TaskService,
 * so the child components stay simple and reusable.
 */
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Loads tasks for the current filter from the server
   */
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TaskService.getTasks(filter);
      setTasks(data);
      setError('');
    } catch (err) {
      setError(`Could not load tasks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Reload whenever the filter changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Creates a new task or saves edits, depending on the current mode
   * @param {Object} formData - Data from TaskForm
   */
  const handleSubmit = async (formData) => {
    if (taskToEdit) {
      await TaskService.updateTask(taskToEdit._id, formData);
      setTaskToEdit(null);
    } else {
      await TaskService.createTask(formData);
    }
    await loadTasks();
  };

  /**
   * Marks a task complete or pending
   * @param {string} id - Task id
   */
  const handleToggle = async (id) => {
    try {
      await TaskService.toggleTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Deletes a task after the user confirms
   * @param {string} id - Task id
   */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await TaskService.deleteTask(id);
      // If the deleted task was being edited, leave edit mode
      if (taskToEdit && taskToEdit._id === id) setTaskToEdit(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Keep track of what needs doing.</p>
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
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
          {error && <p className="form-error">{error}</p>}
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;

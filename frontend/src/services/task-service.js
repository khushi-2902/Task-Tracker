const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TASKS_URL = `${API_URL}/tasks`;

/**
 * Wrapper around fetch that parses JSON and throws a readable error
 * when the server responds with a non-2xx status.
 * @param {string} url - Request URL
 * @param {Object} [options] - fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
const request = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

/**
 * Fetches tasks, optionally filtered by status.
 * @param {string} [status='all'] - 'all', 'pending' or 'completed'
 */
export const getTasks = (status = 'all') =>
  request(`${TASKS_URL}?status=${status}`);

/**
 * Creates a new task.
 * @param {Object} taskData - { title, description, priority }
 */
export const createTask = (taskData) =>
  request(TASKS_URL, { method: 'POST', body: JSON.stringify(taskData) });

/**
 * Updates an existing task.
 * @param {string} id - Task id
 * @param {Object} taskData - { title, description, priority }
 */
export const updateTask = (id, taskData) =>
  request(`${TASKS_URL}/${id}`, { method: 'PUT', body: JSON.stringify(taskData) });

/**
 * Toggles the completed flag of a task.
 * @param {string} id - Task id
 */
export const toggleTask = (id) =>
  request(`${TASKS_URL}/${id}/toggle`, { method: 'PATCH' });

/**
 * Deletes a task.
 * @param {string} id - Task id
 */
export const deleteTask = (id) =>
  request(`${TASKS_URL}/${id}`, { method: 'DELETE' });

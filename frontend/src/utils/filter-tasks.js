/**
 * Returns only the tasks that match the selected status filter.
 * @param {Array} tasks - All tasks
 * @param {string} status - 'all', 'pending' or 'completed'
 * @returns {Array} Filtered tasks
 */
export const filterTasks = (tasks, status) => {
  if (status === 'completed') return tasks.filter((task) => task.completed);
  if (status === 'pending') return tasks.filter((task) => !task.completed);
  return tasks;
};

/**
 * Counts tasks by status, used for the stats bar and the filter pills.
 * @param {Array} tasks - All tasks
 * @returns {{all: number, pending: number, completed: number}}
 */
export const getTaskCounts = (tasks) => {
  const completed = tasks.filter((task) => task.completed).length;
  return {
    all: tasks.length,
    pending: tasks.length - completed,
    completed,
  };
};
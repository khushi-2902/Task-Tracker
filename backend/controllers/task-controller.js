const mongoose = require('mongoose');
const Task = require('../models/Task');

/**
 * Checks that an id from the URL is a valid MongoDB ObjectId.
 * @param {string} id - The id to check
 * @returns {boolean}
 */
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * GET /api/tasks?status=all|completed|pending
 * Returns tasks (newest first), optionally filtered by status.
 */
const getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status === 'completed') filter.completed = true;
    if (status === 'pending') filter.completed = false;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/tasks
 * Creates a new task from the request body.
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({ title, description, priority });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Updates the editable fields of a task.
 */
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const { title, description, priority } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, priority },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/tasks/:id/toggle
 * Flips the completed flag of a task.
 */
const toggleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Removes a task permanently.
 */
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted', id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, toggleTask, deleteTask };

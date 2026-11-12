require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/task-routes');
const { notFound, errorHandler } = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.json({ message: 'Task Tracker API is running' }));
app.use('/api/tasks', taskRoutes);

// Error handling (must come after the routes)
app.use(notFound);
app.use(errorHandler);

// Connect to the database first, then start listening
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

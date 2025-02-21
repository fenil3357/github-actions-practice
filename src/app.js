const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
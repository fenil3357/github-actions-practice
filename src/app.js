const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/tasks', taskRoutes);

app.get('/error', () => {
  console.log('Simulating an error!');
  throw new Error('Some error occurred!!!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if(req) console.log();
  if(next) console.log();
  console.log('Error:', err?.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
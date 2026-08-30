const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notificationRoutes = require('./routes/notification.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Notification Service', timestamp: new Date() });
});

// Routes
app.use('/api/notifications', notificationRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;

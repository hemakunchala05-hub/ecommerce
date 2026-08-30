
const userRoutes = require('./routes/user.routes');
const express = require("express");


const app = express();


app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'User Service', timestamp: new Date() });
});

// Mount user routes to support gateway (/api/users) and direct service calls (/users, /user)

app.use('/user', userRoutes);

// Error handling middleware


module.exports = app;


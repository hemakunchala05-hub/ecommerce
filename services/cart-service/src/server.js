const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5002;



const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Cart Service running on port ${PORT}`);
  });
};

startServer();
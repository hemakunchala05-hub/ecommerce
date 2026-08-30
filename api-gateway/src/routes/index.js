const express = require("express");
const axios = require("axios");

const router = express.Router();

// User Service
router.post("/users/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/register`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data);
    }

    res.status(503).json({
      success: false,
      message: "User service is unavailable"
    });
  }
});


// User Login
router.post("/users/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/login`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data);
    }

    res.status(503).json({
      success: false,
      message: "User service is unavailable"
    });
  }
});


// Get User Profile
router.get("/users/profile", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/users/profile`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data);
    }

    res.status(503).json({
      success: false,
      message: "User service is unavailable"
    });
  }
});


// Update User Profile
router.put("/users/profile", async (req, res) => {
  try {
    const response = await axios.put(
      `${process.env.USER_SERVICE_URL}/users/profile`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data);
    }

    res.status(503).json({
      success: false,
      message: "User service is unavailable"
    });
  }
});


module.exports = router;
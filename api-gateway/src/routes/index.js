const express = require("express");
const axios = require("axios");

const router = express.Router();


// ===============================
// USER SERVICE - REGISTER
// ===============================

router.post("/register", async (req, res) => {
    console.log("🔥 Gateway /users/register HIT");
    console.log("📦 Gateway body:", req.body);
    console.log("🔗 User service URL:", process.env.USER_SERVICE_URL);

    try {
        console.log("🚀 Gateway → User Service");

        const response = await axios.post(
            `${process.env.USER_SERVICE_URL}/register`,
            req.body
        );

        console.log("✅ User Service responded:", response.status);
        console.log("📨 Response:", response.data);

        return res
            .status(response.status)
            .json(response.data);

    } catch (error) {
        console.log(
            "❌ Register error:",
            error.response?.data || error.message
        );

        if (error.response) {
            return res
                .status(error.response.status)
                .json(error.response.data);
        }

        return res.status(503).json({
            success: false,
            message: "User service is unavailable"
        });
    }
});


// ===============================
// USER SERVICE - LOGIN
// ===============================

router.post("/login", async (req, res) => {
    console.log("🔥 Gateway /users/login HIT");
    console.log("📦 Gateway body:", req.body);
    console.log("🔗 User service URL:", process.env.USER_SERVICE_URL);

    try {
        console.log("🚀 Gateway → User Service");

        const response = await axios.post(
            `${process.env.USER_SERVICE_URL}/login`,
            req.body
        );

        console.log("✅ User Service responded:", response.status);
        console.log("📨 Response:", response.data);

        return res
            .status(response.status)
            .json(response.data);

    } catch (error) {
        console.log(
            "❌ Login error:",
            error.response?.data || error.message
        );

        if (error.response) {
            return res
                .status(error.response.status)
                .json(error.response.data);
        }

        return res.status(503).json({
            success: false,
            message: "User service is unavailable"
        });
    }
});


module.exports = router;

// Get User Profile
router.get("/profile", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/profile`,
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
router.put("/profile", async (req, res) => {
  try {
    const response = await axios.put(
      `${process.env.USER_SERVICE_URL}/profile`,
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
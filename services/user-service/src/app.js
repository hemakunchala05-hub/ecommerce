const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log("👤 User Service:", req.method, req.url);
    console.log("📦 Body:", req.body);
    next();
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "User Service",
        timestamp: new Date()
    });
});

// User routes
app.use("/", userRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error("❌ User Service Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

module.exports = app;
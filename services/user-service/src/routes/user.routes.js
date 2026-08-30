// Phase 1: Define your User routes h// Phase 1: Define your User routes here

const express = require("express");

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);


module.exports = router;
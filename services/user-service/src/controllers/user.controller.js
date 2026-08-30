// Phase 1: Write your user registration, login, and profile controller logic here
const {
    registerUser: registerUserService,
    loginUser: loginUserService,
    getProfile: getProfileService,
    updateProfile: updateProfileService
} = require("../services/auth.service");
const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }

        const user = await registerUserService(
            name,
            email,
            password,
            role
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUserService(
            email,
            password
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            ...result
        });

    } catch (error) {
        const statusCode = error.statusCode || 401;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token'
            });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateProfile = async (req, res) => {
    try {
       const { name, email } = req.body;

const updatedUser = await updateProfileService(
  req.user.id,
  name,
  email
); 
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};
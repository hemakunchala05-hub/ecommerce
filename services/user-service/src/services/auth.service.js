const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};


const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};


const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


const updateProfile = async (userId, name, email) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    user.email = email;
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
};
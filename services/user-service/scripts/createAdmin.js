require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/user.model");

const createAdmin = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } =
      process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGO_URI) {
      throw new Error(
        "Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD and MONGO_URI before running."
      );
    }

    await mongoose.connect(MONGO_URI);

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        "This email already exists. No account or role was changed."
      );
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      name: ADMIN_NAME.trim(),
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin account created successfully: ${email}`);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
};

createAdmin();
const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Import the User model

const router = express.Router();

// POST /signup route for registering a new user
router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Optional: Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User already exists with this email" });
    }

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      password: hashedPassword,
    });

    // Send back the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .send({ message: "Failed to register user", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Import the User model

const router = express.Router();

// POST /signup route for registering a new user
router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // check if user already exists
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

// POST /login route for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Login failed: User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Login failed: Incorrect password" });
    }

    // Assuming session middleware is set up
    req.session.userId = user.id; // Save user id in the session
    console.log("this is a test"); // Add this line to check session setting
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Failed to log in", error: error.message });
  }
});

// GET /check if user is logged in already
router.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
    console.log("testing");
  }
});

module.exports = router;

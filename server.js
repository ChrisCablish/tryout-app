const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const authRoutes = require("./routes/authRoutes"); // Import auth routes

// Middleware to parse JSON bodies and URL-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: "secret", // use a real secret in production
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Defining a passport strategy
const users = []; // This should eventually be a user database

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Include authRoutes for handling authentication-related routes
app.use("/api", authRoutes);

require("./startup/routes")(app); // Separates route handling
require("./startup/db")(); // Handles database connection and synchronization

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

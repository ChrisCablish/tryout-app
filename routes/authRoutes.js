const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Logged in");
});

module.exports = router;
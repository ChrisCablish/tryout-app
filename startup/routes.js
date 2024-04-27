const express = require("express");
const authRoutes = require("../routes/authRoutes");

module.exports = function (app) {
  app.use("/api/auth", authRoutes);
  // Additional routes can be added here
  // You can also add route-specific middleware if needed

  //global error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
};

const { sequelize } = require("../models/index");

module.exports = function () {
  sequelize
    .sync({ force: true }) // Consider using { force: false } in production
    .then(() => console.log("Database & tables created!"))
    .catch((err) =>
      console.error("Failed to create database and tables:", err)
    );
};

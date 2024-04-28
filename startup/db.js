const { sequelize, User, Group } = require("../models");

module.exports = function () {
  // Define the many-to-many relationships
  User.belongsToMany(Group, { through: "UserGroups" });
  Group.belongsToMany(User, { through: "UserGroups" });

  sequelize
    .sync({ force: true }) // Consider using { force: false } in production
    .then(() => console.log("Database & tables created!"))
    .catch((err) =>
      console.error("Failed to create database and tables:", err)
    );
};

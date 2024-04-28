module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      publicGroupId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "groups", // Ensure the table name is correctly pluralized or as you want it
      underscored: true, // Ensures that auto-generated fields are snake_cased
    }
  );

  return Group;
};

// use nanoid to generate unique 7 digit public id's when necessary
// const { customAlphabet } = require('nanoid');
// const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

// // When creating a group
// const newGroup = await Group.create({
//   name: "New Ensemble",
//   publicGroupId: nanoid()  // Generates something like "5H7R12Z"
// });

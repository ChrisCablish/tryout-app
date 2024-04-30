module.exports = (sequelize, DataTypes) => {
  const UserGroupSection = sequelize.define(
    "UserGroupSection",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
      },
      sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sections",
          key: "id",
        },
      },
    },
    {
      tableName: "user_group_section",
      underscored: true,
      indexes: [
        {
          fields: ["userId", "groupId"],
        },
        {
          fields: ["sectionId"],
        },
      ],
    }
  );

  return UserGroupSection;
};

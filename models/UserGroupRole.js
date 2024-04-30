module.exports = (sequelize, DataTypes) => {
  const UserGroupRole = sequelize.define(
    "UserGroupRole",
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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      tableName: "user_group_roles",
      underscored: true,
      indexes: [
        {
          fields: ["userId"],
        },
        {
          fields: ["groupId"],
        },
        {
          fields: ["roleId"],
        },
      ],
    }
  );

  return UserGroupRole;
};

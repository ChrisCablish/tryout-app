module.exports = (sequelize, DataTypes) => {
  const UserGroupAttributes = sequelize.define(
    "UserGroupAttributes",
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
      attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "attributes",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user_group_attributes",
      underscored: true,
      indexes: [
        {
          fields: ["userId", "groupId"],
        },
        {
          fields: ["attributeId"],
        },
      ],
    }
  );

  return UserGroupAttributes;
};

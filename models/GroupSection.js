module.exports = (sequelize, DataTypes) => {
  const GroupSection = sequelize.define(
    "GroupSection",
    {
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
      tableName: "group_section",
      underscored: true,
      indexes: [
        {
          fields: ["groupId", "sectionId"],
          unique: true, // Ensuring that each combination of groupId and sectionId is unique
        },
      ],
    }
  );

  return GroupSection;
};

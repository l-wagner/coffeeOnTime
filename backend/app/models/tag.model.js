module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
    },
  });

  return Tag;
};

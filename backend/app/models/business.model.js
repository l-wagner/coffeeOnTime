module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('business', {
    name: {
      type: DataTypes.STRING,
    },
    nameForTags: {
      type: DataTypes.STRING,
    },
  });
  return Business;
};

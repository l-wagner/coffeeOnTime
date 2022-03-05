module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    days: {
      type: DataTypes.TEXT,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
  });

  return Shift;
};

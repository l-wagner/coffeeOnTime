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
    shiftConfig: {
      // "any", "all"
      type: DataTypes.STRING,
    },
  });

  return Shift;
};

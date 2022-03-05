module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('shift', {
    startDate: {
      type: DataTypes.DATE,
    },
    endEnd: {
      type: DataTypes.DATE,
    },
  });

  return Schedule;
};

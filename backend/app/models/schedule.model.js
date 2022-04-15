module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    startDate: {
      type: DataTypes.DATE,
    },
    endEnd: {
      type: DataTypes.DATE,
    },
  });

  
  return Schedule;
};

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    columns:{
      type: DataTypes.JSON,
    },
    config:{
      type: DataTypes.JSON,
    },
    rows:{
      type: DataTypes.JSON,
    },
    rowLabels:{
      type: DataTypes.JSON,
    }
  });

  
  return Schedule;
};

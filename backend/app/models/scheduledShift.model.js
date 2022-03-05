// Employees use the tag needed by this specific shift, not necessarily all their tags

module.exports = (sequelize, DataTypes) => {
  const ScheduledShift = sequelize.define('scheduledShift', {
    employee: {
      type: DataTypes.INTEGER,
    },
    employeeAsTag: {
      type: DataTypes.INTEGER,
    },
  });

  return ScheduledShift;
};

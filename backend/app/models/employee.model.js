module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    blockedDays: {
      type: DataTypes.TEXT,
    },
  });

  return Employee;
};

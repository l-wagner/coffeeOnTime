module.exports = (sequelize, DataTypes) => {
  const RTO = sequelize.define('rto', {
    day: {
      type: DataTypes.DATE,
    },
    status: {
      // 'pending', 'approved', 'rejected'
      type: DataTypes.STRING(30),
    },
  });

  return RTO;
};

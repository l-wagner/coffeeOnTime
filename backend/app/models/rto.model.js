module.exports = (sequelize, DataTypes) => {
  const RTO = sequelize.define('rto', {
    date: {
      type: DataTypes.DATE,
    },
  });

  return RTO;
};

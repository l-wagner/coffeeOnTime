const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  logging: false,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
let dbEmployee = require('./employee.model.js')(sequelize, Sequelize.DataTypes);
let dbRTO = require('./rto.model.js')(sequelize, Sequelize.DataTypes);
let dbTag = require('./tag.model.js')(sequelize, Sequelize.DataTypes);
let dbShift = require('./shift.model.js')(sequelize, Sequelize.DataTypes);
let dbBusiness = require('./business.model.js')(sequelize, Sequelize.DataTypes);
let dbSchedule = require('./schedule.model.js')(sequelize, Sequelize.DataTypes);

dbEmployee.belongsToMany(dbTag, { through: 'employeeTags' });
dbEmployee.hasMany(dbRTO, { onDelete: 'CASCADE' });

dbTag.belongsToMany(dbEmployee, { through: 'employeeTags' });
dbTag.belongsToMany(dbShift, { through: 'shiftTags' });

dbBusiness.hasMany(dbEmployee, { onDelete: 'CASCADE' });
dbBusiness.hasMany(dbSchedule, { onDelete: 'CASCADE' });
dbBusiness.hasMany(dbTag, { onDelete: 'CASCADE' });
dbBusiness.hasMany(dbShift, { onDelete: 'CASCADE' });

// dbSchedule.hasMany(dbScheduledShift);

dbShift.belongsToMany(dbTag, { through: 'shiftTags' });

db.employee = dbEmployee;
db.tag = dbTag;
db.shift = dbShift;
db.business = dbBusiness;
db.schedule = dbSchedule;

module.exports = db;

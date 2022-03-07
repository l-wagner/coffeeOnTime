const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
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
let dbTag = require('./tag.model.js')(sequelize, Sequelize.DataTypes);
let dbShift = require('./shift.model.js')(sequelize, Sequelize.DataTypes);
let dbBusiness = require('./business.model.js')(sequelize, Sequelize.DataTypes);
let dbSchedule = require('./schedule.model.js')(sequelize, Sequelize.DataTypes);
let dbScheduledShift = require('./scheduledShift.model.js')(sequelize, Sequelize.DataTypes);

dbEmployee.belongsToMany(dbTag, { through: 'employeeTags' });

dbTag.belongsToMany(dbEmployee, { through: 'employeeTags' });
dbTag.belongsToMany(dbShift, { through: 'shiftTags' });

dbBusiness.hasMany(dbEmployee);
dbBusiness.hasMany(dbSchedule);
dbBusiness.hasMany(dbTag);

dbSchedule.hasMany(dbScheduledShift);

dbShift.belongsToMany(dbSchedule, { through: 'scheduleShifts' });
dbShift.belongsToMany(dbTag, { through: 'shiftTags' });
dbShift.hasMany(dbScheduledShift);

dbScheduledShift.belongsTo(dbShift);

db.employee = dbEmployee;
db.tag = dbTag;
db.shift = dbShift;
db.business = dbBusiness;
db.scheduledShift = dbScheduledShift;

module.exports = db;

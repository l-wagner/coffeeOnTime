var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Shift = db.shift;

const Schedule = db.schedule;
const Employee = db.employee;
const apiResponse = require('../util/apiResponse.js');
const { body, param, validationResult } = require('express-validator');

exports.fill = [
  body('startDate').not().isEmpty().trim(),
  body('endDate').isInt().not().isEmpty().trim(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    // Pull and add tags
    const tags = req.body.tags.split(',');
    Employee.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
      .then((tagsToAdd) => {
        Employee.create({
          firstName: req.body.firstName,
          days: req.body.days || null,
          businessId: req.body.business,
        }).then((employee) => {
          // still running when response returned, should fix
          tagsToAdd.forEach((tag) => employee.addTag(tag));
          employee.days = employee.days?.split(',');

          apiResponse.successData(res, `${employee.firstName} was added.`, employee);
        });
      })
      .catch((e) => apiResponse.error(res, `Employee could not be added due to: ${e}`));
  },
];

// Create and Save a new Schedule
exports.add = [
  body('business').isInt().not().isEmpty().trim(),
  body('name').not().isEmpty().trim(),
  body('startTime').not().isEmpty().trim(),
  body('endTime').not().isEmpty().trim(),
  body('description').trim(),
  body('days').trim(),
  body('schedules').trim(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = '';
      errors.array().map((error) => (msg += error.param + ' invalid. '));
      return apiResponse.validationError(res, { errors: errors.array(), msg: errors.array() }, 400);
    }

    // Pull and add schedules
    const schedules = req.body.schedules?.split(',');
    Schedule.findAll({ where: { id: { [Sequelize.Op.in]: schedules } } })
      .then((schedulesToAdd) => {
        Schedule.create({
          name: req.body.name,
          description: req.body.description || null,
          days: req.body.days || null,
          startTime: req.body.startTime || null,
          endTime: req.body.endTime || null,
          businessId: req.body.business,
        })
          .then((shift) => {
            // still running when response returned, should fix
            schedulesToAdd.forEach((schedule) => shift.addSchedule(schedule));
            apiResponse.successData(res, `${shift.name} was added.`, shift);
          })
          .catch((e) => apiResponse.error(res, `Schedule could not be added due to: ${e}`));
      })
      .catch((e) => apiResponse.error(res, `Schedule could not be added due to: ${e}`));
  },
];

// Retrieve all Schedules from the database
exports.findAll = (req, res) => {
  Schedule.findAll({ include: Schedule }).then((shifts) => {
    // change blocked days to array
    shifts.map((shift) => (shift.days = shift.days?.split(',')));
    apiResponse.successData(res, `${Object.keys(shifts).length} shifts found.`, shifts);
  });
};

// Find a single Schedule by Id
exports.findOne = (req, res) => {
  Schedule.findByPk(req.params.id)
    .then((shift) => {
      // req.body.schedules && (shift.schedules = req.body.schedules.join(','));
      apiResponse.successData(res, shift);
    })
    .catch(() => apiResponse.notFoundResponse(res, 'Schedule not found.'));
};

// Update an Schedule
exports.update = [
  param('id').not().isEmpty().trim(),
  body('data').trim(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    Schedule.findByPk(req.params.id)
      .then((shift) => {
        req.body.name && (shift.name = req.body.name);
        req.body.description && (shift.description = req.body.description);
        req.body.days && (shift.days = req.body.days);
        req.body.startTime && (shift.startTime = req.body.startTime);
        req.body.endTime && (shift.endTime = req.body.endTime);
        shift
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Schedule could not be updated.'));
      })
      .catch((e) => apiResponse.error(res, `Schedule not found. Error: ${e}`));
  },
];

exports.updateSchedules = [
  param('id').not().isEmpty().trim(),
  body('schedules').trim(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    const schedules = req.body.schedules.split(',');
    Schedule.findByPk(req.params.id).then((shift) => {
      //remove all schedules from shift TODO actually compare schedules
      Schedule.findAll({ where: { id: { [Sequelize.Op.notIn]: schedules } } })
        .then((schedulesToRemove) => {
          shift.removeSchedules(schedulesToRemove);

          Schedule.findAll({ where: { id: { [Sequelize.Op.in]: schedules } } })
            .then((schedulesToAdd) => {
              shift.addSchedules(schedulesToAdd);
              apiResponse.successData(res, `${schedules.length} schedules updated.`, shift);
            })
            .catch(() => apiResponse.error(res, 'Schedules could not be added.'));
        })
        .catch(() => apiResponse.error(res, 'Schedules could not be removed.'));
    });
  },
];

// Delete a Schedule with the specified id in the request

exports.delete = [
  param('id').not().isEmpty().trim(),
  (req, res) => {
    Schedule.destroy({ where: { id: req.params.id } })
      .then(() => apiResponse.successMsg(res, 'Schedule fired successfully.'))
      .catch((e) => apiResponse.error(res, `Schedule could not be added due to: ${e}`));
  },
];

// Delete all Schedules from the database.
exports.deleteAll = (req, res) => {
  Schedule.destroy({ where: { id: { $gte: 0 } } })
    .then(() => apiResponse.successMsg(res, 'Schedule fired successfully.'))
    .catch((e) => apiResponse.error(res, `Schedule could not be added due to: ${e}`));
};

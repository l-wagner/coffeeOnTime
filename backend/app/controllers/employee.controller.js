const util = require('util');
var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Employee = db.employee;

const Tag = db.tag;
const apiResponse = require('../util/apiResponse.js');
const { body, param, validationResult } = require('express-validator');

// Create and Save a new Employee
exports.add = [
  body('firstName').not().isEmpty().trim(),
  body('business').isInt().not().isEmpty().trim(),
  body('days').trim(),
  body('tags').trim(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    // Pull and add tags
    const tags = req.body.tags.split(',');
    Tag.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
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

// Retrieve all Employees from the database
exports.findAll = (req, res) => {
  Employee.findAll({ include: Tag }).then((employees) => {
    // change blocked days to array
    employees.map((employee) => (employee.days = employee.days?.split(',')));
    apiResponse.successData(res, `${Object.keys(employees).length} employees found.`, employees);
  });
};

// Find a single Employee by Id
exports.findOne = (req, res) => {
  Employee.findByPk(req.params.id)
    .then((employee) => {
      // req.body.tags && (employee.tags = req.body.tags.join(','));
      apiResponse.successData(res, employee);
    })
    .catch(() => apiResponse.notFoundResponse(res, 'Employee not found.'));
};

// Update an Employee
exports.update = [
  param('id').not().isEmpty().trim(),
  body('data').trim(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    Employee.findByPk(req.params.id)
      .then((employee) => {
        req.body.firstName && (employee.firstName = req.body.firstName);
        req.body.lastName && (employee.lastName = req.body.lastName);
        req.body.days && (employee.days = req.body.days);
        employee
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Employee could not be updated.'));
      })
      .catch((e) => apiResponse.error(res, `Employee not found. Error: ${e}`));
  },
];

exports.updateTags = [
  param('id').not().isEmpty().trim(),
  body('tags').trim(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    const tags = req.body.tags.split(',');
    Employee.findByPk(req.params.id).then((employee) => {
      //remove all tags from employee TODO actually compare tags
      Tag.findAll({ where: { id: { [Sequelize.Op.notIn]: tags } } })
        .then((tagsToRemove) => {
          employee.removeTags(tagsToRemove);

          Tag.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
            .then((tagsToAdd) => {
              employee.addTags(tagsToAdd);
              apiResponse.successData(res, `${tags.length} tags updated.`, employee);
            })
            .catch(() => apiResponse.error(res, 'Tags could not be added.'));
        })
        .catch(() => apiResponse.error(res, 'Tags could not be removed.'));
    });
  },
];

// Delete a Employee with the specified id in the request

exports.delete = [
  param('id').not().isEmpty().trim(),
  (req, res) => {
    Employee.destroy({ where: { id: req.params.id } })
      .then(() => apiResponse.successMsg(res, 'Employee fired successfully.'))
      .catch((e) => apiResponse.error(res, `Employee could not be added due to: ${e}`));
  },
];

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({ where: { id: { $gte: 0 } } })
    .then(() => apiResponse.successMsg(res, 'Employee fired successfully.'))
    .catch((e) => apiResponse.error(res, `Employee could not be added due to: ${e}`));
};

const util = require('util');
var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Employee = db.employee;
const Business = db.business;
const Tag = db.tag;
const apiResponse = require('../util/apiResponse.js');
const { body, query, validationResult } = require('express-validator');
const { employee } = require('../models/db.js');

// Create and Save a new Employee
exports.add = [
  body('firstName').not().isEmpty().trim().escape(),
  body('business').isInt().not().isEmpty().trim().escape(),
  body('blockedDays').trim().escape(),
  body('tags').trim().escape(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }
    console.log(req.body);

    // Pull and add tags
    const tags = req.body.tags.split(',');
    Tag.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
      .then((tagsToAdd) => {
        Employee.create({
          firstName: req.body.firstName,
          blockedDays: req.body.blockedDays || null,
          businessId: req.body.business,
        }).then((employee) => {
          tagsToAdd.forEach((tag) => employee.addTag(tag));
          employee.blockedDays = employee.blockedDays?.split(',');
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
    employees.map((employee) => (employee.blockedDays = employee.blockedDays?.split(',')));

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

// find all active Employees
exports.findAllPublished = (req, res) => {
  Employee.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving employees.',
      });
    else res.send(data);
  });
};

// Update an Employee
exports.update = [
  query('id').not().isEmpty().trim().escape(),
  body('data').trim().escape(),
  (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    console.log(req.body);

    Employee.findByPk(req.params.id)
      .then((employee) => {
        req.body.firstName && (employee.firstName = req.body.firstName);
        req.body.lastName && (employee.lastName = req.body.lastName);
        employee
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Employee could not be updated.'));
      })
      .catch((err) => {
        console.log(err);
        apiResponse.notFoundResponse(res, 'Employee not found.');
      });
  },
];

// Update an Employee's blocked days identified by the id in the request
exports.updateDays = [
  query('id').not().isEmpty().trim().escape(),
  body('data').trim().escape(),
  (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }

    Employee.findByPk(req.params.id)
      .then((employee) => {
        req.body.blockedDays && (employee.blockedDays = req.body.blockedDays.join(','));
        employee
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Employee could not be updated.'));
      })
      .catch((err) => {
        console.log(err);
        apiResponse.notFoundResponse(res, 'Employee not found.');
      });
  },
];

exports.updateTags = [
  query('id').not().isEmpty().trim().escape(),
  body('tags').trim().escape(),
  (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
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
  query('id').not().isEmpty().trim().escape(),
  (req, res) => {
    Employee.destroy({ where: { id: req.params.id } })
      .then((data) => {
        res.send({ message: `Employee was deleted successfully!` });
      })
      .catch((err) => {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Could not delete Employee with id ' + req.params.id,
          });
        }
      });
  },
];

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all employees.',
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};

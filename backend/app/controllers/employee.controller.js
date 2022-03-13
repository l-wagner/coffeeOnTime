const util = require('util');
var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Employee = db.employee;
const Tag = db.tag;
const apiResponse = require('../util/apiResponse.js');
const { body, query, validationResult } = require('express-validator');
const { employee } = require('../models/db.js');

// Create and Save a new Employee
exports.add = [
  body('name').not().isEmpty().trim().escape(),
  body('blockedDays').trim().escape(),
  body('tags').trim().escape(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    let tags = req.body.tags.split(',');
    Tag.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: tags,
        },
      },
    }).then((tagsToAdd) => {
      if (!tagsToAdd) {
        res.status(500).send({
          message: err.message || 'The selected tags are unavailable.',
        });
      }
      Employee.create({
        firstName: req.body.name,
        blockedDays: req.body.blockedDays || null,
        active: req.body.active || true,
      })
        .then((employee) => {
          tagsToAdd.forEach((tag) => employee.addTag(tag));

          Employee.findAll({ where: { id: employee.id }, include: Tag }).then((employee) => {
            res.send(employee);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: err.message || 'Error occurred while creating the Employee.',
          });
        });
    });
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
  Employee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Employee with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
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

// Update a Employee identified by the id in the request
exports.update = [
  body('id').not().isEmpty().trim().escape(),
  body('blockedDays').trim().escape(),
  body('tags').trim().escape(),
  (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
    }
    Employee.findByPk(req.body.id)
      .then((employee) => {
        req.body.blockedDays && (employee.blockedDays = req.body.blockedDays.join(','));
        // req.body.tags && (employee.tags = req.body.tags.join(','));
        employee
          .save()
          .then((result) => apiResponse.successData(res, ''))
          .catch(() => apiResponse.notFoundResponse(res, 'Employee could not be updated.'));
      })
      .catch(() => apiResponse.notFoundResponse(res, 'Employee not found.'));
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

const db = require('../models/db.js');
const Employee = db.employee;
const apiResponse = require('../util/apiResponse.js');
const { body, query, validationResult } = require('express-validator');

// Create and Save a new Employee
exports.add = [
  body('name').not().isEmpty().trim().escape(),
  body('blockedDays').not().isEmpty().trim().escape(),
 // body('roles').not().isEmpty().trim().escape(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    // Create a Employee
    const employee = {
      firstName: req.body.name,
      blockedDays: req.body.blockedDays,
      active: req.body.active || true,
    };

    console.log(employee);
    

    // Save Employee in the database
    // Save Tutorial in the database
    Employee.create(employee)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while creating the Employee.',
        });
      });
  },
];

// Retrieve all Employees from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Employee.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving employees.',
      });
    else res.send(data);
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
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  Employee.updateById(req.params.id, new Employee(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Employee with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Employee with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

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

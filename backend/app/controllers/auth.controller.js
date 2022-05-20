const util = require('util');
var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Employee = db.employee;
const Business = db.business;

const Tag = db.tag;
const apiResponse = require('../util/apiResponse.js');
const { body, param, validationResult } = require('express-validator');

// Create and Save a new Employee
exports.auth = [
  body('firstName').not().isEmpty().trim(),
  body('businessName').not().isEmpty().trim(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }
    //business find by name
    Business.findOne({ where: { name: req.body.businessName } })
      .then((business) => {
        if (!business) {
          console.log('business not found');
          apiResponse.error(res, `Denied, check your credentials.`);
        } else {
          Employee.findOne({ where: { firstName: req.body.firstName, businessId: business.id }, include: Tag })
            .then((employee) => {
              if (!employee) {
                console.log('employee not found');
                apiResponse.error(res, `Denied, check your credentials.`);
              } else {
                apiResponse.successData(res, `${employee.firstName} was logged in.`, employee);
              }
            })

            .catch((e) => apiResponse.error(res, `Login could not be processed due to: ${e}`));
        }
      })
      .catch((e) => console.log(e));
  },
];

const util = require('util');

const db = require('../models/db.js');
const Business = db.business;
const Tag = db.tag;
const Employee = db.employee;
const apiResponse = require('../util/apiResponse.js');
const { body, query, validationResult } = require('express-validator');
const { sequelize } = require('../models/db.js');

// Create and Save a new Business
exports.create = [
  body('name').not().isEmpty().trim().escape(),
  body('owner').not().isEmpty().trim().escape(),
  body('nameForTags').trim().escape().toLowerCase(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    // First, we start a transaction and save it into a variable
    const t = sequelize.transaction().then((t) => {
      // const owner = Employee.create(
      //   {
      //     firstName: req.body.owner,
      //   },
      //   { transaction: t }
      // );
      console.log(req.body);
      Business.create(
        {
          name: req.body.name,
          nameForTags: req.body.nameForTags || 'tags',
          employees: [{ firstName: req.body.owner }],
        },
        { include: [Employee] }
      )
        //owner tag is created the first time a business is created
        // const ownerTag = Tag.findOrCreate({
        //   where: {
        //     name: 'Owner',
        //     description: 'Owner of business',
        //   },
        //   transaction: t,
        // });

        .then((business) => {
          // console.log(responses);
          // business.addEmployee(owner);
          // owner.addTag(ownerTag);

          Tag.create({
            name: 'Owner',
            description: 'Owner of business',
          }).then((tag) => {
            console.log(tag);
            let counter = 0;
            business.employees[0].addTag(tag);
            business.addTag(tag);
            // console.log(counter);
            // console.log(owner);

            res.send(business);
          });
        })

        .catch((err) => {
          console.log(err);

          res.status(500).send({
            message: err.message || 'Error occurred while creating the Business.',
          });
        });
    });
  },
];

// Retrieve all Businesss from the database
exports.findAll = (req, res) => {
  Business.findAll({ include: Employee }).then((businesss) => {
    // console.log(util.inspect(businesss, { showHidden: false, depth: null, colors: true }));
    apiResponse.successData(res, `${Object.keys(businesss).length} businesss found.`, businesss);
  });
};

// Find a single Business by Id
exports.findOne = (req, res) => {
  Business.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Business with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Business with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all active Businesss
exports.findAllPublished = (req, res) => {
  Business.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving businesss.',
      });
    else res.send(data);
  });
};

// Update a Business identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  Business.updateById(req.params.id, new Business(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Business with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Business with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Business with the specified id in the request
exports.delete = (req, res) => {
  Business.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Business with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Business with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Business was deleted successfully!` });
  });
};

// Delete all Businesss from the database.
exports.deleteAll = (req, res) => {
  Business.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all businesss.',
      });
    else res.send({ message: `All Businesss were deleted successfully!` });
  });
};

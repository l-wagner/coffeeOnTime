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
  body('name').not().isEmpty().trim(),
  body('owner').not().isEmpty().trim(),
  body('nameForTags').trim().toLowerCase(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    //create owner object
    let ownerNames = req.body.owner.split(',');
    let owners = [];
    for (let index = 0; index < ownerNames.length; index++) {
      owners[index] = { firstName: ownerNames[index].trim() };
      console.log(owners);
    }

    // First, we start a transaction and save it into a variable
    const t = sequelize.transaction().then((t) => {
      Business.create(
        {
          name: req.body.name,
          nameForTags: req.body.nameForTags || 'tags',
          employees: owners,
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
          // business.addEmployee(owner);
          // owner.addTag(ownerTag);

          Tag.create({
            name: 'Owner',
            description: 'Owner of business',
          }).then((tag) => {
            let counter = 0;
            business.employees.forEach((employee) => employee.addTag(tag));
            business.addTag(tag);

            res.send(business);
          });
        })

        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Error occurred while creating the Business.',
          });
        });
    });
  },
];

// Retrieve all Business from the database
exports.findAll = (req, res) => {
  Business.findAll({ include: Employee }).then((business) => {
    apiResponse.successData(res, `${Object.keys(business).length} business found.`, business);
  });
};

// Find a single Business by Id
exports.findById = [
  query('id').not().isEmpty().trim(),
  (req, res) => {
    const id = req.params.id;
    Business.findByPk(id, { include: Tag })
      .then((data) => {
        if (data) {
          data.nameForTags = data.nameForTags.charAt(0).toUpperCase() + data.nameForTags.slice(1);
          apiResponse.successData(res, '', data);
        } else apiResponse.successMsg(res, 'Business not found.');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Could not find business with id ${id}.`,
        });
      });
  },
];

// find all active Business
exports.findAllPublished = (req, res) => {
  Business.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving business.',
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

// Delete all Business from the database.
exports.deleteAll = (req, res) => {
  Business.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all business.',
      });
    else res.send({ message: `All Business were deleted successfully!` });
  });
};

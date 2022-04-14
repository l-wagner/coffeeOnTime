const db = require('../models/db.js');
const Tag = db.tag;
const Employee = db.employee;
const Business = db.business;
const apiResponse = require('../util/apiResponse.js');
const { body, query, validationResult } = require('express-validator');
const { application } = require('express');

// Create and Save a new Tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Tag
  const tag = {
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
  };

  // Save Tag in the database

  Tag.create(tag)
    .then((data) => {
      apiResponse.successData(res, '', data.data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Tag.',
      });
    });
};

// Retrieve all Tags from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;

  Tag.findAll({ include: Employee })
    .then((data) => {
      // console.log(data);

      apiResponse.successData(res, '', data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tags.',
      });
    });
};
// Retrieve all Tags from the database (with condition).
exports.findAllByBusiness = [
  query('business').not().isEmpty().trim().escape(),
  (req, res) => {
    const businessId = req.params.business;
    Business.findByPk(businessId)
      .then((business) => {
        business.getTags().then((tags) => {
          if (tags) apiResponse.successData(res, '', tags);
          else apiResponse.notFoundResponse(res, 'Business tags not found.');
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Could not find business with id ${id}.`,
        });
      });
  },
];

// Find a single Tag by Id
exports.findById = [
  query('id').not().isEmpty().trim().escape(),
  (req, res) => {
    const id = req.params.id;
    Tag.findByPk(id)
      .then((data) => {
        console.log(data);
        if (data) apiResponse.successData(res, '', data);
        else apiResponse.notFoundResponse(res, 'Tag not found.');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Could not find tag with id ${id}.`,
        });
      });
  },
];

// find all active Tags
exports.findAllPublished = (req, res) => {
  Tag.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tags.',
      });
    else res.send(data);
  });
};

// Update a Tag identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  Tag.update({ name: req.body.name, description: req.body.description }, { where: { id: req.body.id } })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => console.log(e));
};

// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then((data) => {
      apiResponse.successData(res, '', data.data);
    })
    .catch((e) => apiResponse.error(res, `Employee could not be added due to: ${e}`));
};

// Delete all Tags from the database.
exports.deleteAll = (req, res) => {
  Tag.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tags.',
      });
    else res.send({ message: `All Tags were deleted successfully!` });
  });
};

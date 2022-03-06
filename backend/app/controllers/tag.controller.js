const db = require('../models/db.js');
const Tag = db.tag;
const Employee = db.employee;
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

// Retrieve all Tags from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Tag.findAll({ include: Employee })
    .then((data) => {
      console.log(data);

      apiResponse.successData(res, '', data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tags.',
      });
    });
};

// Find a single Tag by Id
exports.findById = [
  query('id').not().isEmpty().trim().escape(),
  (req, res) => {
    let id = req.params.id;
    Tag.findByPk(id)
      .then((data) => {
        console.log(data);
        if (data) apiResponse.successData(res, '', data);
        else apiResponse.notFoundResponse(res, 'Tag not found.')
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

  Tag.updateById(req.params.id, new Tag(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Tag with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  Tag.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Tag with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
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

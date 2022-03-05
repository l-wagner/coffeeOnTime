const db = require('../models/db.js');
const Tag = db.tag;

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
      res.send(data);
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

  Tag.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tags.',
      });
    else res.send(data);
  });
};

// Find a single Tag by Id
exports.findOne = (req, res) => {
  Tag.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Tag with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

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

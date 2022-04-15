const db = require('../models/db.js');
const Tag = db.tag;
const Employee = db.employee;
const Business = db.business;
const apiResponse = require('../util/apiResponse.js');
const { body, param, validationResult } = require('express-validator');

// Create and Save a new Tag
exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationError(res, { errors: errors.array() }, 400);
  }

  // Create a Tag
  const tag = {
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    businessId: req.body.business,
  };

  // Save Tag in the database

  Tag.create(tag)
    .then((data) => {
      apiResponse.successData(res, '', data);
    })
    .catch((e) => apiResponse.error(res, `Tag could not be created due to: ${e}`));
};

// Retrieve all Tags from the database.
exports.findAll = (req, res) => {
  const name = req.param.name;

  Tag.findAll({ include: Employee })
    .then((data) => {
      // console.log(data);

      apiResponse.successData(res, '', data);
    })
    .catch((e) => apiResponse.error(res, `Tags could not be found due to: ${e}`));
};
// Retrieve all Tags from the database (with condition).
exports.findAllByBusiness = [
  param('business').not().isEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }
    const businessId = req.params.business;
    Business.findByPk(businessId)
      .then((business) => {
        business.getTags().then((tags) => {
          if (tags) apiResponse.successData(res, '', tags);
          else apiResponse.notFoundResponse(res, 'Business tags not found.');
        });
      })
      .catch((e) => apiResponse.error(res, `Tag could not be found due to: ${e}`));
  },
];

// Find a single Tag by Id
exports.findById = [
  param('id').not().isEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    const id = req.params.id;
    Tag.findByPk(id)
      .then((data) => {
        console.log(data);
        if (data) apiResponse.successData(res, '', data);
        else apiResponse.notFoundResponse(res, 'Tag not found.');
      })
      .catch((e) => apiResponse.error(res, `Tag could not be found due to: ${e}`));
  },
];

// Update a Tag identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationError(res, { errors: errors.array() }, 400);
  }
  console.log(req.body.id, req.body.name);
  Tag.findByPk(req.body.id)
    .then((tag) => {
      tag.name = req.body.name;
      tag.description = req.body.description;
      tag.save().then(() => apiResponse.successData(res, 'Tag updated.', tag));
    })

    .catch((e) => apiResponse.error(res, `Tag could not be updated due to: ${e}`));
};

// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
    .then((data) => {
      apiResponse.successData(res, '', data.data);
    })
    .catch((e) => apiResponse.error(res, `Tag could not be deleted due to: ${e}`));
};

// Delete all Tags from the database.
exports.deleteAll = (req, res) => {
  Tag.destroy({ where: { id: { $gte: 0 } } })
    .then(() => apiResponse.successMsg(res, 'Tags deleted.'))
    .catch((e) => apiResponse.error(res, `Tags could not be deleted due to: ${e}`));
};

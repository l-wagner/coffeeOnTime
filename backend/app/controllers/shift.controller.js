const util = require('util');
var Sequelize = require('sequelize');

const db = require('../models/db.js');
const Shift = db.shift;

const Tag = db.tag;
const apiResponse = require('../util/apiResponse.js');
const { body, param, validationResult } = require('express-validator');

// Create and Save a new Shift
exports.add = [
  body('business').isInt().not().isEmpty().trim().escape(),
  body('name').not().isEmpty().trim().escape(),
  body('startTime').not().isEmpty().trim().escape(),
  body('endTime').not().isEmpty().trim().escape(),
  body('description').trim().escape(),
  body('days').trim().escape(),
  body('tags').trim().escape(),
  function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = '';
      errors.array().map((error) => msg += (error.param + ' invalid. '));
      return apiResponse.validationError(res, { errors: errors.array(), msg: msg }, 400);
    }
    console.log(req.body);

    // Pull and add tags
    const tags = req.body.tags?.split(',');
    const days = req.body.days?.split(',');
    Tag.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
      .then((tagsToAdd) => {
        Shift.create({
          name: req.body.name,
          description: req.body.description || null,
          days: days || null,
          startTime: req.body.startTime || null,
          endTime: req.body.endTime || null,
          businessId: req.body.business,
        }).then((shift) => {
          tagsToAdd.forEach((tag) => shift.addTag(tag));
          apiResponse.successData(res, `${shift.name} was added.`, shift);
        });
      })
      .catch((e) => apiResponse.error(res, `Shift could not be added due to: ${e}`));
  },
];

// Retrieve all Shifts from the database
exports.findAll = (req, res) => {
  Shift.findAll({ include: Tag }).then((shifts) => {
    // change blocked days to array
    shifts.map((shift) => (shift.blockedDays = shift.blockedDays?.split(',')));
    apiResponse.successData(res, `${Object.keys(shifts).length} shifts found.`, shifts);
  });
};

// Find a single Shift by Id
exports.findOne = (req, res) => {
  Shift.findByPk(req.params.id)
    .then((shift) => {
      // req.body.tags && (shift.tags = req.body.tags.join(','));
      apiResponse.successData(res, shift);
    })
    .catch(() => apiResponse.notFoundResponse(res, 'Shift not found.'));
};

// Update an Shift
exports.update = [
  param('id').not().isEmpty().trim().escape(),
  body('data').trim().escape(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    Shift.findByPk(req.params.id)
      .then((shift) => {
        req.body.firstName && (shift.firstName = req.body.firstName);
        req.body.lastName && (shift.lastName = req.body.lastName);
        shift
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Shift could not be updated.'));
      })
      .catch((e) => apiResponse.error(res, `Shift not found. Error: ${e}`));
  },
];

// Update an Shift's blocked days identified by the id in the request
exports.updateDays = [
  param('id').not().isEmpty().trim().escape(),
  body('data').trim().escape(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    Shift.findByPk(req.params.id)
      .then((shift) => {
        req.body.blockedDays && (shift.blockedDays = req.body.blockedDays.join(','));
        shift
          .save()
          .then((result) => apiResponse.successData(res, result))
          .catch(() => apiResponse.notFoundResponse(res, 'Shift could not be updated.'));
      })
      .catch((e) => apiResponse.error(res, `Shift could not be added due to: ${e}`));
  },
];

exports.updateTags = [
  param('id').not().isEmpty().trim().escape(),
  body('tags').trim().escape(),
  (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationError(res, { errors: errors.array() }, 400);
    }

    const tags = req.body.tags.split(',');
    Shift.findByPk(req.params.id).then((shift) => {
      //remove all tags from shift TODO actually compare tags
      Tag.findAll({ where: { id: { [Sequelize.Op.notIn]: tags } } })
        .then((tagsToRemove) => {
          shift.removeTags(tagsToRemove);

          Tag.findAll({ where: { id: { [Sequelize.Op.in]: tags } } })
            .then((tagsToAdd) => {
              shift.addTags(tagsToAdd);
              apiResponse.successData(res, `${tags.length} tags updated.`, shift);
            })
            .catch(() => apiResponse.error(res, 'Tags could not be added.'));
        })
        .catch(() => apiResponse.error(res, 'Tags could not be removed.'));
    });
  },
];

// Delete a Shift with the specified id in the request

exports.delete = [
  param('id').not().isEmpty().trim().escape(),
  (req, res) => {
    Shift.destroy({ where: { id: req.params.id } })
      .then(() => apiResponse.successMsg(res, 'Shift fired successfully.'))
      .catch((e) => apiResponse.error(res, `Shift could not be added due to: ${e}`));
  },
];

// Delete all Shifts from the database.
exports.deleteAll = (req, res) => {
  Shift.destroy({ where: { id: { $gte: 0 } } })
    .then(() => apiResponse.successMsg(res, 'Shift fired successfully.'))
    .catch((e) => apiResponse.error(res, `Shift could not be added due to: ${e}`));
};

module.exports = (app) => {
  const tags = require('../controllers/tag.controller.js');

  var router = require('express').Router();

  // Create a new Tag
  router.post('/', tags.create);

  // Retrieve all Tags
  router.get('/', tags.findAll);

  // Retrieve all Tags for Business
  router.get('/business/:business', tags.findAllByBusiness);

  // // Retrieve a single Tag with id
  // router.get("/:id", tags.findById);

  // Update a Tag with id
  router.put('/', tags.update);

  // Delete a Tag with id
  router.delete('/:id', tags.delete);

  // Delete all Tags
  router.delete('/', tags.deleteAll);

  app.use('/api/tags', router);
};

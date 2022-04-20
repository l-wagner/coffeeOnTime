module.exports = (app) => {
  const schedules = require('../controllers/schedule.controller.js');

  var router = require('express').Router();

  // Create a new Tag
  router.post('/', schedules.add);

  // fill employees and shifts
  router.post('/fill', schedules.fill);


  // Retrieve all Tags
  router.get('/', schedules.findAll);

  // // Retrieve all Tags for Business
  // router.get('/business/:business', schedules.findAllByBusiness);

  // // Retrieve a single Tag with id
  // router.get("/:id", schedules.findById);

  // Update a Tag with id
  router.put('/', schedules.update);

  // Delete a Tag with id
  router.delete('/:id', schedules.delete);

  // Delete all Tags
  router.delete('/', schedules.deleteAll);

  app.use('/api/schedules', router);
};

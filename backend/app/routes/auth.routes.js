module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');

  var router = require('express').Router();

  // Create a new Business
  router.post('/', auth.auth);

  app.use('/api/auth', router);
};

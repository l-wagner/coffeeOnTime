module.exports = (app) => {
  const employees = require('../controllers/employee.controller.js');

  var router = require('express').Router();

  // Create a new Employee
  router.post('/add', employees.add);

  // Retrieve all Employees
  router.get('/', employees.findAll);

  // Retrieve all Employees for Business
  router.get('/business/:business', employees.findAllByBusiness);

  // Retrieve a single Employee with id
  router.get('/:id', employees.findOne);

  // create RTO requtes
  router.post('/rto/:id', employees.requestRto);

  // Update a Employee with id
  router.put('/:id', employees.update);

  router.put('/tags/:id', employees.updateTags);

  // Delete a Employee with id
  router.delete('/:id', employees.delete);

  // Delete all Employees
  router.delete('/', employees.deleteAll);

  app.use('/api/employees', router);
};

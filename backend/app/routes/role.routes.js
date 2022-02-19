module.exports = app => {
  const roles = require("../controllers/role.controller.js");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/", roles.create);

  // Retrieve all Employees
  router.get("/", roles.findAll);

  // Retrieve all published Employees
  router.get("/published", roles.findAllPublished);

  // Retrieve a single Employee with id
  router.get("/:id", roles.findOne);

  // Update a Employee with id
  router.put("/:id", roles.update);

  // Delete a Employee with id
  router.delete("/:id", roles.delete);

  // Delete all Employees
  router.delete("/", roles.deleteAll);

  app.use('/api/roles', router);
};

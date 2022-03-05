module.exports = app => {
  const tags = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/", tags.create);

  // Retrieve all Employees
  router.get("/", tags.findAll);

  // Retrieve all published Employees
  router.get("/published", tags.findAllPublished);

  // Retrieve a single Employee with id
  router.get("/:id", tags.findOne);

  // Update a Employee with id
  router.put("/:id", tags.update);

  // Delete a Employee with id
  router.delete("/:id", tags.delete);

  // Delete all Employees
  router.delete("/", tags.deleteAll);

  app.use('/api/tags', router);
};

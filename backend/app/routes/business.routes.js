module.exports = app => {
  const business = require("../controllers/business.controller.js");

  var router = require("express").Router();

  // Create a new Business
  router.post("/", business.create);

  // Retrieve all Businesses
  router.get("/", business.findAll);

  // // Retrieve all published Businesses
  // router.get("/published", business.findAllPublished);

  // Retrieve a single Business with id
  router.get("/:id", business.findById);

  // // Update a Business with id
  // router.put("/:id", business.update);

  // // Delete a Business with id
  // router.delete("/:id", business.delete);

  // // Delete all Businesses
  // router.delete("/", business.deleteAll);

  app.use('/api/business', router);
};

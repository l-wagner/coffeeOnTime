module.exports = app => {
  const shifts = require("../controllers/shift.controller.js");

  var router = require("express").Router();

  // Create a new Shift
  router.post("/", shifts.add);

  // Retrieve all Shifts
  router.get("/", shifts.findAll);

  // Retrieve a single Shift with id
  router.get("/:id", shifts.findOne);

  // Update a Shift with id
  router.put("/:id", shifts.update);

  // Update a Shift with id
  router.put("/days/:id", shifts.updateDays);

  router.put("/tags/:id", shifts.updateTags);

  // Delete a Shift with id
  router.delete("/:id", shifts.delete);

  // Delete all Shifts
  router.delete("/", shifts.deleteAll);

  app.use('/api/shifts', router);
};

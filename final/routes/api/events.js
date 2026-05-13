const express = require("express");
const router = express.Router();
const {
  CreateNewEvent
} = require("../../controller/eventsController");

router
  .route("/")
  //.get(GetAllStudents)
  .post(CreateNewEvent)
  //.put(UpdateEvent)
  //.delete(DeleteEvent);

//router.route("/:id").get(GetEvent);

module.exports = router;
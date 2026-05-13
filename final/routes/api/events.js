const verifyJWT = require("../../middleware/jwt.js");
const adminAuth = require("../../middleware/adminAuth.js");
const express = require("express");
const router = express.Router();
const {
  CreateNewEvent,
  GetAllEvents
} = require("../../controller/eventsController");

router
  .route("/")
  .get(verifyJWT, GetAllEvents)
  .post(verifyJWT, adminAuth, CreateNewEvent)
  //.put(UpdateEvent)
  //.delete(DeleteEvent);

//router.route("/:id").get(GetEvent);

module.exports = router;
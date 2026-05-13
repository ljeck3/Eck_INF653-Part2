const verifyJWT = require("../../middleware/jwt.js");
const adminAuth = require("../../middleware/adminAuth.js");
const express = require("express");
const router = express.Router();
const {
  CreateNewEvent,
  GetAllEvents,
  UpdateEvent,
  DeleteEvent
} = require("../../controller/eventsController");

router
  .route("/")
  .get(verifyJWT, GetAllEvents)
  .post(verifyJWT, adminAuth, CreateNewEvent)
  .put(verifyJWT, adminAuth, UpdateEvent)
  .delete(verifyJWT, adminAuth, DeleteEvent);

//router.route("/:id").get(GetEvent);

module.exports = router;
const verifyJWT = require("../../middleware/jwt.js");
const adminAuth = require("../../middleware/adminAuth.js");
const express = require("express");
const router = express.Router();
const {
  CreateNewEvent,
  GetAllEvents,
  UpdateEvent,
  DeleteEvent,
  GetEvent
} = require("../../controller/eventsController");

router
  .route("/")
  .get(verifyJWT, GetAllEvents)
  .post(verifyJWT, adminAuth, CreateNewEvent)

router
  .route("/:id")
  .get(verifyJWT, GetEvent)
  .put(verifyJWT, adminAuth, UpdateEvent)
  .delete(verifyJWT, adminAuth, DeleteEvent);


module.exports = router;
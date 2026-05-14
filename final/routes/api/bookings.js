const verifyJWT = require("../../middleware/jwt.js");
const adminAuth = require("../../middleware/adminAuth.js");
const express = require("express");
const router = express.Router();
const {
  CreateNewBooking,
  GetAllBookings,
  DeleteBooking,
  GetBooking
} = require("../../controller/bookingsController.js");

router
  .route("/")
  .get(verifyJWT, GetAllBookings)
  .post(verifyJWT, adminAuth, CreateNewBooking)

router
  .route("/:id")
  .get(verifyJWT, GetBooking)
  .delete(verifyJWT, adminAuth, DeleteBooking);


module.exports = router;
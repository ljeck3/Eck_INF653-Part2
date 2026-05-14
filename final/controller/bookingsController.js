const Booking = require("../model/Booking");
const Event = require("../model/Event");

// Create New Booking
const CreateNewBooking = async (req, res) => {
  const { event, quantity } = req.body;
  const user = req.user.id;
  if (!event || !quantity) {
    return res
      .status(400)
      .json({ message: "Fill out all required information" });
  }
  try {
    const result = await Booking.create({ user, event, quantity });
    await Event.findByIdAndUpdate(event, { $inc: { bookedSeats: quantity } });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Bookings
const GetAllBookings = async (req, res) => {
  const user = req.user.id;
  try {
    const bookings = await Booking.find({ user: user });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found!" });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Booking
const DeleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Booking ID is required!" });
  }
  try {
    const booking = await Booking.findById(id).exec();
    if (!booking) {
      return res.status(404).json({ message: `No booking matches ID ${id}` });
    }
    const result = await Booking.deleteOne({ _id: id });
    await Event.findByIdAndUpdate(booking.event, { $inc: { bookedSeats: -booking.quantity } });
    res.json({ message: "Booking deleted", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get One Booking
const GetBooking = async (req, res) => {
  const { id } = req.params;
  const user = req.user.id;
  if (!id) {
    return res.status(400).json({ message: "Booking ID is required!" });
  }
  try {
    const booking = await Booking.findOne({ _id: id, user: req.user.id }).exec();
    if (!booking) {
      return res.status(404).json({ message: `No booking matches ID ${id}` });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateNewBooking,
  GetAllBookings,
  DeleteBooking,
  GetBooking
};
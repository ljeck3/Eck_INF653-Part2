const Event = require("../model/Event");

// Create New Event
const CreateNewEvent = async (req, res) => {
  const { title, description, category, venue, date, time, seatCapacity, bookedSeats, price } = req.body;
  if (!title || !description || !category || !venue || !date || !time || !seatCapacity || !bookedSeats || !price ) {
    return res
      .status(400)
      .json({ message: "Fill out all required information" });
  }
  try {
        const result = await Event.create({ title, description, category, venue, date, time, seatCapacity, bookedSeats, price });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
const GetAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found!" });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Event
const UpdateEvent = async (req, res) => {
  const { id, title, description, category, venue, date, time, seatCapacity, bookedSeats, price } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Event ID is required!" });
  }
  try {
    const event = await Event.findById(id).exec();
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${id}` });
    }
    if (title) event.title = title;
    if (description) event.description = description;
    if (category) event.category = category;
    if (venue) event.venue = venue;
    if (date) event.date = date;
    if (time) event.time = time;
    if (seatCapacity) event.seatCapacity = seatCapacity;
    if (bookedSeats) event.bookedSeats = bookedSeats;
    if (price) event.price = price;
    const result = await event.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateNewEvent,
  GetAllEvents,
  UpdateEvent
};
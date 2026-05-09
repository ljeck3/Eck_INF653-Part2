const mongoose = require("mongoose");
 
const bookingSchema = new mongoose.Schema({
  user: {  },
  event: {  },
  quantity: { type: Number, required: true },
  bookingdate: { type: Date, default: Date.now},
});
 
module.exports = mongoose.model("booking", bookingSchema);
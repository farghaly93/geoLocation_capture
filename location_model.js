const mongoose = require("mongoose");

const locations = mongoose.Schema({
  lat: String,
  lng: String,
  date: Number,
});

module.exports = mongoose.model("locations", locations);
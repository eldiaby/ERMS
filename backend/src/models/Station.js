const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  name: { type: String, required: true },
  city: { type: String },
  coords: { lat: Number, lng: Number }
});

module.exports = mongoose.model('Station', StationSchema);

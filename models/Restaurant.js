const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  location: { type: String },
  rating: { type: Number, default: 0 },
  menuCategories: [{ type: String }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

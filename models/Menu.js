const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  category: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }
  }]
});

module.exports = mongoose.model('Menu', menuSchema);

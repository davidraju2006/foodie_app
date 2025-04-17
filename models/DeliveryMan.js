const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const deliveryManSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  currentLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  tokens: [{
    token: { type: String, required: true }
  }]
});

// Hash password before saving
deliveryManSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Generate auth token
deliveryManSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// Compare password for login
deliveryManSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from response
deliveryManSchema.methods.toJSON = function() {
  const deliveryMan = this.toObject();
  delete deliveryMan.password;
  delete deliveryMan.tokens;
  return deliveryMan;
};

// Add 2dsphere index for geospatial queries
deliveryManSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('DeliveryMan', deliveryManSchema);

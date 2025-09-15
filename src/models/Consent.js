const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accepted: { type: Boolean, default: false },
  details: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consent', consentSchema);

const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);

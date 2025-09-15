const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['article','video','exercise'], default: 'article' },
  tags: [String],
  mediaUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);

const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true }, // e.g., Happy, Anxious
  intensity: { type: Number, min: 1, max: 10, default: 5 },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emotion', emotionSchema);

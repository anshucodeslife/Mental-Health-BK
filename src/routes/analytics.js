const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');
const Content = require('../models/Content');
const { auth, permit } = require('../middleware/auth');

// GET /analytics/summary
router.get('/summary', auth, permit('Admin'), async (req, res) => {
  try {
    const moodAgg = await Emotion.aggregate([
      { $group: { _id: '$mood', count: { $sum: 1 } } }
    ]);
    const contentCount = await Content.countDocuments();
    res.json({ moodAgg, contentCount });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /analytics/export
router.get('/export', auth, permit('Admin'), async (req, res) => {
  try {
    const emotions = await Emotion.find().limit(1000);
    res.json({ export: emotions });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const Match = require('../models/Match');
const { auth } = require('../middleware/auth');

// GET /support/recommendations?mood=Anxious
router.get('/recommendations', auth, async (req, res) => {
  try {
    const mood = req.query.mood || 'Neutral';
    // Simple rule-based mapping
    const mapping = {
      'Anxious': ['breathing','mindfulness'],
      'Happy': ['gratitude','activities'],
      'Neutral': ['articles','exercises']
    };
    const tags = mapping[mood] || ['articles'];
    const resources = await Content.find({ tags: { $in: tags } }).limit(10);
    res.json({ resources });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// POST /support/match
router.post('/match', auth, async (req, res) => {
  try {
    const { counselorId, reason } = req.body;
    const match = await Match.create({ user: req.user._id, counselor: counselorId, reason });
    res.json({ match });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;

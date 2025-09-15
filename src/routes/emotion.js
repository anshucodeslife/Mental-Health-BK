const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');
const { auth } = require('../middleware/auth');

// POST /emotion/log
router.post('/log', auth, async (req, res) => {
  try {
    const { mood, intensity, note } = req.body;
    const e = await Emotion.create({ user: req.user._id, mood, intensity, note });
    res.json({ success: true, emotion: e });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /emotion/history?range=weekly|daily
router.get('/history', auth, async (req, res) => {
  try {
    const range = req.query.range || 'weekly';
    const since = range === 'daily' ? new Date(Date.now() - 24*3600*1000) : new Date(Date.now() - 7*24*3600*1000);
    const data = await Emotion.find({ user: req.user._id, createdAt: { $gte: since }}).sort('createdAt');
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

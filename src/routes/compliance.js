const express = require('express');
const router = express.Router();
const Consent = require('../models/Consent');
const { auth } = require('../middleware/auth');

// POST /compliance/consent
router.post('/consent', auth, async (req, res) => {
  try {
    const { accepted, details } = req.body;
    const c = await Consent.create({ user: req.user._id, accepted, details });
    res.json({ consent: c });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /compliance/audit?userId=...
router.get('/audit', auth, async (req, res) => {
  try {
    // Simple placeholder: return consents for user
    const userId = req.query.userId || req.user._id;
    const list = await Consent.find({ user: userId }).sort('-createdAt');
    res.json({ list });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;

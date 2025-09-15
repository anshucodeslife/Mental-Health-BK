const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { auth, permit } = require('../middleware/auth');

// POST /content/upload (admin)
router.post('/upload', auth, permit('Admin'), async (req, res) => {
  try {
    const { title, description, type, tags, mediaUrl } = req.body;
    const c = await Content.create({ title, description, type, tags, mediaUrl, createdBy: req.user._id });
    res.json({ content: c });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /content/list
router.get('/list', auth, async (req, res) => {
  try {
    const items = await Content.find().sort('-createdAt');
    res.json({ items });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /content/by-tag
router.get('/by-tag', auth, async (req, res) => {
  try {
    const tag = req.query.tag;
    const items = await Content.find({ tags: tag });
    res.json({ items });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;

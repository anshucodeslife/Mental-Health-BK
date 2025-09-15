const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { auth } = require('../middleware/auth');

// POST /chat/send
router.post('/send', auth, async (req, res) => {
  try {
    const { to, text, room } = req.body;
    const msg = await Message.create({ from: req.user._id, to, text, room });
    // In production, emit via socket.io (not available here)
    res.json({ message: msg });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /chat/history?userId=xxxxx
router.get('/history', auth, async (req, res) => {
  try {
    const other = req.query.userId;
    const data = await Message.find({
      $or: [
        { from: req.user._id, to: other },
        { from: other, to: req.user._id }
      ]
    }).sort('createdAt');
    res.json({ data });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;

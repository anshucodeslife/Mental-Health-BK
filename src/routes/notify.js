const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
const { auth, permit } = require('../middleware/auth');

// simple transporter using env vars
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /notify/send
router.post('/send', auth, permit('Admin'), async (req, res) => {
  try {
    const { userId, message, sendAt } = req.body;
    const n = await Notification.create({ user: userId, message, sendAt, type: 'email' });
    res.json({ notification: n });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// GET /notify/schedule
router.get('/schedule', auth, permit('Admin'), async (req, res) => {
  try {
    const list = await Notification.find().sort('-createdAt');
    res.json({ list });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// Example cron job (runs every minute) to send due notifications
nodeCron.schedule('* * * * *', async () => {
  const due = await Notification.find({ sent: false, sendAt: { $lte: new Date() } });
  for (const n of due) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com',
        subject: 'Reminder',
        text: n.message
      });
      n.sent = true;
      await n.save();
    } catch (err) {
      console.error('Notify error', err.message || err);
    }
  }
});

module.exports = router;

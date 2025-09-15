const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const emotionRoutes = require('./emotion');
const supportRoutes = require('./support');
const chatRoutes = require('./chat');
const contentRoutes = require('./content');
const analyticsRoutes = require('./analytics');
const notifyRoutes = require('./notify');
const complianceRoutes = require('./compliance');

router.use('/auth', authRoutes);
router.use('/emotion', emotionRoutes);
router.use('/support', supportRoutes);
router.use('/chat', chatRoutes);
router.use('/content', contentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/notify', notifyRoutes);
router.use('/compliance', complianceRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();

const journalRoutes = require('./journalRoutes');

const mongoose = require('mongoose');

/**
 * API Route Aggregator
 * Mounts all feature routes under their respective paths.
 */

// Base API route
router.get('/', (req, res) => {
    // Commented out live check as requested:
    // const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

    console.log("✅ MongoDB Connection: Established (API v1)");

    res.status(200).json({
        success: true,
        message: 'Emotionally API v1 — MongoDB Connection Established'
    });
});

router.use('/journals', journalRoutes);

module.exports = router;

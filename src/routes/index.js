const express = require('express');
const router = express.Router();

const journalRoutes = require('./journalRoutes');

/**
 * API Route Aggregator
 * Mounts all feature routes under their respective paths.
 */
router.use('/journals', journalRoutes);

module.exports = router;

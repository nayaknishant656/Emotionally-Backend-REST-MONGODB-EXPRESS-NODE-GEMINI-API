const express = require('express');
const router = express.Router();
const { getAllJournals, getJournalsByUserId, getJournalsByIdParam } = require('../controllers/journalController');

/**
 * Journal Routes
 * Base path: /api/v1/journals
 */
router.get('/', getAllJournals);
router.get('/user/:userId', getJournalsByUserId);
router.get('/:id', getJournalsByIdParam);

module.exports = router;

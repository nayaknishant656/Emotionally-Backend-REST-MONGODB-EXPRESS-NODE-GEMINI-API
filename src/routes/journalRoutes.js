const express = require('express');
const router = express.Router();
const {
    getAllJournals,
    getJournalsByUserId,
    getJournalsByIdParam,
    createJournal,
    getAnalysesByUserId,
    createJournalAnalysis
} = require('../controllers/journalController');

/**
 * Journal Routes
 * Base path: /api/v1/journals
 */
router.get('/', getAllJournals);
router.post('/', createJournal);
router.get('/user/:userId', getJournalsByUserId);
router.get('/:id', getJournalsByIdParam);

// Analysis routes
router.get('/analysis/user/:userId', getAnalysesByUserId);
router.post('/analysis', createJournalAnalysis);

module.exports = router;

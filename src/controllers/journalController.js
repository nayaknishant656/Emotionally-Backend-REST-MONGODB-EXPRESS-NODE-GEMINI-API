const { Journal, JournalAnalysis } = require('../models');

/**
 * @desc    Get all journal entries from the database
 * @route   GET /api/v1/journals
 * @access  Public
 */
const getAllJournals = async (req, res, next) => {
    try {
        const journals = await Journal.find({});

        res.status(200).json({
            success: true,
            message: 'All journal entries retrieved successfully',
            data: journals,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all journal entries for a specific user
 * @route   GET /api/v1/journals/user/:userId
 * @access  Public
 */
const getJournalsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const journals = await Journal.find({ userId });

        res.status(200).json({
            success: true,
            message: `Journal entries for user ${userId} retrieved successfully`,
            data: journals,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get journal entries using id parameter as userId
 * @route   GET /api/v1/journals/:id
 * @access  Public
 */
const getJournalsByIdParam = async (req, res, next) => {
    try {
        const { id } = req.params;
        const journals = await Journal.find({ userId: id });

        res.status(200).json({
            success: true,
            message: `Journal entries for user ${id} retrieved successfully`,
            data: journals,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new journal entry
 * @route   POST /api/v1/journals
 * @access  Public
 */
const createJournal = async (req, res, next) => {
    try {
        const { userId, ambience, text } = req.body;

        const newJournal = await Journal.create({
            userId,
            ambience,
            text,
        });

        res.status(201).json({
            success: true,
            message: 'Journal entry created successfully',
            data: newJournal,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all journal analyses for a user (via query or param)
 * @route   GET /api/v1/journals/analysis/user/:userId
 * @access  Public
 */
const getAnalysesByUserId = async (req, res, next) => {
    try {
        // Support both query string (?userId=...) and url params (/:userId)
        const userId = req.params.userId || req.query.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const analyses = await JournalAnalysis.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: `Journal analyses for user ${userId} retrieved successfully`,
            count: analyses.length,
            data: analyses,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new journal analysis entry
 * @route   POST /api/v1/journals/analysis
 * @access  Public
 */
const createJournalAnalysis = async (req, res, next) => {
    try {
        const { userId, journalId, journalText, ambience, analysis } = req.body;

        const newAnalysis = await JournalAnalysis.create({
            userId,
            journalId,
            journalText,
            ambience,
            analysis,
        });

        res.status(201).json({
            success: true,
            message: 'Journal analysis created successfully',
            data: newAnalysis,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllJournals,
    getJournalsByUserId,
    getJournalsByIdParam,
    createJournal,
    getAnalysesByUserId,
    createJournalAnalysis,
};

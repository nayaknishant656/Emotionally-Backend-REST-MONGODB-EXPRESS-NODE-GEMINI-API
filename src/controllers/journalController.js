const { Journal } = require('../models');

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

module.exports = {
    getAllJournals,
    getJournalsByUserId,
    getJournalsByIdParam,
};

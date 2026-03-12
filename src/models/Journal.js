const mongoose = require('mongoose');

/**
 * Journal Schema
 * Stores journal entries created by users with ambience context.
 */
const journalSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            trim: true,
            index: true,
        },
        ambience: {
            type: String,
            trim: true,
        },
        text: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Journal',
        bufferTimeoutMS: 20000
    }
);

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;

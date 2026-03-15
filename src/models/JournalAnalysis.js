// models/JournalAnalysis.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ── Sub-schema: Analysis ─────────────────────────────────────────────────────
const AnalysisSchema = new Schema(
    {
        sentiment: {
            type: String,
            required: true,
            enum: ['Positive', 'Negative', 'Neutral', 'Mixed'],
        },
        main_emotions: {
            type: [String],
            required: true,
            validate: {
                validator: (arr) => arr.length > 0,
                message: 'At least one emotion is required.',
            },
        },
        intensity: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        brief_advice: {
            type: String,
            required: true,
            trim: true,
        },
        analyzed_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
        model_version: {
            type: String,
            required: true,
            trim: true,
            default: 'v1.0',
        },
    },
    { _id: false } // embedded — no separate _id
);

// ── Main Schema: JournalAnalysis ─────────────────────────────────────────────
const JournalAnalysisSchema = new Schema(
    {
        journalId: {
            type: Schema.Types.ObjectId,
            ref: 'Journal',
            required: true,
            unique: true,                          // one analysis doc per journal
            default: () => new mongoose.Types.ObjectId(),
        },
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        journalText: {
            type: String,
            required: true,
            trim: true,
        },
        ambience: {
            type: String,
            trim: true,
            default: null,                         // optional field
        },
        analysis: {
            type: AnalysisSchema,
            required: true,
        },
    },
    {
        timestamps: true,                        // adds createdAt & updatedAt
        collection: 'journal_analyses',
    }
);

// ── Model ────────────────────────────────────────────────────────────────────
module.exports = mongoose.model('JournalAnalysis', JournalAnalysisSchema);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

/**
 * Express Application Setup
 * - Security headers (helmet)
 * - CORS
 * - Request logging (morgan)
 * - Body parsing (JSON + URL-encoded)
 * - API routes mounted at /api/v1
 * - Health check endpoint
 * - 404 catch-all
 * - Global error handler
 */
const app = express();

// ──────────────────────────────────────────────
// 1. Security & Utility Middleware
// ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// ──────────────────────────────────────────────
// 2. Body Parsers
// ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const mongoose = require('mongoose');

// ──────────────────────────────────────────────
// 3. Routes
// ──────────────────────────────────────────────

// Homepage / Root Route
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    console.log(`🏠 Homepage accessed. MongoDB Status: ${dbStatus}`);
    res.status(200).json({
        success: true,
        message: 'Welcome to Emotionally API 🧘‍♂️',
        mongodb: dbStatus
    });
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running 🚀',
        environment: config.nodeEnv,
        timestamp: new Date().toISOString(),
    });
});

// ──────────────────────────────────────────────
// 4. API Routes  →  /api/v1/*
// ──────────────────────────────────────────────
app.use('/api/v1', routes);

// ──────────────────────────────────────────────
// 5. 404 — Catch unmatched routes
// ──────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});

// ──────────────────────────────────────────────
// 6. Global Error Handler (must be last)
// ──────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;

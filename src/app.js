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
const connectDB = require('./config/db');

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

/**
 * Server Startup Logic
 * Priority 1: Establish MongoDB connection
 * Priority 2: Start Express server listening
 */
const startServer = async () => {
    try {
        // 1. Priority: Connect to MongoDB
        await connectDB();

        // 2. Start listening only after DB is ready
        const server = app.listen(config.port, () => {
            console.log(`\n🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
            console.log(`📡 Health check  → http://localhost:${config.port}/health`);
            console.log(`📦 API base URL  → http://localhost:${config.port}/api/v1\n`);
        });

        // Handle process signals for graceful shutdown
        const shutdown = (signal) => {
            console.log(`\n${signal} received. Shutting down gracefully...`);
            server.close(() => {
                console.log('💤 Server closed.');
                process.exit(0);
            });
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Rejection:', err.message);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

module.exports = { app, startServer };

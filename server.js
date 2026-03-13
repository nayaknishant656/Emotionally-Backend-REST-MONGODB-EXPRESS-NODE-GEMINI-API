const config = require('./src/config');
const connectDB = require('./src/config/db');
const app = require('./src/app');

/**
 * Server Entry Point
 * 1. Connects to MongoDB
 * 2. Starts Express on the configured port
 * 3. Handles graceful shutdown on SIGTERM / SIGINT
 */
const startServer = async () => {
    try {
        // ── Connect to MongoDB ──────────────────────
        await connectDB();

        // ── Start Express Server ────────────────────
        const server = app.listen(config.port, () => {
            console.log(`\n🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
            console.log(`📡 Health check  → http://localhost:${config.port}/health`);
            console.log(`📦 API base URL  → http://localhost:${config.port}/api/v1\n`);
        });

        // ── Graceful Shutdown ───────────────────────
        const shutdown = (signal) => {
            console.log(`\n${signal} received. Shutting down gracefully...`);
            server.close(() => {
                console.log('💤 Server closed.');
                process.exit(0);
            });
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

        // ── Unhandled Rejections ────────────────────
        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Rejection:', err.message);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

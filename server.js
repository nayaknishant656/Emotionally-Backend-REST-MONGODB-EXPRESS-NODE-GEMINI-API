const { startServer } = require('./src/app');

/**
 * Main Entry Point
 * Triggers the prioritized startup sequence defined in app.js
 * 1. MongoDB Connection
 * 2. Express Server Startup
 */
startServer();

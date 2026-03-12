const dotenv = require('dotenv');

// Load .env file
dotenv.config();

/**
 * Centralized configuration object.
 * All environment-specific values should be accessed through this module.
 */
const config = {
    // Server
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5001,

    // Database
    mongodbUri: process.env.MONGODB_URI,

    // CORS
    corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;

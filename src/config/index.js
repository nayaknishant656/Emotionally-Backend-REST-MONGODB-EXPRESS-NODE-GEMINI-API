const dotenv = require('dotenv');

// Load .env file
dotenv.config();

/**
 * Centralized configuration object.
 * All environment-specific values should be accessed through this module.
 */
const config = {
    // Server
    nodeEnv: 'development' || process.env.NODE_ENV,
    port: 5001 || parseInt(process.env.PORT, 10),

    // Database
    mongodbUri: "mongodb+srv://mobideas2:nishantnayak2297@cluster0.05pqoma.mongodb.net/Emotionally" || process.env.MONGODB_URI,

    // CORS
    corsOrigin: '*' || process.env.CORS_ORIGIN,
};

module.exports = config;

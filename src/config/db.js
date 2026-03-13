const mongoose = require('mongoose');
const config = require('./index');

/**
 * Connect to MongoDB Atlas using Mongoose.
 * Handles connection events and retries on failure.
 */
const connectDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 20000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected successfully.');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

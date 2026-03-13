const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mobideas2:nishantnayak2297@cluster0.05pqoma.mongodb.net/Emotionally';

    // Disable buffering if not connected to avoid the buffering timeout error in serverless
    mongoose.set('bufferCommands', false);

    cachedConnection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    // In serverless, we don't necessarily want to exit the process, 
    // but for now, we'll keep the logic as requested
    throw error;
  }
};

module.exports = connectDB;

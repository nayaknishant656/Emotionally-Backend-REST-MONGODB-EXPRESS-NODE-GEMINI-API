const config = require('./src/config');
const connectDB = require('./src/config/db');
const app = require('./src/app');




const startServer = async () => {
    try {
        await connectDB();
        app.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port}`);
        });
    } catch (error) {
        process.exit(1);
    }
};

startServer();

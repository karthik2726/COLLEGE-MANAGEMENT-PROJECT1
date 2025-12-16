const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminPageService = require('./service');

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for sync operation');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

// Run synchronization
const runSync = async () => {
    try {
        await connectDB();
        console.log('Starting admin pages synchronization...');
        
        await adminPageService.syncPages();
        
        console.log('Synchronization completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Synchronization failed:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    runSync();
}

module.exports = runSync;
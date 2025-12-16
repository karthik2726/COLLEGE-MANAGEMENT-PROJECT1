require('dotenv').config();
const mongoose = require('mongoose');
const { syncPagesFromSource } = require('./service');

async function main() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.error('MONGO_URL not set in environment');
    process.exit(2);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB Atlas');

    const result = await syncPagesFromSource();
    console.log(`Synced ${result.synced} pages.`);
    process.exit(0);
  } catch (err) {
    console.error('Error during sync:', err);
    process.exit(1);
  }
}

main();

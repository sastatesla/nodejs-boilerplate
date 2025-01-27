const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config(); 

const db = config.get('mongoURI')
  .replace('${MONGODB_USERNAME}', process.env.MONGODB_USERNAME)
  .replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD)
  .replace('${MONGODB_SERVER}', process.env.MONGODB_SERVER)
  .replace('${MONGODB_MAIN_DB_NAME}', process.env.MONGODB_MAIN_DB_NAME);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
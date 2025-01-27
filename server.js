const express = require('express');

const app = express();
require('dotenv').config();

const { default: router } = require('./src/routes/main.routes');
const { ApiResponseHandler } = require('./src/utils/ApiResponse');
const connectDB = require('./src/config/db');
const { seedDatabase } = require('./src/seeders/seedDatabase');


connectDB();
seedDatabase()
app.use(express.json());
app.use(ApiResponseHandler);


app.use('/v1', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  
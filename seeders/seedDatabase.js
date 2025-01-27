require('dotenv').config(); 
const config = require('config');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const hashPassword = require('../utils/hashPassword');


const seedData = JSON.parse(fs.readFileSync('src/seeders/seeder.json', 'utf8'));
const db = config.get('mongoURI')
  .replace('${MONGODB_USERNAME}', process.env.MONGODB_USERNAME)
  .replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD)
  .replace('${MONGODB_SERVER}', process.env.MONGODB_SERVER)
  .replace('${MONGODB_MAIN_DB_NAME}', process.env.MONGODB_MAIN_DB_NAME);

exports.seedDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    
    for (const role of seedData[0].value) {
      await Role.updateOne({ slug: role.slug }, role, { upsert: true });
    }

    for (const user of seedData[1].value) {
      const role = await Role.findOne({ slug: seedData[1].link[0].filter.slug });
      user.roleId = role._id;
      user.password = await hashPassword(user.password);
      await User.updateOne({ email: user.email }, user, { upsert: true });
    }

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};


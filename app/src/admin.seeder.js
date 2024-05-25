/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./config/config');
const { User } = require('./models');

mongoose.connect(config.mongoose.url, config.mongoose.options);

const seedAdmin = async () => {
  try {
    const admin = await User.findOne({ role: 'ADMIN' });
    if (admin) {
      console.log('Admin already exists');
      return;
    }

    const adminData = {
      name: 'ahmed',
      phone: '01093739621',
      password: 'a12345678',
      role: 'ADMIN',
    };

    await User.create(adminData);

    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedAdmin();

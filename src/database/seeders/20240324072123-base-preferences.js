'use strict';

const bcrypt = require('bcryptjs');
const { User, Preference } = require('../../models');
const userPreferences = [
  {
    firstName: 'Sheff', lastName: 'lastname', email: 'sing@ema.com', userName: 'usernaeme',
    preferences: [
      { language: 'fr', emailNotification: 'false', browserNotification: 'false' }
    ]
  },
  {
    firstName: 'Kevin', lastName: 'dubye', email: 'amd@gme.com', userName: 'kevin3',
    preferences: [
      { language: 'en', emailNotification: 'true', browserNotification: 'true' }
    ]
  },
  {
    firstName: 'Fred', lastName: 'Redd', email: 'free@test.com', userName: 'frereed',
    preferences: [
      { language: 'fgg', emailNotification: '', browserNotification: 'false' }
    ]
  },
  {
    firstName: 'kien',
    lastName: 'liken',
    email: 'fred_redd@example.com',
    userName: 'fred_redd123',
    role: 'user',
    password: bcrypt.hashSync('P@ssw0rd123'),
    preferences: [
      {
        language: 'English',
        emailNotification: 'true',
        browserNotification: 'false'
      }
    ]
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const userPreference of userPreferences) {
      const { firstName, lastName, email, userName, password, preferences } = userPreference;
      let user = await User.findOne({ where: { firstName, lastName, userName } });
      if (!user) user = await User.create({ firstName, lastName, email, userName, password });
      for (const preference of preferences) {
        await user.createPreference(preference);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    for (const userPreference of userPreferences) {
      const { firstName, preferences } = userPreference;
      const user = await User.findOne({ where: { firstName } });
      for (const preference of preferences) {
        await Preference.destroy({ where: { ...preference, userId: user.id } });
      }
    }
  },
};

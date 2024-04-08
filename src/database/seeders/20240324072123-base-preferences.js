'use strict';

const { Op } = require('sequelize');

const bcrypt = require('bcryptjs');
const { User, Preference } = require('../../models');
const userPreferences = [
  {
    email: 'sing@ema.com', userName: 'usernaeme',
    preferences: [
      { language: 'fr', emailNotification: 'false', browserNotification: 'false' }
    ]
  },
  {
    email: 'amd@gme.com', userName: 'kevin3',
    preferences: [
      { language: 'en', emailNotification: 'true', browserNotification: 'true' }
    ]
  },
  {
    email: 'free@test.com', userName: 'frereed',
    preferences: [
      { language: 'fgg', emailNotification: '', browserNotification: 'false' }
    ]
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const userPreference of userPreferences) {
      const { email, userName, role, password, preferences } = userPreference;
      // let user = await User.findOrCreate({ [Op.or]: { userName, email } });
      let user = await User.findOne({ where: { [Op.or]: { userName, email } } });
      if (!user) user = await User.create({ email, userName, password });
      for (const preference of preferences) {
        await user.createPreference(preference);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    for (const userPreference of userPreferences) {
      const { userName, email, preferences } = userPreference;
      const user = await User.findOne({ where: { [Op.or]: { userName, email } } });
      for (const preference of preferences) {
        await Preference.destroy({ where: { ...preference, userId: user.id } });
      }
    }
  },
};

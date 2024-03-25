'use strict';

const { User } = require('../../models');

const users = [
  { id: require('crypto').randomUUID(), firstName: 'Sheff', lastName: 'lastname', email: 'sing@ema.com', userName: 'usernaeme', password: 'usniijdaoeng h' },
  { id: require('crypto').randomUUID(), firstName: 'Kevin', lastName: 'dubye', email: 'amd@gme.com', userName: 'kevin3', password: 'hiepjdaoeng h' },
  { id: require('crypto').randomUUID(), firstName: 'Fred', lastName: 'Redd', email: 'free@test.com', userName: 'frereed', password: 'heihgijdaoeng hfja' }

  // { firstName: 'Sheff', lastName: 'lastname', email: 'sing@ema.com', userName: 'usernaeme', password: 'usnii' },
  // { firstName: 'Kevin', lastName: 'dubye', email: 'amd@gme.com', userName: 'kevin3', password: 'hiep' },
  // { firstName: 'Fred', lastName: 'Redd', email: 'free@test.com', userName: 'frereed', password: 'heihgifja' }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [...users], {})
  },

  async down(queryInterface, Sequelize) {

    const { Op } = require('sequelize');
    await queryInterface.bulkDelete('Users', { firstName: { [Op.in]: ['Sheff', 'Kevin', 'Fred'] } }, {})
  }
};

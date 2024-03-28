'use strict';

const { User } = require('../../models');
const bcrypt = require('bcryptjs')

const users = [
  { id: require('crypto').randomUUID(), email: 'sing@ema.com', userName: 'usernaeme', role: 'admin', password: bcrypt.hashSync('usniijdaoeng h') },
  { id: require('crypto').randomUUID(), email: 'amd@gme.com', userName: 'kevin3', role: 'user', password: bcrypt.hashSync('hiepjdaoeng h') },
  { id: require('crypto').randomUUID(), email: 'free@test.com', userName: 'frereed', role: 'user', password: bcrypt.hashSync('heihgijdaoeng hfja') }

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
    await queryInterface.bulkDelete('Users', { userName: { [Op.in]: ['usernaeme', 'kevin3', 'frereed'] } }, {})
  }
};

'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      login: 'admin',
      password: '$2b$12$4BK6ILADS28jZPZ6sO/OW.hkhfzBm1Enzj1oYqN0E1BZDeYJT8hwa',
      salt: 'evKJA',
      createdAt : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', [{
      login: 'admin',
    }])
  }
};

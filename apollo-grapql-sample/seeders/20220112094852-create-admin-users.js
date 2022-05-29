'use strict';

const models = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

          /// Create Super admin one
          const user1 = await models.User.create({
              firstName: 'Super',
              lastName: 'One',
              username: 'Admin123',
              password: 'Admin123',
              email: 'testsuper@mailinator.com',
              isActive: 1
          });

          await models.UserRole.bulkCreate(
              [
                  {
                      roleId: 1,
                      userId: user1.id
                  }
              ]
          );
  },

  down: async (queryInterface, Sequelize) => {}
};

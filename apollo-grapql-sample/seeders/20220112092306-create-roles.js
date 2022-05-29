'use strict';

const moment = require("moment");
module.exports = {
  up: async (queryInterface, Sequelize) => {
      const role = await queryInterface.rawSelect('Roles', {
          where: {
              id: 1,
          },
      }, ['id']);
        if(!role){
            await queryInterface.bulkInsert('Roles',
                [{
                    name: 'Super Admin',
                },
                {
                    name: 'User',
                },
                ], {});
        }
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Roles', null, {});
  }
};

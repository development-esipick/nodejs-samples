'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {type: Sequelize.TEXT('long'),allowNull: true},
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    },{initialAutoIncrement: 1000});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');

  }
};

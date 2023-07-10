'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'adminSellerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'AdminSellers', // Nama tabel tujuan foreign key
        key: 'id', // Nama kolom tujuan foreign key
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'adminSellerId', null)
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductCategories',
          key: 'id'
        }
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductTypes',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      minimumOrder: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      shippingInsurance: {
        type: Sequelize.STRING
      },
      deliveryService: {
        type: Sequelize.STRING
      },
      voucherId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Izinkan nilai voucherId null
        defaultValue: null, // Atur default value menjadi null,
        references: {
          model: 'Vouchers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
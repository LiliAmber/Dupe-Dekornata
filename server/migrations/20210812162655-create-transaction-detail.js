"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transaction_Details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CartId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Carts",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      TransactionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Transactions",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transaction_Details");
  },
};

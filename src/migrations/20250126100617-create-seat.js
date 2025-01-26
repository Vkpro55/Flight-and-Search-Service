'use strict';
/** @type {import('sequelize-cli').Migration} */


const { Enum } = require("../utils/common");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enum.SEAT_TYPE;
const { BOOKED, AVAILABLE } = Enum.SEAT_STATUS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seatmapId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SeatMaps",
          key: "id"
        },
        onDelete: "CASCADE",
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: [BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS],
        defaultValue: BUSINESS,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: [BOOKED, AVAILABLE],
        defaultValue: AVAILABLE,
        allowNull: false
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
    await queryInterface.dropTable('Seats');
  }
};
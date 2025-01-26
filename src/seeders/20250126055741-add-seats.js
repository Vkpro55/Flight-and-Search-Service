'use strict';

/** @type {import('sequelize-cli').Migration} */


const { Enum } = require("../utils/common");

const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enum.SEAT_TYPE;
const { A, B, C, D, E, F } = Enum.SEAT_COLUMNS;

module.exports = {
  async up(queryInterface, Sequelize) {

    /* 1-6=> first_class || 7-12=> business || 13-18=> premium_economy || 19-30=>economy */
    const seatTypes = {
      FIRST_CLASS: 6,
      BUSINESS: 12,
      PREMIUM_ECONOMY: 18,
      ECONOMY: 30
    };

    const columns = [A, B, C, D, E, F];

    const rows = 30;

    const airplaneId = 9; /* airbus380 */

    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let col of columns) {
        let seatType;

        if (row <= seatTypes['FIRST_CLASS']) {
          seatType = FIRST_CLASS;
        } else if (row <= seatTypes['BUSINESS']) {
          seatType = BUSINESS;
        } else if (row <= seatTypes['PREMIUM_ECONOMY']) {
          seatType = PREMIUM_ECONOMY;
        } else {
          seatType = ECONOMY;
        }

        seats.push({
          airplaneId: airplaneId,
          row: row,
          cole: col,
          type: seatType,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    /* Syntax: .bulkInsert("Models_name", [values], {}) */
    await queryInterface.bulkInsert("Seats", seats, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Seats",
      {
        airplaneId: 9
      });
  }
};

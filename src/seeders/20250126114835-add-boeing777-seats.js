'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Enum } = require("../utils/common");

const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enum.SEAT_TYPE;
const { A, B, C, D, E, F, G } = Enum.SEAT_COLUMNS;
const { AVAILABLE } = Enum.SEAT_STATUS;

module.exports = {
  async up(queryInterface, Sequelize) {

    /* 1-6=> first_class || 7-12=> business || 13-18=> premium_economy || 19-30=>economy */
    const seatTypes = {
      FIRST_CLASS: 6,
      BUSINESS: 12,
      PREMIUM_ECONOMY: 18,
      ECONOMY: 30
    };

    const seatmapId = 6; /* airbus380 */

    const columns = [A, B, C, D, E, F, G];
    const rows = await queryInterface.rawSelect("SeatMaps", {
      where: { id: seatmapId },
    }, ["rows"]);

    if (!rows) {
      throw new Error(`SeatMap with id ${seatmapId} not found`);
    }

    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let col of columns) {
        let seatType;

        if (row <= seatTypes["FIRST_CLASS"]) {
          seatType = FIRST_CLASS;
        } else if (row <= seatTypes["BUSINESS"]) {
          seatType = BUSINESS;
        } else if (row <= seatTypes["PREMIUM_ECONOMY"]) {
          seatType = PREMIUM_ECONOMY;
        } else {
          seatType = ECONOMY;
        }

        seats.push({
          seatmapId: seatmapId,
          row: row,
          col: col,
          type: seatType,
          status: AVAILABLE,
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
        seatmapId: 6
      });

  }
};
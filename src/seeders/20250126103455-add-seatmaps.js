'use strict';

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert("SeatMaps", [
      {
        airplaneId: 9,
        rows: 30,
        columns: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        airplaneId: 10,
        rows: 30,
        columns: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("SeatMaps",
      {
        [Op.or]:
          [
            { airplaneId: 9 },
            { airplaneId: 10 }
          ]
      });
  }
};

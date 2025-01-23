'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /*== Migration will directly gives you DB level Access.
    Note: This are happens only at DB level, to set-up for javascript level, we need to set-up independently.
    ==*/

    await queryInterface.addConstraint("Airports", {
      type: "FOREIGN KEY",
      fields: ["cityId"],
      name: "city_fk_constraint",
      references: {
        table: "Cities",
        field: "id"
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "city_fk_constraint");
  }
};

'use strict';
const {
  Model
} = require('sequelize');

const { Enum } = require("../utils/common");
const { BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS } = Enum.SEAT_TYPE;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE"
      })
    }
  }
  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: [BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS],
      defaultValue: BUSINESS,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};



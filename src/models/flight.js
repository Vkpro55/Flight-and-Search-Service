'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {

    static associate(models) {

      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
      });

    }

  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardingGate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalSeats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
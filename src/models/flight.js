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
        as: "Airplane_Detail",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "Departure_Airport",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "Arrival_Airport",
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
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
    },
    totalSeats: {/*== Total Available Seats ==*/
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
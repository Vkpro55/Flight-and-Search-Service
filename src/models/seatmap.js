'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeatMap extends Model {

    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE"
      });

      this.hasMany(models.Seat, {
        foreignKey: "seatmapId",
        onDelete: "CASCADE"
      })
    }

  }
  SeatMap.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rows: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    columns: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SeatMap',
  });
  return SeatMap;
};
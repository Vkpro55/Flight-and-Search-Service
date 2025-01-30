const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City, sequelize } = require("../models");

const { addRowLockOnFlights } = require("./queries");
const db = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    /*==
        filter= {
            departureAirportId: "DEL",
            arrivalAirportId: "BLR",
            price: {
                [Op.between]: [100 - 400]
            },
            totalSeats: {
                [Op.get]: 120
            }
            departureTime:{
                [Op.between] : [startTime_UTC, endTime_UTC]
            }
        }
        
    ==*/
    /*==
    Driver converted sql query => 
    SELECT 
        flights.*,
        airplanes.*
        FROM 
            flights
        LEFT OUTER JOIN 
            airplanes 
        ON 
            flights.airplaneId = airplanes.id
        WHERE 
            departureAirportId = 'DEL' 
            AND arrivalAirportId = 'BLR' 
            AND price BETWEEN 1000 AND 4000 
            AND totalSeats >= 20 
            AND departureTime BETWEEN '2025-01-08 00:11:00' AND '2025-01-08 12:11:00'
        ORDER BY 
            column_name1 ASC, column_name2 DESC;

    ==*/

    /*== Syntax for order: [
                               [column_name, "ASC"],
                               [column_name, "DESC"],
                           ]
    ==*/

    async getAll(filter, sortFilter) {
        const response = await Flight.findAll({
            where: filter,
            order: sortFilter,
            include: [
                {
                    model: Airplane,
                    as: "Airplane_Detail",
                    required: true,
                },
                {
                    model: Airport,
                    as: "Departure_Airport",
                    required: true,
                    on: {
                        col1: sequelize.where(sequelize.col("Flight.departureAirportId"), "=", sequelize.col("Departure_Airport.code")),
                    },
                    include: {
                        model: City,
                        as: "City",
                        required: true,
                    }
                },
                {
                    model: Airport,
                    as: "Arrival_Airport",
                    required: true,
                    on: {
                        col1: sequelize.where(sequelize.col("Flight.arrivalAirportId"), "=", sequelize.col("Arrival_Airport.code")),
                    },
                    include: {
                        model: City,
                        as: "City",
                        required: true,
                    }
                }

            ]
        });

        return response;
    }



    /**
     * Problem: First this is part of transaction query
     *          - two users want to decrese the flight seats at the same time, put row-level lock: Pessimistic Concurrenyc Lock: Raw Queries in Sequelize 
     */

    async updateRemainingSeat({ flightId, seats, dec = true }) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if (+dec) {
                await flight.decrement('totalSeats', { by: seats }, { transaction: transaction });
            } else {
                await flight.increment('totalSeats', { by: seats }, { transaction: transaction });
            }

            /**
              * It will update the database but not the instance that you are getting
              * save() => when you changed the data manully and you want the changes data is effected in DB as well. => UPDATE flights SET totalSeats = ? WHERE id = flightId?;
              * reload() =>when some operation changes the DB data, and you want latest data. => SELECT * FROM flights WHERE id = flightId?;
              */
            await flight.reload({ transaction: transaction });

            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
};


module.exports = FlightRepository;
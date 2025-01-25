const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City, sequelize } = require("../models");

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

};


module.exports = FlightRepository;
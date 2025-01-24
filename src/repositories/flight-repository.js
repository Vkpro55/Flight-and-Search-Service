const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");

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
    SELECT * FROM flights
            WHERE 
                departureAirportId = 'DEL' AND
                arrivalAirportId = 'BLR' AND
                price BETWEEN 1000 AND 4000 AND
                totalSeats >= 20 AND
                departureTime BETWEEN "2025-01-08 00:11:00" AND "2025-01-08 12:11:00"
    ==*/

    /*== Syntax for order: [
                               [column_name, "ASC"],
                               [column_name, "DESC"],
                           ]==*/

    async getAll(filter, sortFilter) {
        const response = await Flight.findAll({
            where: filter,
            order: sortFilter
        });

        return response;
    }
};


module.exports = FlightRepository;
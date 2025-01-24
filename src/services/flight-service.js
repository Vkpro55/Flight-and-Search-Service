const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { Flightrepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");
const { DateTimeHelper } = require("../utils/helpers");

/*== Create new object ==*/
const flightRepository = new Flightrepository();

const createFlight = async (data) => {
    try {
        /*== 
        Sequelize stores dates in the database in UTC by default to ensure consistency across systems and time zones.
        input: "2025-01-28 11:00:00" => iy will consider the local time zone: "2025-01-28 11:00:00 + 5:30"
        output: "2025-01-28T05:30:00.000Z"
        ==*/
        const { departureTime, arrivalTime } = data;

        if (!DateTimeHelper.compareDateTime(departureTime, arrivalTime)) {
            throw new AppError(
                "Arrival Time must be greater than Departure Time.",
                StatusCodes.BAD_REQUEST
            );
        }

        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if (error instanceof AppError && error.statusCode === StatusCodes.BAD_REQUEST) {
            throw error;
        }

        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAllFlights = async (query) => {

    /*== url?trips=MUM-DEL&price=1000-4000&travellers=20&tripDate=2025-01-08==*/
    /*== We need a filter object to pass repository for filtering flights. ==*/

    const endingTripTime = " 23:59:00";
    let customFilter = {};
    let sortFilters = [];

    if (query.trips) {
        let [departureAirportId, arrivalAirportId] = query.trips.split("-"); /*== [MUM, DEL] ==*/
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        /*== Check, if dAirport and aAirport are same then handle it gracefully. ==*/
    }

    if (query.price) {
        let [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            /*== Handle single value : [3500 undefined] ==*/
            [Op.between]: [minPrice, (maxPrice !== undefined ? maxPrice : 2 * minPrice)]/*== Example Query: WHERE price BETWEEN 100 AND 500 ==*/
        }

        /*==Check, if the minPrice should <= maxprice ==*/
    }

    if (query.travellers) {
        if (query.travellers <= 0) {
            throw new AppError("Travellers should be >= 1", StatusCodes.BAD_REQUEST)
        }

        customFilter.totalSeats = {
            /*== Available Seats >= requested seats to book ==*/
            [Op.gte]: query.travellers
        }
    }


    if (query.tripDate) {
        /*==In the DB: Dates are stored in UTC format +5:30, so every date is 5:30 hours back ==*/
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if (query.sort) {
        let params = query.sort.split(",");

        sortFilters = params.map((param) => {
            return param.split("_");
        });
    }

    try {
        const flights = await flightRepository.getAll(customFilter, sortFilters);
        return flights;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
};
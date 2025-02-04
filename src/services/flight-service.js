const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");

const { Flightrepository } = require("../repositories");
const { DateTimeHelper } = require("../utils/helpers");
const { FlightFilterHelper } = require("../utils/helpers");

/*== Create new object ==*/
const flightRepository = new Flightrepository();

const createFlight = async (data) => {
    try {
        /*== 
        Sequelize stores dates in the database in UTC by default to ensure consistency across systems and time zones.
        input: "2025-01-28 11:00:00" => it will consider the local time zone: "2025-01-28 11:00:00 + 5:30"
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
    const { customFilter, sortFilters } = FlightFilterHelper.flightFilters(query);

    try {
        let flights = await flightRepository.getAll(customFilter, sortFilters);
        return flights;
    } catch (error) {
        console.log("Error is: ", error);
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


const getFlight = async (id) => {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The flight you requested is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of a flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateSeats = async (data) => {
    try {
        const response = await flightRepository.updateRemainingSeat({
            flightId: data.flightId,
            seats: data.seats,
            dec: data.dec
        });
        return response;
    } catch (error) {
        console.log("Error is: ", error);
        throw new AppError("Cannot update data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");

const { Flightrepository } = require("../repositories");
const { DateTimeHelper } = require("../utils/helpers");
const { FlightFilterHelper } = require("../utils/helpers");

const { getAirplane } = require("./airplane-service");
const { getAirport } = require("./airport-service");

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
    const { customFilter, sortFilters } = FlightFilterHelper.flightFilters(query);

    try {
        let flights = await flightRepository.getAll(customFilter, sortFilters);

        let updatedFlights = await Promise.all(flights.map(async (flight) => {
            try {
                const airplaneData = await getAirplane(flight.airplaneId);
                const departureAirportData = await getAirport(flight.departureAirportId);
                const arrivalAirportData = await getAirport(flight.arrivalAirportId);

                flight.airplaneId = airplaneData.modelNumber;
                flight.departureAirportId = departureAirportData.name;
                flight.arrivalAirportId = arrivalAirportData.name;

                return flight;
            } catch (error) {
                throw new AppError("Error processing flight", StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }));

        return updatedFlights;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
};
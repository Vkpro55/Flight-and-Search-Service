const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

/*== Create new object ==*/
const airportRepository = new AirportRepository();

const createAirport = async (data) => {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new Airport object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirpopts = async () => {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirport = async (id) => {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of an airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyAirport = async (id) => {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to delete is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of an airport you requested to delete", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateAirport = async (id, data) => {
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to update is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of an airport you requested to update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirpopts,
    getAirport,
    destroyAirport,
    updateAirport
};
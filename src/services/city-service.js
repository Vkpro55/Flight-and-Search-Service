const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

/*== Create new object ==*/
const cityRepository = new CityRepository();

const createCity = async (data) => {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {

        if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        /*== TypeError ==*/
        throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyCity = async (id) => {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The city you requested to delete is not found", error.statusCode);
        }
        /*== From server while destroying airplane ==*/
        throw new AppError("Cannot fetch data of a city you requested to delete", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateCity = async (id, data) => {
    try {
        const response = await cityRepository.update(id, data);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);


        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The city you requested to update is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of a city you requested to update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createCity,
    destroyCity,
    updateCity
}
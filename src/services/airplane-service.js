const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

/*== Create new object ==*/
const airplaneRepository = new AirplaneRepository();

/*== This service function will create a new airplane==*/
const createAirplane = async (data) => {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }


        /*== TypeError ==*/
        throw new AppError("Cannot create a new Airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


/*== This service function will create a get all the available airplanes==*/
const getAirplanes = async () => {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        /*== There is no validation error, error can only cause by the server getAll function ==*/
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirplane = async (id) => {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airplne you requested is not found", error.statusCode);
        }

        /*== Validation Error on PK: no required as PK is unique and auto generated ==*/
        /*== Database server error while getting our airplane using pk ==*/
        throw new AppError("Cannot fetch data of an airplane", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyAirplane = async (id) => {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airplne you requested to delete is not found", error.statusCode);
        }
        /*== From server while destroying airplane */
        throw new AppError("Cannot fetch data of an airplane you requested to delete", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateAirplane = async (id, data) => {
    try {
        const response = await airplaneRepository.update(id, data);
        return response;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The airplne you requested to update is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of an airplane you requested to update", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};
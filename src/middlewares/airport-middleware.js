const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-errors");
const { Airport } = require("../models");

const validateCreateRequest = (req, res, next) => {
    if (!req.body.name) {

        ErrorResponse.message = "Something went wrong while creating an aiport.";
        ErrorResponse.error = new AppError(["Airport name not found in the incoming request."], StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.code) {

        ErrorResponse.message = "Something went wrong while creating an aiport.";
        ErrorResponse.error = new AppError(["Airport code not found in the incoming request."], StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.cityId) {

        ErrorResponse.message = "Something went wrong while creating an aiport.";
        ErrorResponse.error = new AppError(["Airport associate cityId not found in the incoming request."], StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}


const validatePatchRequest = (req, res, next) => {
    /*== Check whether all req.body fields is valid or not ==*/

    const allFields = Object.keys(Airport.rawAttributes);
    const allReqFields = Object.keys(req.body);

    if (!allReqFields.length) {
        ErrorResponse.error = new AppError(["No fields are found in incoming request body to update"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    const invalidFields = allReqFields.filter((field) => !allFields.includes(field));
    if (invalidFields.length > 0) {
        ErrorResponse.data = { invalidFields };
        ErrorResponse.error = new AppError(["Some of the fields are not present that you requested to update"], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validatePatchRequest
}
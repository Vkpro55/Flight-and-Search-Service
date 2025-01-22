const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-errors");
const { Airplane } = require("../models");

const validateCreateRequest = (req, res, next) => {
    if (!req.body.modelNumber) {

        ErrorResponse.message = "Something went wrong while creating an airplane.";
        //ErrorResponse.error = { explanation: "Model number not foun in the incoming request. It should be in this form (modelNumber) only." };
        ErrorResponse.error = new AppError(["Model number not found in the incoming request.It should be in this form (modelNumber) only"], StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}


const validatePatchRequest = (req, res, next) => {
    /*== Check whether all req.body fields is valid or not ==*/

    const allFields = Object.keys(Airplane.rawAttributes);
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
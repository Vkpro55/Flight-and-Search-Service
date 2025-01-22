const { error } = require("winston");
const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

/*==
POST: /cities
req-body: {name:"Delhi"}
==*/
const createCity = async (req, res) => {
    try {

        const { name } = req.body;
        const data = {
            name: name
        }

        const city = await CityService.createCity(data);
        SuccessResponse.data = city;

        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


/*==
DELETE: /cities/:id
req-body: {}
==*/
const destroyCity = async (req, res) => {
    try {
        const id = req.params.id;
        const airplane = await CityService.destroyCity(id);
        SuccessResponse.data = airplane;

        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

/*==
PATCH: /cities/:id
req-body: {name: "xyz"}
==*/
const updateCity = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        /*==  Check whether you pass atleast one field to update ==*/

        const city = await CityService.updateCity(id, updateData);
        SuccessResponse.data = city;

        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    createCity,
    destroyCity,
    updateCity
}
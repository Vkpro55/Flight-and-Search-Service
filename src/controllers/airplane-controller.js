const { error } = require("winston");
const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

/*==
POST: /airplanes
req-body: {modelNumber: "airnbus320", capacity: 200}
==*/
const createAirplane = async (req, res) => {
    try {

        const { modelNumber, capacity } = req.body;
        const data = {
            modelNumber: modelNumber,
            capacity: capacity
        }

        const airplane = await AirplaneService.createAirplane(data);
        SuccessResponse.data = airplane;

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
GET: /airplanes
req-body: {}
==*/
const getAirplanes = async (req, res) => {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;

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
GET: /airplanes/:id
req-body: {}
==*/
const getAirplane = async (req, res) => {
    try {
        const id = req.params.id;
        const airplane = await AirplaneService.getAirplane(id);
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
DELETE: /airplanes/:id
req-body: {}
==*/
const destroyAirplane = async (req, res) => {
    try {
        const id = req.params.id;
        const airplane = await AirplaneService.destroyAirplane(id);
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
PATCH: /airplanes/:id
req-body: {capacity: 200}
==*/
const updateAirplane = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        /*==  Check whether you pass atleast one field to update ==*/

        const airplane = await AirplaneService.updateAirplane(id, updateData);
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


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};
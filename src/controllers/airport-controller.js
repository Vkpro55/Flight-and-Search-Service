
const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/*==
POST: /airports
req-body: {name: "Kempegowda International Airport". code: "BLR", address; "", cityId: }
==*/
const createAirport = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        }

        const airport = await AirportService.createAirport(data);
        SuccessResponse.data = airport;

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
GET: /airports
req-body: {}
==*/
const getAirpopts = async (req, res) => {
    try {
        const airports = await AirportService.getAirpopts();
        SuccessResponse.data = airports;

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
GET: /airports/:id
req-body: {}
==*/
const getAirport = async (req, res) => {
    try {
        const id = req.params.id;
        const airport = await AirportService.getAirport(id);
        SuccessResponse.data = airport;

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
DELETE: /airports/:id
req-body: {}
==*/
const destroyAirport = async (req, res) => {
    try {
        const id = req.params.id;
        const airport = await AirportService.destroyAirport(id);
        SuccessResponse.data = airport;

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
PATCH: /airports/:id
req-body: {name:"" or address:"" or code:""}
==*/
const updateAirport = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const aiport = await AirportService.updateAirport(id, updateData);
        SuccessResponse.data = aiport;

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
    createAirport,
    getAirpopts,
    getAirport,
    destroyAirport,
    updateAirport
};
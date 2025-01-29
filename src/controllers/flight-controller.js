
const { StatusCodes } = require("http-status-codes");

const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/*==
POST: /flights
req-body: {
           flightNumber: 'UK 808',
           airplaneId: 'a380',
           departureAirportId: "DEL",
           arrivalAirportId: "BLR",
           arrivalTime: '11:10:00',
           departureTime: '9:10:00',
           price: 2000
           boardingGate: '12A',
           totalSeats: 120 => as of know we put value, but it must associate with airplane => capacity field.
        }
==*/
const createFlight = async (req, res) => {
    try {
        const data = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        }

        const flight = await FlightService.createFlight(data);
        SuccessResponse.data = flight;

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
GET: /flights
req.query: {?trips=MUM-DEL&travellers=4....}
==*/
const getAllFlights = async (req, res) => {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;

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
GET: /flights/:id
req-body: {}
==*/
const getFlight = async (req, res) => {
    try {
        const id = req.params.id;
        const flight = await FlightService.getFlight(id);
        SuccessResponse.data = flight;

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
    createFlight,
    getAllFlights,
    getFlight
};
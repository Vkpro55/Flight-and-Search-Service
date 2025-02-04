const { StatusCodes } = require("http-status-codes");
const { SeatService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function seatDetails(req, res) {
    try {
        const seat = await SeatService.seatDetails(req.params.id);

        SuccessResponse.data = seat;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        console.log(error);
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    seatDetails
}
const { StatusCodes } = require("http-status-codes");
const { SeatService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function seatUpdate(req, res) {
    try {
        const response = await SeatService.updateSeat({
            seatId: req.params.id,
            status: req.body.status
        });

        SuccessResponse.data = response;
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
    seatUpdate
}
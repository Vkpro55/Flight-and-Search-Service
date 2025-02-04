const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");

const { SeatRepository } = require("../repositories");
const seatRepo = new SeatRepository();

async function seatDetails(seatId) {
    try {
        const seat = await seatRepo.get(seatId);
        return seat;
    } catch (error) {
        console.log("Error is: ", error);

        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The Seat you requested is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of a seat", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    seatDetails
}
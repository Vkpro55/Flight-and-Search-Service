const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");

const { SeatRepository } = require("../repositories");
const seatRepo = new SeatRepository();


async function updateSeat(data) {
    try {
        const response = await seatRepo.updateSeat(data.seatId, data.status);
        return response;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError("Cannot fetch data of a seat", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = {
    updateSeat
}
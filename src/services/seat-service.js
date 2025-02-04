
const { SeatRepository } = require("../repositories");
const seatRepo = new SeatRepository();

async function seatDetails(seatId) {
    try {
        const seat = await seatRepo.get(seatId);
        return seat;
    } catch (error) {
        console.log("Error is: ", error);

        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The flight you requested is not found", error.statusCode);
        }

        throw new AppError("Cannot fetch data of a flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    seatDetails
}
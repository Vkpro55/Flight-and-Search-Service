const CrudRepository = require("./crud-repository");
const { Seat, SeatMap, Airplane, sequelize } = require("../models");

const { addRowLockOnSeats } = require("./queries");
const db = require("../models");

const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");

const { Enum } = require("../utils/common");
const { AVAILABLE, BOOKED } = Enum.SEAT_STATUS;

class SeatRepository extends CrudRepository {
    constructor() {
        super(Seat);
    }

    async updateSeat(seatId, status) {
        const transaction = await db.sequelize.transaction();
        try {
            await addRowLockOnSeats(seatId)

            const seat = await Seat.findOne({
                where: { id: seatId },
                include: [
                    {
                        model: SeatMap,
                        as: "seatmap_detail",
                        required: true,
                        include: {
                            model: Airplane,
                            as: "Airplane_details",
                            required: true,
                        }
                    }
                ],
                transaction
            });
            if (!seat) {
                throw new AppError("The Seat you requested is not found", StatusCodes.NOT_FOUND);
            }

            if (seat.status !== AVAILABLE) {
                throw new AppError("Seat is already booked", StatusCodes.CONFLICT);
            }

            seat.status = status;
            await seat.save({ transaction: transaction });

            await transaction.commit();
            return seat;
        } catch (error) {
            await transaction.rollback();

            if (error.name === "SequelizeDatabaseError") {
                throw new AppError(error.parent, StatusCodes.SERVICE_UNAVAILABLE);
            } else {
                throw error;
            }
        }
    }
}

module.exports = SeatRepository;
const CrudRepository = require("./crud-repository");
const { Seat, SeatMap, Flight, Airplane } = require("../models");

const db = require("../models");
const AppError = require("../utils/errors/app-errors");
const { StatusCodes } = require("http-status-codes");

class SeatRepository extends CrudRepository {
    constructor() {
        super(Seat);
    }

    async get(seatId) {
        const seatDetails = await Seat.findOne({
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
            ]
        });

        if (!seatDetails) {
            return new AppError("Not fund the resources", StatusCodes.NOT_FOUND);
        }

        return seatDetails;
    }
}

module.exports = SeatRepository;
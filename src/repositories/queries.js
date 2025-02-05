const db = require('../models');

function addRowLockOnFlights(flightId) {
    return `SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
}

async function addRowLockOnSeats(seatId) {
    try {
        const seat = await db.sequelize.query(
            `SELECT * FROM Seats WHERE id = :seatId FOR UPDATE`,
            {
                replacements: { seatId },
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );
        return seat;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addRowLockOnFlights,
    addRowLockOnSeats
}

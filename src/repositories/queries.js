const db = require('../models');

async function addRowLockonFlight(flightId) {
    return db.sequelize.query(
        'SELECT * FROM Flights WHERE Flights.id = :flightId FOR UPDATE;',
        {
            replacements: { flightId },
            type: db.Sequelize.QueryTypes.SELECT
        }
    );
}

module.exports = {
    addRowLockonFlight
}


const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-errors");
const { parse } = require("dotenv");

const flightFilters = (query) => {
    /*== url?trips=MUM-DEL&price=1000-4000&travellers=20&tripDate=2025-01-08==*/
    /*== We need a filter object to pass repository for filtering flights. ==*/

    const endingTripTime = " 23:59:00";
    let customFilter = {};
    let sortFilters = [];

    if (query.trips) {
        let [departureAirportId, arrivalAirportId] = query.trips.split("-"); /*== [MUM, DEL] ==*/

        /*== Check, if dAirport and aAirport are same then handle it gracefully. ==*/
        if (departureAirportId !== arrivalAirportId) {
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        }
        else {
            throw new AppError(
                "Departure and arrival airports cannot be the same.",
                StatusCodes.BAD_REQUEST
            );
        }
    }

    if (query.price) {
        let [minPrice, maxPrice] = query.price.split("-");
        minPrice = parseFloat(minPrice);
        maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;

        /*==Check, if the minPrice should < maxprice ==*/
        if (minPrice >= maxPrice) {
            throw new AppError(
                "Minimum price should be less than maximum price.",
                StatusCodes.BAD_REQUEST
            );
        }
        else {
            customFilter.price = {
                /*== Handle single value : [3500 undefined] ==*/
                [Op.between]: [minPrice, (maxPrice !== undefined ? maxPrice : 2 * minPrice)]/*== Example Query: WHERE price BETWEEN 100 AND 500 ==*/
            }
        }
    }

    if (query.travellers) {
        if (query.travellers <= 0) {
            throw new AppError("Travellers should be >= 1", StatusCodes.BAD_REQUEST)
        }

        customFilter.totalSeats = {
            /*== Available Seats >= requested seats to book ==*/
            [Op.gte]: query.travellers
        }
    }

    if (query.tripDate) {
        /*==In the DB: Dates are stored in UTC format +5:30, so every date is 5:30 hours back ==*/
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if (query.sort) {
        let params = query.sort.split(",");

        sortFilters = params.map((param) => {
            return param.split("_");
        });
    }

    return { customFilter, sortFilters };
}


module.exports = {
    flightFilters
}
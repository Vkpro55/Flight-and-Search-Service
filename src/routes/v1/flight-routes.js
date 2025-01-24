const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

/*== route: POST: /api/v1/flights/ ==*/
router.post("/",
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);


/*== route: GET: /api/v1/flights?trips=MUM-DEl&travellers=4.... ==*/
router.get("/", FlightController.getAllFlights);

module.exports = router;
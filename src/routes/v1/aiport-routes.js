const express = require("express");
const { AirportControler } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

/*== route: POST: /api/v1/airports/ ==*/
router.post("/",
    AirportMiddlewares.validateCreateRequest,
    AirportControler.createAirport);

/*== route: GET: /api/v1/airports/ ==*/
router.get("/", AirportControler.getAirpopts);

/*== route: GET: /api/v1/airports/:id ==*/
router.get("/:id", AirportControler.getAirport);

/*== route: DELETE: /api/v1/airports/:id ==*/
router.delete("/:id", AirportControler.destroyAirport);

/*== route: PATCH: /api/v1/airports/:id ==*/
router.patch("/:id",
    AirportMiddlewares.validatePatchRequest,
    AirportControler.updateAirport);


module.exports = router;
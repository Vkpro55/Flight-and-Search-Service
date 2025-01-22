const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

/*== route: POST: /api/v1/airplanes/ ==*/
router.post("/",
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);

/*== route: GET: /api/v1/airplanes/ ==*/
router.get("/", AirplaneController.getAirplanes);

/*== route: GET: /api/v1/airplanes/:id ==*/
router.get("/:id", AirplaneController.getAirplane);

/*== route: DELETE: /api/v1/airplanes/:id ==*/
router.delete("/:id", AirplaneController.destroyAirplane);

/*== route: PATCH: /api/v1/airplanes/:id ==*/
router.patch("/:id",
    AirplaneMiddlewares.validatePatchRequest,
    AirplaneController.updateAirplane);


module.exports = router;
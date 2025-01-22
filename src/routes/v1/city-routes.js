const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

/*== route: POST: /api/v1/cities/ ==*/
router.post("/",
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

/*== route: DELETE: /api/v1/cities/:id ==*/
router.delete("/:id", CityController.destroyCity);

/*== route: DELETE: /api/v1/cities/:id ==*/
router.patch("/:id",
    CityMiddlewares.validatePatchRequest,
    CityController.updateCity);



module.exports = router;
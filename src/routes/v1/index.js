const express = require("express");
const { InfoController } = require("../../controllers");

const airportRoutes = require("./aiport-routes");
const airplanesRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");

const router = express.Router();

router.use("/airports", airportRoutes)
router.use("/aiplanes", airplanesRoutes);
router.use("/cities", cityRoutes)
router.get("/info", InfoController.Info);

module.exports = router;
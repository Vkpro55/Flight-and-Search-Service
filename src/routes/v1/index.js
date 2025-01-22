const express = require("express");
const { InfoController } = require("../../controllers");

const airplanesRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");

const router = express.Router();

router.use("/aiplanes", airplanesRoutes);
router.use("/cities", cityRoutes)
router.get("/info", InfoController.Info);

module.exports = router;
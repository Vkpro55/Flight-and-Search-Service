const express = require("express");
const { SeatController } = require("../../controllers");

const router = express.Router();

router.get("/:id", SeatController.seatDetails);

module.exports = router;
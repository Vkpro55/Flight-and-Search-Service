const express = require("express");
const { SeatController } = require("../../controllers");

const router = express.Router();

router.patch("/:id", SeatController.seatUpdate);

module.exports = router;
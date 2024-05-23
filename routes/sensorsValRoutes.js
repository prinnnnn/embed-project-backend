const express = require("express");
const valuesController = require("../controllers/valuesController");

const router = express.Router();

router.get("/humid", valuesController.getHumidity);
router.get("/water_level", valuesController.getWaterLevel);
router.get("/temperature", valuesController.getTemperature);
router.get("/pump_state", valuesController.getPumpState);

module.exports = router;
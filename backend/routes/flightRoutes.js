const express = require("express");
const router = express.Router();
const {
  getFlights,
  searchFlight,
  createFlight,
  editFlight,
  removeFlight,
} = require("../controllers/flightController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getFlights);
router.get("/search", searchFlight);
router.post("/", authMiddleware, createFlight);
router.put("/:id", authMiddleware, editFlight);
router.delete("/:id", authMiddleware, removeFlight);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  bookFlight,
  myBookings,
  cancelMyBooking,
  allBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookFlight);
router.get("/my", authMiddleware, myBookings);
router.get("/", authMiddleware, allBookings);
router.delete("/:id", authMiddleware, cancelMyBooking);

module.exports = router;

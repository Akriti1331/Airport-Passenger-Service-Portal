const express = require("express");
const router = express.Router();
const {
  createComplaint,
  myComplaints,
  allComplaints,
} = require("../controllers/complaintController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createComplaint);
router.get("/my", authMiddleware, myComplaints);
router.get("/all", authMiddleware, allComplaints);

module.exports = router;

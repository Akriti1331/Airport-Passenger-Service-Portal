console.log("######## THIS IS THE LATEST SERVER.JS ########");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
console.log("✅ flightRoutes loaded");

app.use("/api/flights", flightRoutes);
console.log("✅ /api/flights route registered");
const bookingRoutes = require("./routes/bookingRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("NEW SERVER.JS LOADED");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await pool.getConnection();
    console.log("✅ Connected to MySQL");
    console.log(`🚀 Server is running on port ${PORT}`);
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  }
});

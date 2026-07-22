const pool = require("../config/db");

const createBooking = async (user_id, flight_id, seat_number) => {
  const [result] = await pool.query(
    "INSERT INTO bookings (user_id, flight_id, seat_number, booking_status) VALUES (?, ?, ?, ?)",
    [user_id, flight_id, seat_number, "confirmed"],
  );
  return result;
};

const getBookingsByUser = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT bookings.*, flights.flight_number, flights.source, flights.destination, 
     flights.departure_time, flights.arrival_time 
     FROM bookings 
     JOIN flights ON bookings.flight_id = flights.id 
     WHERE bookings.user_id = ?`,
    [user_id],
  );
  return rows;
};

const cancelBooking = async (id) => {
  const [result] = await pool.query(
    "UPDATE bookings SET booking_status = ? WHERE id = ?",
    ["cancelled", id],
  );
  return result;
};

const getAllBookings = async () => {
  const [rows] = await pool.query(
    `SELECT bookings.*, users.name AS passenger_name, users.email, 
     flights.flight_number, flights.source, flights.destination 
     FROM bookings 
     JOIN users ON bookings.user_id = users.id 
     JOIN flights ON bookings.flight_id = flights.id`,
  );
  return rows;
};

module.exports = {
  createBooking,
  getBookingsByUser,
  cancelBooking,
  getAllBookings,
};

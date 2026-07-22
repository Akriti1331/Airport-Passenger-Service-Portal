const pool = require("../config/db");

const getAllFlights = async () => {
  const [rows] = await pool.query("SELECT * FROM flights");
  return rows;
};

const searchFlights = async (source, destination) => {
  const [rows] = await pool.query(
    "SELECT * FROM flights WHERE source = ? AND destination = ?",
    [source, destination],
  );
  return rows;
};

const getFlightById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM flights WHERE id = ?", [id]);
  return rows[0];
};

const addFlight = async (
  flight_number,
  source,
  destination,
  departure_time,
  arrival_time,
  total_seats,
  available_seats,
  price,
) => {
  const [result] = await pool.query(
    "INSERT INTO flights (flight_number, source, destination, departure_time, arrival_time, total_seats, available_seats, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      available_seats,
      price,
    ],
  );
  return result;
};

const updateFlight = async (
  id,
  flight_number,
  source,
  destination,
  departure_time,
  arrival_time,
  total_seats,
  available_seats,
  price,
) => {
  const [result] = await pool.query(
    "UPDATE flights SET flight_number = ?, source = ?, destination = ?, departure_time = ?, arrival_time = ?, total_seats = ?, available_seats = ?, price = ? WHERE id = ?",
    [
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      available_seats,
      price,
      id,
    ],
  );
  return result;
};

const deleteFlight = async (id) => {
  const [result] = await pool.query("DELETE FROM flights WHERE id = ?", [id]);
  return result;
};

module.exports = {
  getAllFlights,
  searchFlights,
  getFlightById,
  addFlight,
  updateFlight,
  deleteFlight,
};

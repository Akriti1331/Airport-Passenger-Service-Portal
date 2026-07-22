const {
  getAllFlights,
  searchFlights,
  getFlightById,
  addFlight,
  updateFlight,
  deleteFlight,
} = require("../models/flightModel");

const getFlights = async (req, res) => {
  try {
    const flights = await getAllFlights();
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching flights" });
  }
};

const searchFlight = async (req, res) => {
  try {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res
        .status(400)
        .json({ message: "Please provide source and destination" });
    }

    const flights = await searchFlights(source, destination);
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while searching flights" });
  }
};

const getFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await getFlightById(id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching flight" });
  }
};

const createFlight = async (req, res) => {
  try {
    const {
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      price,
    } = req.body;

    if (
      !flight_number ||
      !source ||
      !destination ||
      !departure_time ||
      !arrival_time ||
      !total_seats ||
      !price
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    await addFlight(
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      total_seats,
      price,
    );

    res.status(201).json({ message: "Flight added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding flight" });
  }
};

const editFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      available_seats,
      price,
    } = req.body;

    const flight = await getFlightById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    await updateFlight(
      id,
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      available_seats,
      price,
    );

    res.status(200).json({ message: "Flight updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating flight" });
  }
};

const removeFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const flight = await getFlightById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    await deleteFlight(id);

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting flight" });
  }
};

module.exports = {
  getFlights,
  searchFlight,
  getFlight,
  createFlight,
  editFlight,
  removeFlight,
};

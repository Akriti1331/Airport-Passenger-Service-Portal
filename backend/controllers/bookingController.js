const {
  createBooking,
  getBookingsByUser,
  cancelBooking,
  getAllBookings,
} = require("../models/bookingModel");

const { getFlightById, updateFlight } = require("../models/flightModel");

const bookFlight = async (req, res) => {
  try {
    const { flight_id, seat_number } = req.body;
    const user_id = req.user.id;

    if (!flight_id || !seat_number) {
      return res
        .status(400)
        .json({ message: "Please provide flight and seat number" });
    }

    const flight = await getFlightById(flight_id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (flight.available_seats <= 0) {
      return res
        .status(400)
        .json({ message: "No seats available on this flight" });
    }

    await createBooking(user_id, flight_id, seat_number);

    await updateFlight(
      flight_id,
      flight.flight_number,
      flight.source,
      flight.destination,
      flight.departure_time,
      flight.arrival_time,
      flight.total_seats,
      flight.available_seats - 1,
      flight.price,
    );

    res.status(201).json({ message: "Flight booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while booking flight" });
  }
};

const myBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await getBookingsByUser(user_id);
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

const cancelMyBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await cancelBooking(id);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while cancelling booking" });
  }
};

const allBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching all bookings" });
  }
};

module.exports = {
  bookFlight,
  myBookings,
  cancelMyBooking,
  allBookings,
};

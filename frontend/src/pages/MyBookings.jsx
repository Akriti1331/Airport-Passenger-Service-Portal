import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext.jsx";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (err) {
      setError("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Booking cancelled successfully");
      fetchBookings();
    } catch (err) {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>My Bookings</h1>

        {error && <p className="error-text">{error}</p>}

        {loading ? (
          <p>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Flight No.</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Departure</th>
                  <th>Seat</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.flight_number}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.departure_time}</td>
                    <td>{booking.seat_number}</td>
                    <td>
                      <span
                        className={
                          booking.booking_status === "confirmed"
                            ? "badge badge-confirmed"
                            : "badge badge-cancelled"
                        }
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                    <td>
                      {booking.booking_status === "confirmed" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

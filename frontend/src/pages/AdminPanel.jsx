import React, { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../AuthContext.jsx";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("flights");

  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingFlightId, setEditingFlightId] = useState(null);
  const [flightForm, setFlightForm] = useState({
    flight_number: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    total_seats: "",
    available_seats: "",
    price: "",
  });

  const { token } = useContext(AuthContext);
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [flightsRes, bookingsRes, complaintsRes] = await Promise.all([
        api.get("/api/flights"),
        api.get("/api/bookings", authHeader),
        api.get("/api/complaints/all", authHeader),
      ]);

      setFlights(flightsRes.data);
      setBookings(bookingsRes.data);
      setComplaints(complaintsRes.data);
    } catch (err) {
      setError("Failed to load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const resetFlightForm = () => {
    setFlightForm({
      flight_number: "",
      source: "",
      destination: "",
      departure_time: "",
      arrival_time: "",
      total_seats: "",
      available_seats: "",
      price: "",
    });
    setEditingFlightId(null);
  };

  const handleFlightChange = (e) => {
    setFlightForm({ ...flightForm, [e.target.name]: e.target.value });
  };

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      flight_number,
      source,
      destination,
      departure_time,
      arrival_time,
      total_seats,
      price,
    } = flightForm;

    if (
      !flight_number ||
      !source ||
      !destination ||
      !departure_time ||
      !arrival_time ||
      !total_seats ||
      !price
    ) {
      setError("Please fill all required flight fields");
      return;
    }

    try {
      if (editingFlightId) {
        await api.put(
          `/api/flights/${editingFlightId}`,
          flightForm,
          authHeader,
        );
        setSuccess("Flight updated successfully");
      } else {
        await api.post("/api/flights", flightForm, authHeader);
        setSuccess("Flight added successfully");
      }

      resetFlightForm();
      fetchAllData();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save flight. Please try again.");
      }
    }
  };

  const handleEditFlight = (flight) => {
    setEditingFlightId(flight.id);
    setFlightForm({
      flight_number: flight.flight_number,
      source: flight.source,
      destination: flight.destination,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      total_seats: flight.total_seats,
      available_seats: flight.available_seats,
      price: flight.price,
    });
  };

  const handleDeleteFlight = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this flight?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/api/flights/${id}`, authHeader);
      setSuccess("Flight deleted successfully");
      fetchAllData();
    } catch (err) {
      setError("Failed to delete flight. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Admin Panel</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            className={activeTab === "flights" ? "btn" : "btn btn-secondary"}
            onClick={() => setActiveTab("flights")}
          >
            Manage Flights
          </button>
          <button
            className={activeTab === "bookings" ? "btn" : "btn btn-secondary"}
            onClick={() => setActiveTab("bookings")}
          >
            All Bookings
          </button>
          <button
            className={activeTab === "complaints" ? "btn" : "btn btn-secondary"}
            onClick={() => setActiveTab("complaints")}
          >
            All Complaints
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {loading ? (
          <p>Loading admin data...</p>
        ) : (
          <>
            {activeTab === "flights" && (
              <div>
                <div className="form-container" style={{ marginLeft: 0 }}>
                  <h2>{editingFlightId ? "Edit Flight" : "Add New Flight"}</h2>

                  <form onSubmit={handleFlightSubmit}>
                    <div className="form-group">
                      <label>Flight Number</label>
                      <input
                        type="text"
                        name="flight_number"
                        value={flightForm.flight_number}
                        onChange={handleFlightChange}
                        placeholder="e.g. AI202"
                      />
                    </div>

                    <div className="form-group">
                      <label>Source</label>
                      <input
                        type="text"
                        name="source"
                        value={flightForm.source}
                        onChange={handleFlightChange}
                        placeholder="e.g. Delhi"
                      />
                    </div>

                    <div className="form-group">
                      <label>Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={flightForm.destination}
                        onChange={handleFlightChange}
                        placeholder="e.g. Mumbai"
                      />
                    </div>

                    <div className="form-group">
                      <label>Departure Time</label>
                      <input
                        type="datetime-local"
                        name="departure_time"
                        value={flightForm.departure_time}
                        onChange={handleFlightChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Arrival Time</label>
                      <input
                        type="datetime-local"
                        name="arrival_time"
                        value={flightForm.arrival_time}
                        onChange={handleFlightChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Total Seats</label>
                      <input
                        type="number"
                        name="total_seats"
                        value={flightForm.total_seats}
                        onChange={handleFlightChange}
                        placeholder="e.g. 150"
                      />
                    </div>

                    {editingFlightId && (
                      <div className="form-group">
                        <label>Available Seats</label>
                        <input
                          type="number"
                          name="available_seats"
                          value={flightForm.available_seats}
                          onChange={handleFlightChange}
                          placeholder="e.g. 120"
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={flightForm.price}
                        onChange={handleFlightChange}
                        placeholder="e.g. 4500"
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="submit" className="btn">
                        {editingFlightId ? "Update Flight" : "Add Flight"}
                      </button>
                      {editingFlightId && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={resetFlightForm}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <h2 style={{ marginTop: "40px" }}>All Flights</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Flight No.</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flights.map((flight) => (
                        <tr key={flight.id}>
                          <td>{flight.flight_number}</td>
                          <td>{flight.source}</td>
                          <td>{flight.destination}</td>
                          <td>
                            {flight.available_seats} / {flight.total_seats}
                          </td>
                          <td>₹{flight.price}</td>
                          <td>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                className="btn"
                                onClick={() => handleEditFlight(flight)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteFlight(flight.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h2>All Bookings</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Passenger</th>
                        <th>Email</th>
                        <th>Flight No.</th>
                        <th>Route</th>
                        <th>Seat</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.passenger_name}</td>
                          <td>{booking.email}</td>
                          <td>{booking.flight_number}</td>
                          <td>
                            {booking.source} → {booking.destination}
                          </td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "complaints" && (
              <div>
                <h2>All Complaints</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Passenger</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td>{complaint.passenger_name}</td>
                          <td>{complaint.email}</td>
                          <td>{complaint.subject}</td>
                          <td>{complaint.description}</td>
                          <td>
                            <span
                              className={
                                complaint.status === "resolved"
                                  ? "badge badge-resolved"
                                  : "badge badge-pending"
                              }
                            >
                              {complaint.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from "react";
import api from "../services/api";
import FlightCard from "../components/FlightCard.jsx";
import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useContext(AuthContext);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("/api/flights");
      setFlights(response.data);
    } catch (err) {
      setError("Failed to load flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!source || !destination) {
      setError("Please enter both source and destination");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("/api/flights/search", {
        params: { source, destination },
      });
      setFlights(response.data);

      if (response.data.length === 0) {
        setMessage("No flights found for this route.");
      }
    } catch (err) {
      setError("Failed to search flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setMessage("");
    fetchFlights();
  };

  const handleBook = async (flight) => {
    const seat_number = prompt("Enter your preferred seat number (e.g. 12A):");

    if (!seat_number) {
      return;
    }

    try {
      await axios.post(
        "/api/bookings",
        { flight_id: flight.id, seat_number },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Flight booked successfully!");
      fetchFlights();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to book flight. Please try again.");
      }
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Available Flights</h1>

        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <div className="form-group" style={{ flex: 1, minWidth: "150px" }}>
              <label>Source</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Delhi"
              />
            </div>

            <div className="form-group" style={{ flex: 1, minWidth: "150px" }}>
              <label>Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Mumbai"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn">
                Search
              </button>
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        {loading ? (
          <p>Loading flights...</p>
        ) : (
          <div className="card-grid">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;

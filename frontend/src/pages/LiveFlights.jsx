import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveFlights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLiveFlights();

    // Auto refresh every 30 seconds
    const interval = setInterval(fetchLiveFlights, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = flights.filter((flight) => {
      const keyword = search.toLowerCase();

      return (
        flight.airline?.name?.toLowerCase().includes(keyword) ||
        flight.flight?.iata?.toLowerCase().includes(keyword) ||
        flight.departure?.airport?.toLowerCase().includes(keyword) ||
        flight.arrival?.airport?.toLowerCase().includes(keyword)
      );
    });

    setFilteredFlights(filtered);
  }, [search, flights]);

  const fetchLiveFlights = async () => {
    try {
      const res = await axios.get("/api/flights/live");
      setFlights(res.data);
      setFilteredFlights(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Live Flights...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>✈ Live Flight Status</h1>

      {/* Dashboard Cards */}

      <div className="stats-container">
        <div className="stat-card">
          <h2>{flights.length}</h2>
          <p>Total Flights</p>
        </div>

        <div className="stat-card">
          <h2>
            {flights.filter((f) => f.flight_status === "scheduled").length}
          </h2>
          <p>Scheduled</p>
        </div>

        <div className="stat-card">
          <h2>{flights.filter((f) => f.flight_status === "active").length}</h2>
          <p>Active</p>
        </div>

        <div className="stat-card">
          <h2>{new Set(flights.map((f) => f.airline?.name)).size}</h2>
          <p>Airlines</p>
        </div>
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search by Airline, Flight, Airport..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/* Table */}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead
          style={{
            background: "#0b4a8b",
            color: "white",
          }}
        >
          <tr>
            <th>Airline</th>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Status</th>
            <th>Terminal</th>
            <th>Gate</th>
          </tr>
        </thead>

        <tbody>
          {filteredFlights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.airline?.name}</td>

              <td>
                <strong>{flight.flight?.iata}</strong>
              </td>

              <td>{flight.departure?.airport}</td>

              <td>{flight.arrival?.airport}</td>

              <td>{formatDate(flight.departure?.scheduled)}</td>

              <td>
                <span className={`status ${flight.flight_status}`}>
                  {flight.flight_status}
                </span>
              </td>

              <td>{flight.departure?.terminal || "-"}</td>

              <td>{flight.departure?.gate || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveFlights;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="page">
      <div className="container">
        <h1>Welcome, {user ? user.name : "Passenger"}!</h1>
        <p>Email: {user ? user.email : ""}</p>
        <p>Role: {user ? user.role : ""}</p>

        <h2 style={{ marginTop: "30px" }}>Quick Links</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Flights</h3>
            <p>Search and book available flights.</p>
            <Link to="/flights" className="btn">
              View Flights
            </Link>
          </div>

          <div className="card">
            <h3>My Bookings</h3>
            <p>View and manage your flight bookings.</p>
            <Link to="/bookings" className="btn">
              View Bookings
            </Link>
          </div>

          <div className="card">
            <h3>Complaints</h3>
            <p>Raise a complaint or track its status.</p>
            <Link to="/complaints" className="btn">
              View Complaints
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

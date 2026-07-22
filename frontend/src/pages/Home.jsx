import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to Airport Passenger Service Portal</h1>
        <p>
          Book flights, manage your bookings, and get support — all in one
          place.
        </p>
        <div className="hero-buttons">
          <Link to="/flights" className="btn">
            View Flights
          </Link>
        </div>
      </div>

      <div className="container">
        <h2>About Our Airport</h2>
        <p>
          Our airport is committed to providing a safe, smooth, and comfortable
          travel experience for every passenger. With modern facilities and a
          dedicated support team, we ensure your journey starts and ends with
          ease.
        </p>

        <h2 style={{ marginTop: "30px" }}>Our Services</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Flight Booking</h3>
            <p>
              Search and book flights to your favorite destinations quickly and
              easily.
            </p>
          </div>

          <div className="card">
            <h3>Booking Management</h3>
            <p>
              View and manage all your bookings in one convenient dashboard.
            </p>
          </div>

          <div className="card">
            <h3>Passenger Support</h3>
            <p>
              Raise complaints or service requests and track their resolution
              status.
            </p>
          </div>

          <div className="card">
            <h3>24/7 Assistance</h3>
            <p>
              Our support team is available round the clock to assist
              passengers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

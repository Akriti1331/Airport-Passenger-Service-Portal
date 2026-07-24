import React from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture, FaBroadcastTower } from "react-icons/fa";
import airportHero from "../assets/airport-hero.jpeg";

const Home = () => {
  return (
    <div className="page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${airportHero})`,
        }}
      >
        <div className="hero-content">
          <h1>Airport Passenger Service Portal</h1>

          <p>
            Experience seamless flight booking, real-time flight tracking,
            booking management, and dedicated passenger support — all in one
            place.
          </p>

          <div className="hero-buttons">
            <Link to="/flights" className="btn">
              <FaPlaneDeparture /> Book Flights
            </Link>

            <Link to="/live-flights" className="btn btn-secondary">
              <FaBroadcastTower /> Live Flights
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="container">
        <div className="stats-container">
          <div className="stat-card">
            <h2>250+</h2>
            <p>Daily Flights</p>
          </div>

          <div className="stat-card">
            <h2>50K+</h2>
            <p>Passengers Served</p>
          </div>

          <div className="stat-card">
            <h2>40+</h2>
            <p>Destinations</p>
          </div>

          <div className="stat-card">
            <h2>24×7</h2>
            <p>Customer Support</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="container">
        <h2>About Our Airport</h2>

        <p>
          Our airport is committed to providing a safe, efficient, and
          comfortable travel experience. From flight booking to live flight
          tracking, we offer modern digital services that simplify every step of
          your journey.
        </p>

        <h2 style={{ marginTop: "40px" }}>Our Services</h2>

        <div className="card-grid">
          <div className="card">
            <h3>✈ Flight Booking</h3>
            <p>
              Search and reserve flights quickly with an easy-to-use booking
              system.
            </p>
          </div>

          <div className="card">
            <h3>📅 Booking Management</h3>
            <p>
              View, update, and manage all your flight reservations from one
              dashboard.
            </p>
          </div>

          <div className="card">
            <h3>📡 Live Flight Tracking</h3>
            <p>
              Stay informed with real-time flight arrivals, departures, and
              status updates.
            </p>
          </div>

          <div className="card">
            <h3>🎧 Passenger Support</h3>
            <p>
              Submit complaints, request assistance, and receive timely support
              from our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

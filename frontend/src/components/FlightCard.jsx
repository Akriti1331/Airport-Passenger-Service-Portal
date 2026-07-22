import React from "react";

const FlightCard = ({ flight, onBook }) => {
  return (
    <div className="card">
      <h3>{flight.flight_number}</h3>
      <p>
        <strong>From:</strong> {flight.source}
      </p>
      <p>
        <strong>To:</strong> {flight.destination}
      </p>
      <p>
        <strong>Departure:</strong> {flight.departure_time}
      </p>
      <p>
        <strong>Arrival:</strong> {flight.arrival_time}
      </p>
      <p>
        <strong>Available Seats:</strong> {flight.available_seats}
      </p>
      <p>
        <strong>Price:</strong> ₹{flight.price}
      </p>

      <div className="card-footer">
        {onBook && (
          <button
            className="btn"
            onClick={() => onBook(flight)}
            disabled={flight.available_seats <= 0}
          >
            {flight.available_seats <= 0 ? "Full" : "Book Flight"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlightCard;

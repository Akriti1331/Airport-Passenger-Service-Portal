import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Airport Passenger Service Portal. All
        rights reserved.
      </p>
      <p>Contact us: support@airportportal.com | +91-9876543210</p>
    </footer>
  );
};

export default Footer;

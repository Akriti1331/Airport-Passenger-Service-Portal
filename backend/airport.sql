-- ==============================================
-- Airport Passenger Service Portal - Database
-- ==============================================

CREATE DATABASE IF NOT EXISTS airport_passenger_portal;
USE airport_passenger_portal;

-- ==============================================
-- Table: users
-- ==============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('passenger', 'admin') NOT NULL DEFAULT 'passenger',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
);

-- ==============================================
-- Table: flights
-- ==============================================
CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    INDEX idx_flights_source_destination (source, destination)
);

-- ==============================================
-- Table: bookings
-- ==============================================
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    booking_status ENUM('confirmed', 'cancelled') NOT NULL DEFAULT 'confirmed',
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_bookings_flight FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    INDEX idx_bookings_user (user_id),
    INDEX idx_bookings_flight (flight_id)
);

-- ==============================================
-- Table: complaints
-- ==============================================
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'resolved') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_complaints_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_complaints_user (user_id)
);

-- ==============================================
-- Default Admin Account
-- Email: admin@airport.com
-- Password: admin123
-- ==============================================
INSERT INTO users (name, email, password, role)
VALUES (
    'Admin User',
    'admin@airport.com',
    '$2b$10$JlGPY/VrO4YqU1d1pbR0JuOOtI0DDJLXgjvrN7dOfu7sfhv/xrhN2',
    'admin'
);

-- ==============================================
-- Sample Flights
-- ==============================================
INSERT INTO flights (flight_number, source, destination, departure_time, arrival_time, total_seats, available_seats, price)
VALUES
('AI101', 'Delhi', 'Mumbai', '2026-08-01 06:00:00', '2026-08-01 08:15:00', 150, 150, 4500.00),
('AI102', 'Mumbai', 'Delhi', '2026-08-01 09:30:00', '2026-08-01 11:45:00', 150, 150, 4700.00),
('6E201', 'Bangalore', 'Delhi', '2026-08-01 07:00:00', '2026-08-01 09:45:00', 180, 180, 5200.00),
('6E202', 'Delhi', 'Bangalore', '2026-08-01 12:00:00', '2026-08-01 14:45:00', 180, 180, 5300.00),
('SG301', 'Chennai', 'Kolkata', '2026-08-02 08:00:00', '2026-08-02 10:30:00', 160, 160, 4100.00),
('SG302', 'Kolkata', 'Chennai', '2026-08-02 15:00:00', '2026-08-02 17:30:00', 160, 160, 4200.00),
('AI205', 'Hyderabad', 'Delhi', '2026-08-03 05:30:00', '2026-08-03 08:00:00', 150, 150, 4800.00),
('AI206', 'Delhi', 'Hyderabad', '2026-08-03 18:00:00', '2026-08-03 20:30:00', 150, 150, 4900.00),
('6E401', 'Pune', 'Goa', '2026-08-04 10:00:00', '2026-08-04 11:15:00', 140, 140, 3200.00),
('6E402', 'Goa', 'Pune', '2026-08-04 16:00:00', '2026-08-04 17:15:00', 140, 140, 3300.00);
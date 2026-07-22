# ✈️ Airport Passenger Service Portal

A full-stack Airport Passenger Service Portal built using the MERN stack (React.js, Node.js, Express.js) with MySQL as the database. The application allows passengers to register, log in, browse available flights, book tickets, manage bookings, and raise complaints through a simple and user-friendly interface.

---

## 🚀 Features

### 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

### ✈️ Flight Management

- View Available Flights
- Flight Details
- Search Flights
- Live Flight Data from MySQL Database

### 🎫 Booking System

- Book Flight Tickets
- Automatic Seat Availability Update
- View Booking History
- Booking Status

### 📞 Complaint Management

- Raise Complaints
- View Complaint History
- Complaint Status Tracking

### 📊 Dashboard

- Personalized User Dashboard
- Quick Navigation
- Booking Summary

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- Vite

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- dotenv
- CORS

## Database

- MySQL
- MySQL Workbench
- mysql2

---

# 📂 Project Structure

```
Airport-Management/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── airport.sql
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Airport-Management.git
```

```bash
cd Airport-Management
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=airport_passenger_portal

JWT_SECRET=your_secret_key
```

Start Backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🗄 Database Setup

1. Open MySQL Workbench.

2. Open the file

```
airport.sql
```

3. Execute the script.

This will automatically:

- Create Database
- Create Tables
- Insert Sample Flights
- Insert Admin User

---

# 🔑 Default Admin Account

```
Email:
admin@airport.com

Password:
admin123
```

_(Change these credentials in production.)_

---

# 📸 Screenshots

## Home Page

(Add Screenshot Here)

---

## Login

(Add Screenshot Here)

---

## Dashboard

(Add Screenshot Here)

---

## Flight Booking

(Add Screenshot Here)

---

## Complaints

(Add Screenshot Here)

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## Flights

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /api/flights |

---

## Bookings

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/bookings |
| POST   | /api/bookings |

---

## Complaints

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/complaints |
| POST   | /api/complaints |

---

# 🔒 Authentication

Protected routes require a JWT token.

Example

```
Authorization: Bearer YOUR_TOKEN
```

---

# 💻 Future Improvements

- Admin Dashboard
- Flight Search Filters
- Seat Selection
- Payment Gateway Integration
- Flight Cancellation
- Email Notifications
- Responsive Mobile Design
- Passenger Profile Management

---

# 👩‍💻 Author

**Akriti Agarwal**

B.Tech Computer Science Engineering

GitHub:
https://github.com/Akriti1331

LinkedIn:
https://www.linkedin.com/in/akritiagarwal1331/

---

# 📄 License

This project is developed for educational and internship purposes.

Feel free to fork, modify, and enhance it.

---

⭐ If you found this project useful, don't forget to give it a Star on GitHub!

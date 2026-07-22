const pool = require("../config/db");

const addComplaint = async (user_id, subject, description) => {
  const [result] = await pool.query(
    "INSERT INTO complaints (user_id, subject, description, status) VALUES (?, ?, ?, ?)",
    [user_id, subject, description, "pending"],
  );
  return result;
};

const getComplaintsByUser = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM complaints WHERE user_id = ?",
    [user_id],
  );
  return rows;
};

const getAllComplaints = async () => {
  const [rows] = await pool.query(
    `SELECT complaints.*, users.name AS passenger_name, users.email 
     FROM complaints 
     JOIN users ON complaints.user_id = users.id`,
  );
  return rows;
};

module.exports = {
  addComplaint,
  getComplaintsByUser,
  getAllComplaints,
};

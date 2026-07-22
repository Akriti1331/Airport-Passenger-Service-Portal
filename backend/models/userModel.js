const pool = require("../config/db");

const createUser = async (name, email, hashedPassword, role) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role],
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const updateUser = async (id, name, email) => {
  const [result] = await pool.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
  );
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
};

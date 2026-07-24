import React, { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../AuthContext.jsx";

const Complaints = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { token } = useContext(AuthContext);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/api/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data);
    } catch (err) {
      setError("Failed to load your complaints. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!subject || !description) {
      setError("Please fill both subject and description");
      return;
    }

    try {
      setSubmitting(true);
      await api.post(
        "/api/complaints",
        { subject, description },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setSuccess("Complaint submitted successfully");
      setSubject("");
      setDescription("");
      fetchComplaints();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to submit complaint. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Complaints</h1>

        <div className="form-container" style={{ marginLeft: 0 }}>
          <h2>Raise a Complaint</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter complaint subject"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail"
              ></textarea>
            </div>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button
              type="submit"
              className="btn btn-full"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>

        <h2 style={{ marginTop: "40px" }}>My Complaints</h2>

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p>You have not raised any complaints yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.subject}</td>
                    <td>{complaint.description}</td>
                    <td>
                      <span
                        className={
                          complaint.status === "resolved"
                            ? "badge badge-resolved"
                            : "badge badge-pending"
                        }
                      >
                        {complaint.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;

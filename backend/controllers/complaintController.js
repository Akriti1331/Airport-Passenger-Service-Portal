const {
  addComplaint,
  getComplaintsByUser,
  getAllComplaints,
} = require("../models/complaintModel");

const createComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const user_id = req.user.id;

    if (!subject || !description) {
      return res
        .status(400)
        .json({ message: "Please provide subject and description" });
    }

    await addComplaint(user_id, subject, description);

    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while registering complaint" });
  }
};

const myComplaints = async (req, res) => {
  try {
    const user_id = req.user.id;
    const complaints = await getComplaintsByUser(user_id);
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching complaints" });
  }
};

const allComplaints = async (req, res) => {
  try {
    const complaints = await getAllComplaints();
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching all complaints" });
  }
};

module.exports = {
  createComplaint,
  myComplaints,
  allComplaints,
};

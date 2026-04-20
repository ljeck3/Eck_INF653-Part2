const Student = require("../model/Student");

// Get All Students
const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No employees found!" });
    }
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
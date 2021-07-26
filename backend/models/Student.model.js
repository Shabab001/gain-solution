const mongoose = require("mongoose");

const StudentModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    subject: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Student = mongoose.model("student", StudentModel);
module.exports = Student;

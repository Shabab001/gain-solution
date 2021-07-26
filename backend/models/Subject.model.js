const mongoose = require("mongoose");

const SubjectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model("subject", SubjectModel);
module.exports = Subject;

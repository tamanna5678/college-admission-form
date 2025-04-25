const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  dob: { type: Date },
  address: { type: String },
  gender: { type: String },
  course: { type: String },
  resume: { type: String } // filename of uploaded file
}, { timestamps: true });

module.exports = mongoose.model("Admission", AdmissionSchema);



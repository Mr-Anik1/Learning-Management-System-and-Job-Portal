const { Schema, model } = require("mongoose");

const workWithUsSchema = new Schema(
  {
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [30, "Name can be up to 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      index: true,
    },
    mobile: {
      type: String,
      required: [true, "Please provide a mobile number"],
      match: [
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
        "Please enter a valid mobile number",
      ],
    },
    profession: {
      type: String,
      required: true,
      enum: [
        "DEVELOPER",
        "DESIGNER",
        "ENGINEER",
        "MANAGER",
        "ANALYST",
        "SCIENTIST",
        "OTHER",
      ],
      uppercase: true,
      trim: true,
    },
    specialization: {
      type: [String],
      required: true,
    },
    currentJob: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["SUMBITTED", "CHECKED", "APPROVED", "REJECTED"],
        message: "{VALUE} is not supported",
      },
      default: "SUMBITTED",
      uppercase: true,
      trim: true,
      index: true,
    },
    portfolio: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
    expectedSalary: {
      type: Number,
    },
  },
  { timestamps: true, id: true }
);

const WorkWithUs = model("WorkWithUs", workWithUsSchema);

module.exports = { WorkWithUs };

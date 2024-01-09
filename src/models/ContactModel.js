const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
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
    },
    subject: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["submitted", "checked", "approved", "rejected"],
        message: "{VALUE} is not supported",
      },
      default: "submitted",
      index: true,
    },
  },
  { timestamps: true, id: true }
);

const Contact = model("Contact", contactSchema);

module.exports = { Contact };

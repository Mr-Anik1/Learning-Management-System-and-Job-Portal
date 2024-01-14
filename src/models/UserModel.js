const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide firstname"],
      maxlength: [15, "FirstName can be up to 15 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Please provide lastname"],
      maxlength: [15, "LastName can be up to 15 characters long"],
    },
    profilePicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    },
    profilePictureId: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
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
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    profession: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "instructor", "user"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "declined", "blocked"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripeAccountId: String,
    stripeSeller: {},
    stripeSession: {},
  },
  { timestamps: true, id: true }
);

const User = model("User", userSchema);

module.exports = { User };

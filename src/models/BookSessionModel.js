const { Schema, model } = require("mongoose");

const bookSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeslot: {
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
  },
  { timestamps: true, id: true }
);

const BookSession = model("BookSession", bookSessionSchema);

module.exports = { BookSession };

const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "declined"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
  },
  { timestamps: true, id: true }
);

const Review = model("Review", reviewSchema);

module.exports = { Review };

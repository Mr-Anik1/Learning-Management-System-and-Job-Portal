const { Schema, model } = require("mongoose");

const tagsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, id: true }
);

const Tags = model("Tags", tagsSchema);

module.exports = { Tags };

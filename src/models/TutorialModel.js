const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
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
      index: true,
    },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: {
      type: String,
      required: true,
    },
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const Tutorial = model("Tutorial", tutorialSchema);

module.exports = { Tutorial };

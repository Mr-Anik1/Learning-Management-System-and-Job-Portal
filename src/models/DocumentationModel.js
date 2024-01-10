const { Schema, model } = require("mongoose");

const documentationSchema = new Schema(
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
    type: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    docImage: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    },
    docImageId: {
      type: String,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const Documentation = model("Documentation", documentationSchema);

module.exports = { Documentation };

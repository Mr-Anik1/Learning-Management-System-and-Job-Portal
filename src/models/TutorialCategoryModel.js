const { Schema, model } = require("mongoose");

const tutorialCategorySchema = new Schema(
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
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    },
    imageId: {
      type: String,
    },
  },
  { timestamps: true, id: true }
);

const TutorialCategory = model("TutorialCategory", tutorialCategorySchema);

module.exports = { TutorialCategory };

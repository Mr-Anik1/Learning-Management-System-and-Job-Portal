const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
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
    category: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    },
    thumbnailId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
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

const Video = model("Video", videoSchema);

module.exports = { Video };

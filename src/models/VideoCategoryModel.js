const { Schema, model } = require("mongoose");

const videoCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const VideoCategory = model("VideoCategory", videoCategorySchema);

module.exports = { VideoCategory };

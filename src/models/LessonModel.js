const { Schema, model } = require("mongoose");

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 350,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      minlength: 200,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    freePreview: {
      type: String,
      enum: {
        values: ["AVAILABLE", "NOT_AVAILABLE"],
        message:
          "{VALUE} is not supported. Allowed values are: AVAILABLE, NOT_AVAILABLE",
      },
      default: "NOT_AVAILABLE",
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true, id: true }
);

const Lesson = model("Lesson", lessonSchema);

module.exports = { Lesson };

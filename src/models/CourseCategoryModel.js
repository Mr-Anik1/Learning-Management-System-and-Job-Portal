const { Schema, model } = require("mongoose");

const courseCategorySchema = new Schema(
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
  },
  { timestamps: true, id: true }
);

const CourseCategory = model("CourseCategory", courseCategorySchema);

module.exports = { CourseCategory };

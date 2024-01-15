const { Schema, model } = require("mongoose");

const courseCategorySchema = new Schema(
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

const CourseCategory = model("CourseCategory", courseCategorySchema);

module.exports = { CourseCategory };

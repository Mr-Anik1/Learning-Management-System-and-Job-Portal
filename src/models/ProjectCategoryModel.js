const { Schema, model } = require("mongoose");

const projectCategorySchema = new Schema(
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

const ProjectCategory = model("ProjectCategory", projectCategorySchema);

module.exports = { ProjectCategory };

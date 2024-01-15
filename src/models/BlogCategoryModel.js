const { Schema, model } = require("mongoose");

const blogCategorySchema = new Schema(
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

const BlogCategory = model("BlogCategory", blogCategorySchema);

module.exports = { BlogCategory };

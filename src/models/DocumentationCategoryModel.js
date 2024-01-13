const { Schema, model } = require("mongoose");

const documentationCategorySchema = new Schema(
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

const DocumentationCategory = model(
  "DocumentationCategory",
  documentationCategorySchema
);

module.exports = { DocumentationCategory };

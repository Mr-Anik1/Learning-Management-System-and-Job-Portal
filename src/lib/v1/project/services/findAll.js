const { Project } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  category = defaults.category,
  author = defaults.author,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering ~ Only approved projects will show here
    const filter = {
      title: { $regex: search, $options: "i" },
      category: { $regex: category, $options: "i" },
      status: "APPROVED",
      author: { $regex: author, $options: "i" },
    };

    // Find all projects
    const projects = await Project.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .select("-imagesId");

    // If the array of projects doesn't exist or is empty
    if (!projects || projects.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of projects
    return projects;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_PROJECTS]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };

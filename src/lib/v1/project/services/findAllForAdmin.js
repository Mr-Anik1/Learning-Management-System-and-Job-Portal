const { Project } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAllForAdmin = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  category = defaults.category,
  status = defaults.status,
  author = defaults.author,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      title: { $regex: search, $options: "i" },
      category: { $regex: category, $options: "i" },
      status: { $regex: status, $options: "i" },
      author: { $regex: author, $options: "i" },
    };

    // Find all projects
    const projects = await Project.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of projects doesn't exist or is empty
    if (!projects || projects.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of projects
    return projects;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_PROJECTS-FOR-ADMIN]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAllForAdmin };

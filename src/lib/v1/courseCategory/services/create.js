const { CourseCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ title, slug }) => {
  // If title or slug doesn't exist
  if (!title || !slug) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new courseCategory
    const courseCategory = new CourseCategory({
      title,
      slug,
    });
    await courseCategory.save();

    // If new courseCategory doesn't create
    if (!courseCategory) {
      throw Error;
    }

    return courseCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_COURSE_CATEGORY]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Course Category Creation Failed`);
  }
};

module.exports = { create };

const { CourseCategory } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find Single course category
    const courseCategory = await CourseCategory.findById(id);

    // If courseCategory doesn't exist
    if (!courseCategory) {
      throw Error;
    }

    return courseCategory;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_COURSE_CATEGORY]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };

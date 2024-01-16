const { Course } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  category,
  categorySlug,
  description,
  instructor,
}) => {
  if (
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !description ||
    !instructor
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create a new course
    const course = new Course({
      title,
      slug,
      category,
      categorySlug,
      description,
      instructor,
    });
    await course.save();

    // If course doesn't create
    if (!course) {
      throw Error;
    }

    return course;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_COURSE]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Course Creation Failed`);
  }
};

module.exports = { create };

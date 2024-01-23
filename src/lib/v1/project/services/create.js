const { Project } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  category,
  categorySlug,
  description,
  author,
}) => {
  // If required filds doesn't exists
  if (
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !description ||
    !author
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for post/create a new project
  const createQuery = {
    title,
    slug,
    category,
    categorySlug,
    description,
    author,
  };

  try {
    // Post/Create a new project
    const project = new Project(createQuery);
    await project.save();

    // If project doesn't create
    if (!project) {
      throw Error;
    }

    return project;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_PROJECT]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Project Creation Failed`);
  }
};

module.exports = { create };

const { Project } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and categoryType doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    /**
     * @NOTE
     * Only approved projects will show here
     *
     */
    // Find a single project
    const project = await Project.findOne({
      slug,
      categorySlug: categoryType,
      status: "APPROVED",
    });

    // If project doesn't exist
    if (!project) {
      throw Error;
    }

    // If project is exists, find simillar approved projects with categorySlug
    const projectTopic = await Project.find({
      categorySlug: categoryType,
      status: "APPROVED",
    }).select("title category author");

    return { project, projectTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_PROJECT]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };

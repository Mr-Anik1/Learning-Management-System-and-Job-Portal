const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { projectServicesV1 } = require("../../../lib/v1/project");

const update = asyncHandler(async (req, res) => {
  // projectId from request params
  const projectId = req.params?.projectId;

  // User Role
  const superUser = req.user?.role;

  // First define slug and categorySlug is undefined
  let slug = undefined;
  let categorySlug = undefined;

  // Filds from request body
  const {
    title,
    category,
    description,
    author,
    status,
    links,
    price,
    priceAfterDiscount,
    techStack,
    keywords,
  } = req.body;

  // If title is exist, generate slug
  if (title) {
    slug = slugify(title.toLowerCase());
  }

  // If category is exist, generate categorySlug
  if (category) {
    categorySlug = slugify(category.toLowerCase());
  }

  /**
   * @Generate_paylod
   */
  const payload = {
    title,
    slug,
    category,
    categorySlug,
    description,
    author,
    links,
    price,
    priceAfterDiscount,
    techStack,
    keywords,
  };

  /**
   * @Update_project
   */
  const project = await projectServicesV1.update({
    projectId,
    superUser,
    status,
    payload,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Project Updated Successfully`,
    data: project,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };

const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
  documentationCategoryServicesV1,
} = require("../../../lib/v1/documentationCategory");

const update = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { title } = req.body;

  // Update Documentation Category
  const documentationCategory = await documentationCategoryServicesV1.update({
    id,
    title,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: `Documentation Category Updated Successfully`,
    data: documentationCategory,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };

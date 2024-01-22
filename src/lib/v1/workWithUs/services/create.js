const { WorkWithUs } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  applicantId,
  name,
  email,
  mobile,
  profession,
  specialization,
  currentJob,
  resume,
  portfolio,
  coverLetter,
  linkedinProfile,
  expectedSalary,
}) => {
  if (
    !applicantId ||
    !name ||
    !email ||
    !mobile ||
    !profession ||
    !specialization ||
    !currentJob ||
    !resume
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for creation
  const createQuery = {
    applicantId,
    name,
    email,
    mobile,
    profession,
    specialization,
    currentJob,
    resume,
  };

  if (portfolio) {
    createQuery.portfolio = portfolio;
  }

  if (coverLetter) {
    createQuery.coverLetter = coverLetter;
  }

  if (linkedinProfile) {
    createQuery.linkedinProfile = linkedinProfile;
  }

  if (expectedSalary) {
    createQuery.expectedSalary = expectedSalary;
  }

  try {
    // Create a workWithUs form
    const workWithUs = new WorkWithUs(createQuery);
    await workWithUs.save();

    // If workWithUs form doesn't create
    if (!workWithUs) {
      throw Error;
    }

    return workWithUs;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_WORK-WITH-US]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Work-With-Us Form Creation Failed`);
  }
};

module.exports = { create };

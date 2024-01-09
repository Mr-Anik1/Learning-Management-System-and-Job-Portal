const { errors } = require("../../../../errors");
const { userServicesV1 } = require("../../user");
const { tokenServicesV1 } = require("../../token");

const register = async ({
  firstname,
  lastname,
  email,
  mobile,
  password,
  profession,
}) => {
  // If any of the essential user information is missing, then it will throw a BadRequestError.
  if (
    !firstname ||
    !lastname ||
    !email ||
    !mobile ||
    !password ||
    !profession
  ) {
    throw new errors.BadRequestError("Invalid Credentials");
  }

  // If user already exist
  const isUserExist = await userServicesV1.userExist({ email });
  if (isUserExist) {
    throw new errors.BadRequestError(`User Already Exist`);
  }

  try {
    // Create user
    const user = await userServicesV1.create({
      firstname,
      lastname,
      email,
      mobile,
      password,
      profession,
    });

    // If user doesn't create
    if (!user) {
      throw Error;
    }

    // Generate JWT Token
    const token = await tokenServicesV1.generateTokenForRegister({
      userId: user.id,
      name: user.firstname,
      role: user.role,
      status: user.status,
    });

    // If token doesn't generate
    if (!token) {
      throw Error;
    }

    // Return final token
    return token;
  } catch (err) {
    if (err.message) {
      console.log(`[USER_REGISTER]: ${err.message}`);
    }

    throw new errors.InternalServerError(`User Registration Failed`);
  }
};

module.exports = { register };

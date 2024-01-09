const { errors } = require("../../../../errors");
const { User } = require("../../../../models");
const { passwordHash } = require("../../../../utils");

const create = async ({
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

  try {
    // Generate Hashed Password
    const encryptedPassword = await passwordHash.generateHash({
      paylod: password,
    });

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      mobile,
      password: encryptedPassword,
      profession,
    });
    await user.save();

    // If user doesn't create
    if (!user) {
      throw Error;
    }

    return user;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_USER]: ${err.message}`);
    }

    throw new errors.InternalServerError("User Creation Failed");
  }
};

module.exports = { create };

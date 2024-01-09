const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");
const { passwordHash } = require("../../../../utils");
const { User } = require("../../../../models");
const { findUserById } = require("./checkUser");

/**
 * @These filds will be added later in the update function parameter


    
    stripeAccountId: String,
    stripeSeller: {},
    stripeSession: {},

 * 
 * 
 */

const update = async ({
  id,
  imageFilePath,
  superUser,
  firstname,
  lastname,
  email,
  mobile,
  password,
  profession,
  role,
  status,
}) => {
  const updateQuery = {};

  /**
   * @Regular_user can only update non-sensitive fields
   */
  // Upload/Update Profile Picture
  if (imageFilePath) {
    /**
     * This for Cloudinary file upload
     * 
     
    // Find User
    const user=await User.findById(id);

    if(!user){
        // Throw Not Found Error
    }

    // If profilePictureId is exist in the user
    if(user.profilePictureId){
        // First Destroy Previous Cloudinary Image
    }
     
    // Image upload in cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFilePath);

    updateQuery.profilePicture=uploadResult.secure_url, //cloudinary image url
    updateQuery.profilePictureId=uploadResult.public_id, //cloudinary image id

     * 
     */
  }

  if (firstname) {
    updateQuery.firstname = firstname;
  }

  if (lastname) {
    updateQuery.lastname = lastname;
  }

  if (email) {
    updateQuery.email = email;
  }

  if (mobile) {
    updateQuery.mobile = mobile;
  }

  /**
   * @Update_Password
   * Changed password must be hashed before store in the DataBase
   */
  if (password) {
    // Find User
    const user = await findUserById({ id: id });

    // If user doesn't exist
    if (!user) {
      throw new errors.NotFoundError(`Requested Resource Doesn't exist`);
    }

    // If user is exist and new given password is matched to the old password then throw a BadRequestError
    if (
      user &&
      (await passwordHash.compareHash({
        plainTextPassword: password,
        hashPassword: user.password,
      }))
    ) {
      throw new errors.BadRequestError(
        `Please provide a new password instead of old one.`
      );
    }

    // Hashing Password
    const encryptedPassword = await passwordHash.generateHash({
      paylod: password,
    });

    // Update Password
    updateQuery.password = encryptedPassword;

    // Update Password Change Time
    updateQuery.passwordChangedAt = new Date();
  }

  if (profession) {
    updateQuery.profession = profession;
  }

  /**
   * @Only_admin can update to sensitive fields (role, status).
   */
  if (superUser === "admin") {
    if (role) {
      updateQuery.role = role;
    }

    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update User
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    }).select(
      "-password -profilePictureId -passwordResetExpires -passwordResetToken"
    );

    // If user doesn't exist
    if (!updatedUser) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
    }

    // Return the final updated user
    return updatedUser;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_USER]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
    }

    throw new errors.InternalServerError(`User Update Failed`);
  }
};

module.exports = { update };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";

import { uploadTOCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user data from frontend
  // Validate user data
  // Check if user exists
  // Upload avatar to Cloudinary
  // Save image URL in DB
  // Create user in DB
  // Send success response
  // Exclude password from response
  // Generate auth token
  // Verify user creation

  console.log("registerUser called");

  console.log("req body : ", req.body);

  console.log("req files ", req.files);

  const { fullname, username, email, password } = req.body; //if data come from a form ,  not for url data then use body parser to parse the data and get the data from req.body

  console.log("email: ", email);

  if (
    [fullname, username, email, password].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser)
    throw new ApiError(
      409,
      "user with same email or username alreadey exists "
    );

  console.log("you are here");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "avatar is mandatory ");

  const avatar = await uploadTOCloudinary(avatarLocalPath);
  if (!avatar) throw new ApiError(500, "Failed to upload avatar to Cloudinary");

  const coverImage = await uploadTOCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something gone wrong while registring the user ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };

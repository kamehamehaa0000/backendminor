import User from '../models/User.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import errorHandler from '../utlities/errorHandler.js'
import uploadOnCloudinary from '../utlities/cloudinary.js'
import apiResponse from '../utlities/apiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body
  if (!firstName || !lastName || !username || !password || !email) {
    throw new errorHandler(400, 'All fields are required')
  }
  const existing = await User.findOne({ $or: [{ username }, { email }] })
  if (existing) {
    throw new errorHandler(400, 'user already exists')
  }
  const profileImgPath = req.files?.profileImage[0]?.path
  console.log(profileImgPath)
  if (!profileImgPath) {
    throw new errorHandler(400, 'Profile image file is required')
  }

  const profilePic = await uploadOnCloudinary(profileImgPath)
  console.log(profilePic)
  if (!profilePic) {
    throw new errorHandler(400, 'profile pic upload failed')
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    username: username.toLowerCase(),
    profileImage: profilePic.url,
  })
  const responseUser = await User.findById(newUser._id).select('-password')
  if (!responseUser) {
    throw new errorHandler(
      500,
      'somthing went wrong while registering the user'
    )
  }
  return res
    .status(200)
    .json(new apiResponse(201, responseUser, 'User Successfully Registered'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  if (!username && !email) {
    throw new errorHandler(400, 'username or email is required')
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (!user) {
    throw new errorHandler(400, 'User not registered')
  }
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new errorHandler(401, 'Invalid user credentials')
  }
  const token = user.generateToken()

  const responseUser = await User.findById(user._id).select('-password')

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: responseUser, token },
        'User logged In Successfully'
      )
    )
})

export { registerUser, loginUser }

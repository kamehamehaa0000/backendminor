import Admin from '../models/Admin.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import errorHandler from '../utlities/errorHandler.js'
import apiResponse from '../utlities/apiResponse.js'

const registerAdmin = asyncHandler(async (req, res) => {
  const { password, email } = req.body
  if (!password || !email) {
    throw new errorHandler(400, 'All fields are required')
  }
  const existing = await Admin.findOne({ email })
  if (existing) {
    throw new errorHandler(400, 'Admin already exists')
  }

  const newAdmin = await Admin.create({
    email,
    password,
  })
  const responseAdmin = await Admin.findById(newAdmin._id).select('-password')
  if (!responseAdmin) {
    throw new errorHandler(
      500,
      'somthing went wrong while registering the user'
    )
  }
  return res
    .status(200)
    .json(new apiResponse(201, responseAdmin, 'User Successfully Registered'))
})

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new errorHandler(400, 'email and password are required')
  }
  const admin = await Admin.findOne({ email })
  if (!admin) {
    throw new errorHandler(400, 'admin not registered')
  }
  const isPasswordValid = await admin.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new errorHandler(401, 'Invalid user credentials')
  }
  const token = admin.generateToken()

  const responseAdmin = await Admin.findById(admin._id).select('-password')

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: responseAdmin, token },
        'Admin logged In Successfully'
      )
    )
})

export { registerAdmin, loginAdmin }

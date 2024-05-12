import User from '../models/User.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import errorHandler from '../utlities/errorHandler.js'
import jwt from 'jsonwebtoken'
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  console.log(token)
  if (!token) {
    throw new errorHandler(401, 'Unauthorised Request')
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const user = await User.findById(decodedToken._id).select('-password')
  if (!user) {
    throw new errorHandler(401, 'Invalid Access Token')
  }
  req.user = user
  next()
})

export default verifyJWT

import Restaurant from '../models/Restaurant.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import apiResponse from '../utlities/apiResponse.js'
import errorHandler from '../utlities/errorHandler.js'

const updateTotalSlots = asyncHandler(async (req, res) => {
  const newSlotNumber = req.params.newSlotNumber

  if (!newSlotNumber || isNaN(newSlotNumber)) {
    // if (isNaN(newSlotNumber)) {
    //   newSlotNumber = parseInt(newSlotNumber)
    // }
    throw new errorHandler(400, 'Invalid slot number')
  }

  const restaurant = await Restaurant.findOneAndUpdate(
    {},
    { totalSlots: newSlotNumber },
    { new: true }
  )

  if (!restaurant) {
    throw new errorHandler(404, 'Restaurant not found')
  }

  res
    .status(200)
    .json(new apiResponse(200, restaurant, 'Total slots updated successfully'))
})

export { updateTotalSlots }

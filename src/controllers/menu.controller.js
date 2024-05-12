import Menu from '../models/Menu.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import apiResponse from '../utlities/apiResponse.js'
import errorHandler from '../utlities/errorHandler.js'

// Add a food item to the menu
const addFoodItemToMenu = asyncHandler(async (req, res) => {
  const { foodItemId } = req.body
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }

  let menu = await Menu.findOne()
  if (!menu) {
    menu = new Menu({ items: [foodItemId] })
  } else {
    menu.items.push(foodItemId)
  }

  const savedMenu = await menu.save()
  if (!savedMenu) {
    throw new errorHandler(500, 'Failed to add food item to the menu')
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        savedMenu,
        'Food item added to the menu successfully'
      )
    )
})

// Delete a food item from the menu
const deleteFoodItemFromMenu = asyncHandler(async (req, res) => {
  const { foodItemId } = req.body
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }

  const menu = await Menu.findOne()
  if (!menu) {
    throw new errorHandler(404, 'Menu not found')
  }

  const index = menu.items.indexOf(foodItemId)
  if (index === -1) {
    throw new errorHandler(404, 'Food item not found in the menu')
  }

  menu.items.splice(index, 1)
  const savedMenu = await menu.save()
  if (!savedMenu) {
    throw new errorHandler(500, 'Failed to delete food item from the menu')
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        savedMenu,
        'Food item deleted from the menu successfully'
      )
    )
})

// Get the menu
const getMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findOne().populate('items')
  if (!menu) {
    throw new errorHandler(404, 'Menu not found')
  }
  res
    .status(200)
    .json(new apiResponse(200, menu, 'Menu retrieved successfully'))
})

export { addFoodItemToMenu, deleteFoodItemFromMenu, getMenu }

import FoodItem from '../models/FoodItem.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import errorHandler from '../utlities/errorHandler.js'
import apiResponse from '../utlities/apiResponse.js'
import uploadOnCloudinary, {
  deleteFromCloudinary,
} from '../utlities/cloudinary.js'

// Add a new food item
const addFoodItem = asyncHandler(async (req, res) => {
  const image = req.file.path

  const { name, price, prepTime, description, availability, rating, category } =
    req.body
  if (
    !name ||
    !price ||
    !prepTime ||
    !description ||
    !availability ||
    !category
  ) {
    throw new errorHandler(400, 'All fields are required')
  }

  const duplicate = await FoodItem.findOne({ name, category })
  if (duplicate) {
    throw new errorHandler(
      400,
      'Already exist a fooditem with same name and category'
    )
  }

  const imageUploaded = await uploadOnCloudinary(image)
  if (!imageUploaded) {
    throw new errorHandler(400, 'Error uploading image')
  }
  const foodItem = new FoodItem({
    name,
    price,
    prepTime,
    image: imageUploaded.url,
    rating,
    description,
    availability,
    category,
  })

  const savedFoodItem = await foodItem.save()
  if (!savedFoodItem) {
    throw new errorHandler(500, 'Failed to add food item')
  }

  res
    .status(201)
    .json(new apiResponse(200, savedFoodItem, 'Food item added successfully'))
})

// Delete a food item
const deleteFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }

  const deletedFoodItem = await FoodItem.findByIdAndDelete(foodItemId)
  console.log(deletedFoodItem.image)
  if (!deletedFoodItem) {
    throw new errorHandler(404, 'Food item not found')
  }
  const deleted = await deleteFromCloudinary(deletedFoodItem.image)
  if (deleted) {
    throw new errorHandler(404, 'imge not deleted from cloudinary')
  }
  res
    .status(200)
    .json(
      new apiResponse(200, deletedFoodItem, 'Food item deleted successfully')
    )
})

// Update a food item
const updateFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId
  if (!foodItemId) {
    throw new errorHandler(400, 'Food item ID is required')
  }
  const image = req.file ? req.file.path : null
  const { name, price, prepTime, rating, description, availability } = req.body

  // Retrieve the previous image path from the database
  const foodItem = await FoodItem.findById(foodItemId)
  if (!foodItem) {
    throw new errorHandler(404, 'Food item not found')
  }
  const previousImage = foodItem.image

  if (
    !name &&
    !price &&
    !prepTime &&
    !image &&
    !rating &&
    !description &&
    !availability
  ) {
    throw new errorHandler(400, 'At least one field to update is required')
  }
  let newImage
  if (image) {
    newImage = await uploadOnCloudinary(image)
    if (!newImage) {
      throw new errorHandler(400, 'Error uploading image')
    }
  }
  const updatedFields = {}
  if (name) updatedFields.name = name
  if (price) updatedFields.price = price
  if (prepTime) updatedFields.prepTime = prepTime
  if (image) updatedFields.image = image
  if (rating) updatedFields.rating = rating
  if (description) updatedFields.description = description
  if (availability) updatedFields.availability = availability

  if (previousImage) {
    await deleteFromCloudinary(previousImage)
  }

  const updatedFoodItem = await FoodItem.findByIdAndUpdate(
    foodItemId,
    updatedFields,
    { new: true }
  )
  if (!updatedFoodItem) {
    throw new errorHandler(404, 'Food item not found')
  }

  res
    .status(200)
    .json(
      new apiResponse(200, updatedFoodItem, 'Food item updated successfully')
    )
})

// Get all food items
const getAllFoodItems = asyncHandler(async (req, res) => {
  const foodItems = await FoodItem.find()
  if (!foodItems || foodItems.length === 0) {
    throw new errorHandler(404, 'No food items found')
  }

  res
    .status(200)
    .json(new apiResponse(200, foodItems, 'Successfully listed food items'))
})

export { addFoodItem, deleteFoodItem, updateFoodItem, getAllFoodItems }

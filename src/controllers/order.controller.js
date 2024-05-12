import Order from '../models/Order.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import apiResponse from '../utlities/apiResponse.js'
import errorHandler from '../utlities/errorHandler.js'
import FoodItem from '../models/FoodItem.model.js'
// Add a new order
const addOrder = asyncHandler(async (req, res) => {
  const { items } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new errorHandler(
      400,
      'Items array is required and should not be empty'
    )
  }
  const userId = req.user._id

  // Fetch the details of all food items
  const foodItemsPromises = items.map(async (item) => {
    const foodItem = await FoodItem.findById(item.foodItemId)
    if (!foodItem) {
      throw new errorHandler(
        404,
        `Food item with ID ${item.foodItemId} not found`
      )
    }
    return {
      item: foodItem._id,
      qty: item.quantity,
      totalPrice: foodItem.price * item.quantity,
    }
  })

  // Wait for all food items to be fetched
  const foodItems = await Promise.all(foodItemsPromises)

  // Create the order object
  const order = new Order({
    cart: foodItems,
    placedBy: userId,
  })

  // Save the order
  const savedOrder = await order.save()
  if (!savedOrder) {
    throw new errorHandler(500, 'Failed to add order')
  }

  // Retrieve the saved order from the database and populate the fields
  const populatedOrder = await Order.findById(savedOrder._id)
    .populate('cart.item')
    .populate('placedBy')

  res
    .status(201)
    .json(new apiResponse(200, populatedOrder, 'Order added successfully'))
})

// Delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId
  if (!orderId) {
    throw new errorHandler(400, 'Order ID is required')
  }
  const deletedOrder = await Order.findOneAndDelete({ _id: orderId })
    .populate('cart.item')
    .populate('placedBy')
  if (!deletedOrder) {
    throw new errorHandler(404, 'Order not found')
  }

  res
    .status(200)
    .json(new apiResponse(200, deletedOrder, 'Order deleted successfully'))
})

// Get all orders for a user
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('cart.item').populate('placedBy')
  if (!orders || orders.length === 0) {
    throw new errorHandler(404, 'No orders found')
  }
  res
    .status(200)
    .json(new apiResponse(200, orders, 'Successfully listed all orders'))
})

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId
  if (!orderId) {
    throw new errorHandler(400, 'Order ID is required')
  }

  const order = await Order.findOne({ _id: orderId })
    .populate('cart.item')
    .populate('placedBy')
  if (!order) {
    throw new errorHandler(404, 'Order not found')
  }

  res
    .status(200)
    .json(new apiResponse(200, order, 'Successfully retrieved order'))
})

// Get all orders made by a specific user
const getAllOrdersByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const orders = await Order.find({ placedBy: userId })
  if (!orders || orders.length === 0) {
    throw new errorHandler(404, 'No orders found')
  }

  res
    .status(200)
    .json(new apiResponse(200, orders, 'Successfully listed orders'))
})

export { addOrder, deleteOrder, getAllOrders, getAllOrdersByUser, getOrderById }

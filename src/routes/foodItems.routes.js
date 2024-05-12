import authAdmin from '../middlewares/adminAuth.middleware.js'
import { Router } from 'express'
import uploadMulter from '../middlewares/multer.middleware.js'

import {
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
  getAllFoodItems,
} from '../controllers/foodItem.controller.js'

const router = Router()

// Admin operations
router.route('/add').post(uploadMulter.single('image'), authAdmin, addFoodItem)
router.route('/delete/:foodItemId').delete(authAdmin, deleteFoodItem)
router
  .route('/update/:foodItemId')
  .put(uploadMulter.single('image'), authAdmin, updateFoodItem)
router.route('/getall').get(getAllFoodItems)

export default router

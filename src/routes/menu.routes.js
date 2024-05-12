import authAdmin from '../middlewares/adminAuth.middleware.js'
import { Router } from 'express'
import {
  addFoodItemToMenu,
  deleteFoodItemFromMenu,
  getMenu,
} from '../controllers/menu.controller.js'

const router = Router()

// Admin operations
router.route('/additem').post(authAdmin, addFoodItemToMenu)
router.route('/deleteitem').delete(authAdmin, deleteFoodItemFromMenu)
router.route('/getmenu').get(getMenu)

export default router

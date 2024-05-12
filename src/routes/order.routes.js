import authUser from '../middlewares/auth.middleware.js'
import authAdmin from '../middlewares/adminAuth.middleware.js'
import { Router } from 'express'
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUser,
} from '../controllers/order.controller.js'

const router = Router()

// User operations
router.route('/add').post(authUser, addOrder)
router.route('/delete/:orderId').delete(authUser, deleteOrder)
router.route('/admin/delete/:orderId').delete(authAdmin, deleteOrder)
router.route('/getall').get(authAdmin, getAllOrders)
router.route('/getbyorderid/:orderId').get(authAdmin, getOrderById)
router.route('/userorder').get(authUser, getAllOrdersByUser)

export default router

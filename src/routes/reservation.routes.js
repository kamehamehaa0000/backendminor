import authUser from '../middlewares/auth.middleware.js'
import authAdmin from '../middlewares/adminAuth.middleware.js'
import { Router } from 'express'
import {
  addReservation,
  deleteReservation,
  getAllReservation,
  getAllReservationById,
} from '../controllers/reservation.controller.js'

const router = Router()

//user operations
router.route('/add').post(authUser, addReservation)
router.route('/delete/:resID').delete(authUser, deleteReservation)
router.route('/admin/delete/:resID').delete(authAdmin, deleteReservation)
router.route('/user').get(authUser, getAllReservationById)

//admin operations
router.route('/getall').get(authAdmin, getAllReservation)

export default router

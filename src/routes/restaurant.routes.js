import authAdmin from '../middlewares/adminAuth.middleware.js'
import { Router } from 'express'
import { updateTotalSlots } from '../controllers/restaurant.controller.js'

const router = Router()

//admin operations
router.route('/totalslots/:newSlotNumber').post(authAdmin, updateTotalSlots)

export default router

import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/admin.controller.js'
const router = Router()

router.route('/register').post(registerAdmin)
router.route('/login').post(loginAdmin)

//secured routes will go here
//...
//exporting router
export default router

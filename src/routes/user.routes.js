import { Router } from 'express'
import uploadMulter from '../middlewares/multer.middleware.js'
import { loginUser, registerUser } from '../controllers/user.controller.js'
const router = Router()

router
  .route('/user/register')
  .post(
    uploadMulter.fields([{ name: 'profileImage', maxCount: 1 }]),
    registerUser
  )

router.route('/user/login').post(loginUser)

//secured routes will go here
//...

export default router

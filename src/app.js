import express from 'express'
import cors from 'cors'
const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

import userRouter from './routes/user.routes.js'
import reservation from './routes/reservation.routes.js'
import adminRoutes from './routes/admin.routes.js'
import foodItemRoutes from './routes/foodItems.routes.js'
import menuRoutes from './routes/menu.routes.js'
import orderRoutes from './routes/order.routes.js'
import staffRoutes from './routes/staff.routes.js'
import restaurantRoutes from './routes/restaurant.routes.js'

app.use('/api/v1/', userRouter)
app.use('/api/v1/reservation', reservation)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/fooditem', foodItemRoutes)
app.use('/api/v1/menu', menuRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/staff', staffRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)

export default app

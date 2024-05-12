import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
  {
    totalSlots: { type: Number, required: true, default: 10 },
    bookedSlots: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant

/* admin(update total slots) */

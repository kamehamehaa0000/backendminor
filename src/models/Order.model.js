import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
        qty: { type: Number, min: [1, 'atleast one qty is required'] },
        totalPrice: { type: Number, required: true },
      },
    ],
    placedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
/* 
  add
  get all (admin)
  get one (by id)
  delete by id

*/

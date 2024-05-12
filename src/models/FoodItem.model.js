import mongoose from 'mongoose'

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    prepTime: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
      type: Number,
      min: [0, "can't rate below that"],
      max: [5, "can't rate above that"],
    },
    description: { type: String, required: true },
    category: { type: String, required: true },
    availability: { type: String, required: true }, //required for availability is not fixed yet
  },
  { timestamps: true }
)

const FoodItem = mongoose.model('FoodItem', foodItemSchema)

export default FoodItem
/* 
update 
delete
add
get name
get all
*/

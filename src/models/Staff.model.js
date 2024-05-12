import mongoose from 'mongoose'

// Define Schema for Reservation
const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    shift: {
      type: String,
      default: 'Not Assigned',
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    dateOfJoining: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Staff', staffSchema)

export default Reservation

//add staff
//remove staff
//update staff - update role, phonenumber , dateOfjoining

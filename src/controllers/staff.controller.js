import Staff from '../models/Staff.model.js'
import asyncHandler from '../utlities/asyncHandler.js'
import apiResponse from '../utlities/apiResponse.js'
import errorHandler from '../utlities/errorHandler.js'

// Add a new staff member
const addStaffMember = asyncHandler(async (req, res) => {
  const { name, role, phoneNumber, shift, dateOfJoining } = req.body
  if (!phoneNumber || !dateOfJoining || !name || !role) {
    throw new errorHandler(400, 'ID, name, and role are required fields')
  }

  const staffMember = new Staff({
    name,
    role,
    phoneNumber,
    shift,
    dateOfJoining,
  })

  const savedStaffMember = await staffMember.save()
  if (!savedStaffMember) {
    throw new errorHandler(500, 'Failed to add staff member')
  }

  res
    .status(201)
    .json(
      new apiResponse(200, savedStaffMember, 'Staff member added successfully')
    )
})

// Delete a staff member
const deleteStaffMember = asyncHandler(async (req, res) => {
  const staffId = req.params.staffId
  if (!staffId) {
    throw new errorHandler(400, 'Staff member ID is required')
  }

  const deletedStaffMember = await Staff.findByIdAndDelete(staffId)
  if (!deletedStaffMember) {
    throw new errorHandler(404, 'Staff member not found')
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        deletedStaffMember,
        'Staff member deleted successfully'
      )
    )
})

// Update a staff member
const updateStaffMember = asyncHandler(async (req, res) => {
  const staffId = req.params.staffId
  if (!staffId) {
    throw new errorHandler(400, 'Staff member ID is required')
  }

  const { phoneNumber, shift, name, dateOfJoining } = req.body
  const updatedFields = {}
  if (phoneNumber) updatedFields.phoneNumber = phoneNumber
  if (shift) updatedFields.shift = shift
  if (name) updatedFields.name = name
  if (dateOfJoining) updatedFields.dateOfJoining = dateOfJoining
  const updatedStaffMember = await Staff.findByIdAndUpdate(
    staffId,
    updatedFields,
    { new: true }
  )
  if (!updatedStaffMember) {
    throw new errorHandler(404, 'Staff member not found')
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedStaffMember,
        'Staff member updated successfully'
      )
    )
})

// Get all staff members
const getAllStaffMembers = asyncHandler(async (req, res) => {
  const allStaffMembers = await Staff.find({})
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        allStaffMembers,
        'All staff members retrieved successfully'
      )
    )
})

export {
  addStaffMember,
  deleteStaffMember,
  updateStaffMember,
  getAllStaffMembers,
}

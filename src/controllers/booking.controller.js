import { Booking } from "../models/booking.model.js";
import { Property } from "../models/property.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

// Create Booking Controller
const createBooking = asyncHandler(async (req, res) => {
  try {
    const { propertyId, userId, checkInDate, checkOutDate, bookedRooms } =
      req.body;

    // Find the property by its ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json(new ApiError(404, "Property not found"));
    }

    let totalAmount = 0;
    const bookingRoomItems = [];

    // Iterate through each booked room and validate it against the property room types
    for (const room of bookedRooms) {
      const { roomTypeId, quantity } = room;

      // Find the room type in the property roomTypes array
      const roomType = property.roomTypes.id(roomTypeId);

      if (!roomType) {
        return res
          .status(404)
          .json(
            new ApiError(
              404,
              `Room type not found for roomTypeId: ${roomTypeId}`
            )
          );
      }

      // Check if the roomType has enough available rooms
      if (roomType.availableRoom < quantity) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              `Not enough available rooms for ${roomType.roomTypeName}. Only ${roomType.availableRoom} available.`
            )
          );
      }

      // Deduct the booked rooms from the availableRoom count
      roomType.availableRoom -= quantity;

      // Calculate the price for the rooms
      const pricePerRoom = roomType.discountPrice || roomType.price; // Use discount price if available
      const totalRoomPrice = pricePerRoom * quantity;
      totalAmount += totalRoomPrice;

      // Create booking room item
      bookingRoomItems.push({
        roomType: roomType.roomTypeName,
        roomTypeId: roomTypeId,
        quantity: quantity,
        pricePerRoom: pricePerRoom,
        totalRoomPrice: totalRoomPrice,
      });
    }

    // Save the updated property with new available room counts
    await property.save();

    // Create a new booking
    const booking = new Booking({
      property: propertyId,
      user: userId,
      checkInDate,
      checkOutDate,
      bookedRooms: bookingRoomItems,
      totalAmount,
    });

    // Save the booking
    await booking.save();

    res
      .status(201)
      .json(new ApiResponse(201, booking, "Booking created successfully"));
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json(new ApiError(500, error.message));
  }
});
export { createBooking };

import mongoose, { Schema } from "mongoose";

const bookingRoomItemSchema = new Schema({
  roomType: {
    type: String, // Reference the roomTypeName from Property schema
    required: true,
  },
  roomTypeId: {
    type: Schema.Types.ObjectId,
    ref: "Property.roomTypes",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerRoom: {
    type: Number,
    required: true,
  },
  totalRoomPrice: {
    type: Number,
    required: true,
  },
});

const bookingSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    bookedRooms: [bookingRoomItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: ["Booked", "CheckedIn", "Cancelled", "Completed"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);

import mongoose, { Schema } from "mongoose";

const roomTypeSchema = new Schema(
  {
    roomTypeName: {
      type: String,
      required: true,
    },
    roomTypeImages: {
      type: [String],
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    balcony: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    totalRoom: {
      type: Number,
    },
  },
  { timestamps: true }
);

const employeSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  designation: {
    type: String,
  },
});

const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    propertyBannerImage: {
      type: String, // cloudinary url
    },
    propertyImages: {
      type: [String],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: [true, "This Number is Already Used Please use a unique Number"],
    },
    amentites: {
      type: [String],
    },
    roomTypes: {
      type: [roomTypeSchema],
    },
    employee: {
      type: [employeSchema],
    },
    minimumRoomPrice: {
      type: Number,
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model("Property", propertySchema);

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
      default: 0,
    },
    abailableRoom: {
      type: Number,
    },
    roomSize: {
      type: Number,
      default: 0,
    },
    canSleep: {
      type: Number,
      default: 0,
    },
    bedCount: {
      type: Number,
      default: 0,
    },
    amentites: [
      {
        amentitesType: {
          type: String,
        },
        amentites: [String],
      },
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const propertyRulesSchema = new Schema(
  {
    rulesType: {
      type: String,
    },
    rules: [String],
  },
  {}
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

const reviewSchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewMessage: {
      type: String,
    },
    reviewStar: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const spotSchema = new Schema(
  {
    name: {
      type: String,
    },
    distance: String,
  },
  {}
);

const newrbySpotSchema = new Schema({
  name: {
    type: String,
  },
  list: [spotSchema],
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
    view: {
      type: [String],
    },
    roomTypes: {
      type: [roomTypeSchema],
    },
    employee: {
      type: [employeSchema],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    minimumRoomPrice: {
      type: Number,
    },
    maximumRoomPrice: {
      type: Number,
    },
    garage: {
      type: Boolean,
      default: false,
    },
    details: {
      type: String,
    },
    location: {
      type: String,
    },
    proertyReviewCalculateStar: {
      type: Number,
      default: 0,
    },
    propertyReviews: {
      type: [reviewSchema],
    },
    propertyRules: {
      type: [propertyRulesSchema],
    },
    nearbySpots: [newrbySpotSchema],
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model("Property", propertySchema);

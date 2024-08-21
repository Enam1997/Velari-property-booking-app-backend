import { Property } from "../models/property.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const {
      searchString,
      view,
      propertyType,
      location,
      totalRooms,
      isGarage,
      minimumPrice,
      maximumPrice,
      amentites,
    } = req.query;

    // Building the query object based on provided query parameters
    let query = {};

    // Search string logic to match across propertyName, location, and details
    if (searchString) {
      query.$or = [
        { propertyName: { $regex: searchString, $options: "i" } },
        { location: { $regex: searchString, $options: "i" } },
        { details: { $regex: searchString, $options: "i" } },
      ];
    }

    if (view) {
      query.view = { $in: view.split(",") };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (totalRooms) {
      query["roomTypes.totalRoom"] = totalRooms;
    }

    if (isGarage) {
      query.garage = isGarage === "true";
    }

    // Handle price range
    if (minimumPrice || maximumPrice) {
      query.minimumRoomPrice = {};
      if (minimumPrice) {
        query.minimumRoomPrice.$gte = minimumPrice;
      }
      if (maximumPrice) {
        query.minimumRoomPrice.$lte = maximumPrice;
      }
    }

    if (amentites) {
      query.amentites = { $all: amentites.split(",") };
    }

    // Fetching the properties from the database
    const properties = await Property.find(query);

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "No properties found matching the criteria"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, properties, "All Properties Fetched Successfully")
      );
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json(new ApiError(500, error.message));
  }
});

const getPropertyDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query; // Getting the property id from the Query Parameter

    // Find the property by ID
    const property = await Property.findById(id);

    // Check if the property exists
    if (!property) {
      return res.status(404).json(new ApiError(404, "Property not found"));
    }

    // Respond with the property details
    res
      .status(200)
      .json(
        new ApiResponse(200, property, "Property details fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json(new ApiError(500, error.message));
  }
});

// Below methods are only for testing add property

const createPropertyTest = async (
  propertyName,
  propertyType,
  email,
  propertyImages,
  phoneNumber,
  amentites,
  view,
  roomTypes,
  employee,
  createdBy,
  minimumRoomPrice,
  maximumRoomPrice,
  garage,
  details,
  location
) => {
  const property = await Property.create({
    propertyName,
    propertyType,
    email,
    propertyImages,
    phoneNumber,
    amentites,
    view,
    roomTypes,
    employee,
    createdBy,
    minimumRoomPrice,
    maximumRoomPrice,
    garage,
    details,
    location,
  });
};

const addProperty = asyncHandler(async (req, res) => {
  const {
    propertyName,
    propertyType,
    email,
    propertyImages,
    phoneNumber,
    amentites,
    view,
    roomTypes,
    employee,
    createdBy,
    minimumRoomPrice,
    maximumRoomPrice,
    garage,
    details,
    location,
  } = req.query;

  const roomTypesPars = JSON.parse(roomTypes);
  const employeePars = JSON.parse(employee);

  createPropertyTest(
    propertyName,
    propertyType,
    email,
    propertyImages,
    phoneNumber,
    amentites,
    view,
    roomTypesPars,
    employeePars,
    createdBy,
    minimumRoomPrice,
    maximumRoomPrice,
    garage,
    details,
    location
  )
    .then(() => {
      res.send("Property Created Perfectly");
    })
    .catch((err) => {
      console.log(err);

      res.send(err);
    });
});

// Below methodsFor Adding Room Test

const addRoom = asyncHandler(async (req, res) => {
  try {
    const {
      propertyId,
      roomTypeName,
      roomTypeImages,
      price,
      discountPrice,
      balcony,
      breakfast,
      totalRoom,
      addedBy,
    } = req.body;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    // Check if the property exists
    if (!property) {
      return res.status(404).json(new ApiError(404, "Property not found"));
    }

    // Create a new room object
    const newRoom = {
      roomTypeName,
      roomTypeImages,
      price,
      discountPrice,
      balcony,
      breakfast,
      totalRoom,
      abailableRoom: totalRoom,
      addedBy,
    };

    // Add the new room to the roomTypes array in the property
    property.roomTypes.push(newRoom);

    // Check and update the minimumRoomPrice if the discountPrice is lower
    if (
      !property.minimumRoomPrice ||
      discountPrice < property.minimumRoomPrice
    ) {
      property.minimumRoomPrice = discountPrice;
    }

    // Check and update the maximumRoomPrice if the discountPrice is higher
    if (
      !property.maximumRoomPrice ||
      discountPrice > property.maximumRoomPrice
    ) {
      property.maximumRoomPrice = discountPrice;
    }

    // Save the updated property
    await property.save();

    // Return success response
    res
      .status(200)
      .json(new ApiResponse(200, property, "Room added successfully"));
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json(new ApiError(500, error.message));
  }
});

export { getAllProperties, getPropertyDetails, addProperty, addRoom };

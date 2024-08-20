import { Property } from "../models/property.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const {
      searchString,
      view,
      ParamHoteltype,
      Paramlocation,
      ParamBedRooms,
      ParamIsGarage,
      minimumPrice,
      maximumPrice,
      amenities,
    } = req.query;

    // Building the query object based on provided query parameters
    let query = {};

    if (searchString) {
      query.propertyName = { $regex: searchString, $options: "i" };
    }

    if (view) {
      query.view = { $in: view.split(",") };
    }

    if (ParamHoteltype) {
      query.propertyType = ParamHoteltype;
    }

    if (Paramlocation) {
      query.location = { $regex: Paramlocation, $options: "i" };
    }

    if (ParamBedRooms) {
      query["roomTypes.totalRoom"] = ParamBedRooms;
    }

    if (ParamIsGarage) {
      query["roomTypes.garage"] = ParamIsGarage === "true";
    }

    if (minimumPrice) {
      query.minimumRoomPrice = { $gte: minimumPrice };
    }

    if (maximumPrice) {
      query.maximumRoomPrice = query.minimumRoomPrice
        ? { ...query.minimumRoomPrice, $lte: maximumPrice }
        : { $lte: maximumPrice };
    }

    if (amenities) {
      query.amentites = { $all: amenities.split(",") };
    }

    // Fetching the properties from the database
    const properties = await Property.find(query);

    res
      .status(200)
      .json(
        new ApiResponse(200, properties, "All Properties Fetched Succesfully")
      );
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
});

const getAllPropertie = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  console.log("Here Come Perfecly");
  console.log(properties);

  res
    .status(200)
    .json(
      new ApiResponse(200, properties, "All Properties Fetched Succesfully")
    );
});

const getPropertyDetails = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  console.log("Here Come Perfecly");
  console.log(properties);

  res
    .status(200)
    .json(
      new ApiResponse(200, properties, "All Properties Fetched Succesfully")
    );
});

// Below methods are only for testing

const createPropertyTest = async (
  propertyName,
  propertyType,
  email,
  phoneNumber,
  roomTypes,
  propertyImages
) => {
  const property = await Property.create({
    propertyName,
    propertyType,
    email,
    phoneNumber,
    roomTypes,
    propertyImages,
  });
};

const addProperty = asyncHandler(async (req, res) => {
  console.log("**********************************");
  console.log("Start");

  createPropertyTest(
    "rapa",
    "Private House",
    "rapa@gmail.com",
    "01834803269",
    {
      roomTypeName: "Luxury",
    },
    [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
      "https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg",
    ]
  )
    .then(() => {
      res.send("Property Created Perfectly");
    })
    .catch((err) => {
      console.log(err);

      res.send(err);
    });
});

export { getAllProperties, addProperty };

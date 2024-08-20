import { Property } from "../models/property.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

const getAllProperties = asyncHandler(async (req, res) => {
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

const addProperty = asyncHandler(async (req, res) => {});

export { getAllProperties, addProperty };

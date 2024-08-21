import { Router } from "express";
import {
  addProperty,
  addRoom,
  getAllProperties,
  getPropertyDetails,
} from "../controllers/property.controller.js";

const router = Router();

router.route("/get-all-properties").get(getAllProperties);
router.route("/propertiydetails").get(getPropertyDetails);

// This is only for testing
router.route("/add-a-property").post(addProperty);
router.route("/add-room").post(addRoom);

export default router;

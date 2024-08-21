import { Router } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyDetails,
} from "../controllers/property.controller.js";

const router = Router();

router.route("/get-all-properties").get(getAllProperties);
router.route("/propertiydetails").get(getPropertyDetails);

// This is only for testing
router.route("/add-a-property").get(addProperty);

export default router;

import { Router } from "express";
import { getAllProperties } from "../controllers/property.controller.js";

const router = Router();

router.route("/get-all-properties").get(getAllProperties);

export default router;

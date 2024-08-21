import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";

const router = Router();

router.route("/new-booking").post(createBooking);

export default router;

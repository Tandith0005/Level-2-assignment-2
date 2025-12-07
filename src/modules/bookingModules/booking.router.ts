import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/", authMiddleware, bookingController.getAllBookings);
router.put("/:bookingId", authMiddleware, bookingController.updateBooking);

export const bookingRoutes = {
  router,
};

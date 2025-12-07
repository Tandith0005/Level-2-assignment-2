import { Response, Request } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const message = user.role === "admin"? "Bookings retrieved successfully": "Your bookings retrieved successfully";
    const result = await bookingService.getAllBookings(user as JwtPayload);
    // console.log(result);
    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const id = req.params.bookingId;
  const user = req.user;
  const status = req.body;
  // console.log(id);
  try {
    const result = await bookingService.updateBooking(
      id as string,
      user as JwtPayload,
      status
    );
    // console.log(result);

    let message = "Booking cancelled successfully";
    if (result.status === "returned") {
      message = "Booking marked as returned. Vehicle is now available";
    }

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};

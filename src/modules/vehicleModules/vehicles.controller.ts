import { Response, Request } from "express";
import { vehicleService } from "./vehicles.service";

const postVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.postVehicle(req.body);
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicles();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: result.length === 0 ? "No vehicles found" : "Vehicles retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSpecificVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  // console.log(id);
  try {
    const result = await vehicleService.getSpecificVehicle(id as string);
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  // console.log(id);
  try {
    const result = await vehicleService.updateVehicle(id as string, req.body);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  // console.log(id);
  try {
    const result = await vehicleService.deleteVehicle(id as string);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleController = {
  postVehicle,
  getVehicles,
  getSpecificVehicle,
  updateVehicle,
  deleteVehicle
};

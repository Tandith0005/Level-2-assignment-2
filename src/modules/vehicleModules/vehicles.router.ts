import {Router} from "express";
import { vehicleController } from "./vehicles.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { isAdmin } from "../../middleware/adminMiddleware";
const router = Router();


// http://localhost:5000/api/v1/vehicles
router.post("/", authMiddleware, isAdmin, vehicleController.postVehicle);
router.get("/", vehicleController.getVehicles);
// http://localhost:5000/api/v1/vehicles/:vehicleId
router.get("/:vehicleId", vehicleController.getSpecificVehicle);
router.put("/:vehicleId", authMiddleware, isAdmin, vehicleController.updateVehicle);
router.delete("/:vehicleId", authMiddleware, isAdmin, vehicleController.deleteVehicle);



export const vehicleRoutes = {
    router
}
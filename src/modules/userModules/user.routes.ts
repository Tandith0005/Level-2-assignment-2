import { isAdmin } from "../../middleware/adminMiddleware";
import { isAdminOrSelf } from "../../middleware/adminOrSelf";
import authMiddleware from "../../middleware/authMiddleware";
import isSelf from "../../middleware/isSelf";
import { userController } from "./user.controller";
import {Router} from "express";
const router = Router();




router.get("/", authMiddleware, isAdmin, userController.getAllUsers);
router.put("/:userId", authMiddleware, isAdminOrSelf, userController.updateUser);
router.delete("/:userId", authMiddleware, isAdmin, userController.deleteUser);



export const userRoutes = {
    router

}
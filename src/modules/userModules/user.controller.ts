import { Response, Request } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // business logic
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: "true",
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    // business logic
    const result = await userService.updateUser(req.body, id as string);

    res.status(200).json({
      success: "true",
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    // business logic
    const result = await userService.deleteUser(id as string);

    res.status(200).json({
      success: "true",
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUser,
  deleteUser
};

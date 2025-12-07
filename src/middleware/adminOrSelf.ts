import { Request, Response, NextFunction } from "express";
export const isAdminOrSelf = (req : Request, res : Response, next : NextFunction) => {
  const user = req.user; 
  const paramId = req.params.userId;

  if (user.role === "admin") {
    return next();
  }

  if (user.id === Number(paramId)) {
    return next();
  }

  return res.status(403).json({ message: "Access denied." });
};

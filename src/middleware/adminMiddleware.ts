import { Response, Request, NextFunction } from "express";
export const isAdmin = (req : Request, res : Response, next : NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};

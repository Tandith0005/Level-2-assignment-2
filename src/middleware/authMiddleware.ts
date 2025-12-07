import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header ) {
    return res.status(401).json({
      success: false,
      message: "No token",
        });
    }

    const token = header.split(" ")[1];
    try {
    const decoded = jwt.verify(token as string, config.jwtSecret!);
    req.user = decoded as JwtPayload; 
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export default authMiddleware;
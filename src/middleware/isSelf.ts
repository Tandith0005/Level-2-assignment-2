import { Request, Response, NextFunction } from "express";

const isSelf = (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user; 
  const paramsUserId = Number(req.params.userId);

  if (!loggedUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, login first please",
    });
  }

  if (loggedUser.id === paramsUserId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "You can only update your own profile",
  });
};

export default isSelf;

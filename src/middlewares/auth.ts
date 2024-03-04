import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenCheck = req.headers.authorization;

    if (!tokenCheck) return res.status(401).json({ message: "Unauthorized" });
    if (!tokenCheck.startsWith("Bearer"))
      return res.status(404).json({ message: "Wrong token format" });

    const token = tokenCheck.replace("Bearer ", "");
    const verifyToken = jwt.verify(token, "secret") as JwtPayload;
    req.body.userId = verifyToken.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

import { Request, Response, NextFunction } from "express";
import { ExtendRequest } from "../types/extendedRequest";

const isAdmin = (req: ExtendRequest, res: Response, next: NextFunction) => {
    console.log("isAdmin middleware called");
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("Forbidden: Admins only");
  }
};

export default isAdmin;

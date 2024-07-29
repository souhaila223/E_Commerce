import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";



const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get("authorization"); // inside the auth.header there are Bearer and token

    if (!authorizationHeader) {
        res.status(403).send("Authorization header was not provided");
        return;
    }

    const bearerToken = authorizationHeader.split(" ");
    const token = bearerToken[1];
    // check token sents is not undefined, null or ''
    if (!token) {
        res.status(403).send("Bearer token not found");
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || '' , async (err, payload) => {
        if(err) {
            res.status(403).send("Invalid token");
            return;
        }

        if(!payload) {
            res.status(403).send("Invalid token payload")
            return;
        }

        const userPayload = payload as {
            email: string;
            firstName: string;
            lastName: string;
        };

        // Fetch user from db based on the payload
        const user = await userModel.findOne({ email: userPayload.email });
        if (!user) {
            res.status(403).send("User not found");
            return;
        }
        console.log("User found:", user.email); // Add log
        req.user = user;
        next();
    });
};

export default validateJWT;

// it happens like that enter, check header => fetch user from db => next 
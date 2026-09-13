import type { NextFunction, Request , Response } from "express";
import jwt  from "jsonwebtoken";
import UserModel from "../models/userModel.js";


export interface ExtendRequest extends Request{
    user?: any;
}

const validateJWT = (req: ExtendRequest , res: Response , next: NextFunction)=>{
    const authorizationHeader = req.get("authorization");

    if(!authorizationHeader){
        res.status(403).send("Authorization header was not provided");
        return;
    }

    const token = authorizationHeader.split(" ")[1]; // Because the first split this is bearer and the second one is the token

    if(!token){
        res.status(403).send("Bearer was not found");
        return;
    }

    jwt.verify(token ,  process.env.JWT_SECRET || "" , async(err , payload)=>{
        if(err){
            res.status(403).send("Invalid token");
        }
        if(!payload){
            res.status(403).send("Invaild payload");
        }
        const userPayload = payload as{
            email : string;
            firstName: string;
            lastName: string
        }

        // Fetch the user from database
        const user = await UserModel.findOne({email : userPayload.email});

        req.user = user;
        next();
    });
};


export default validateJWT;
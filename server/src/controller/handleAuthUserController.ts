import { Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import * as jwt from "jsonwebtoken";

export default function handleAuthUser(req : Request, res : Response) {
    let accessToken = req.headers.authorization?.split(' ').slice(1).join() as string;
    let verifyToken = verifyAccessToken(accessToken);
    if(verifyToken.expired === false) {
        const decodeToken = jwt.decode(accessToken) as jwt.JwtPayload
        return res.status(200).send({
            "status" : 200,
            "message" : "valid token",
            "email" : decodeToken.email
        });
    } else {
        return res.status(401).send({
            "status" : 401,
            "message" : "invalid token"
        })
    }
}
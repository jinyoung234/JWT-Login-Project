import { Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export default function handleAuthUser(req : Request, res : Response) {
    let token = req.headers.authorization?.split(' ').slice(1).join() as string;

    let verifyToken = verifyAccessToken(token);

    if(verifyToken.expired === false) {
        return res.status(200).send({
            "status" : 200,
            "message" : "valid token",
            "email" : verifyToken.payload
        });
    } else {
        return res.status(401).send({
            "status" : 401,
            "message" : "invalid token"
        })
    }
}
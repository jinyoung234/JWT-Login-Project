import { Request, Response } from "express";
import { verifyJWT } from "../utils/jwt";

export default function handleAuthUser(req : Request, res : Response) {
    let token = req.headers.authorization?.split(' ').slice(1).join() as string;

    let verifyToken = verifyJWT(token);

    if(verifyToken.expired === false) {
        return res.status(200).send({
            "ok" : 200,
            "message" : "valid token",
            "payload" : verifyToken.payload
        });
    } else {
        return res.status(401).send({
            "ok" : 401,
            "message" : "invalid token"
        })
    }
}
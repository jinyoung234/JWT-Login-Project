import { Request, Response } from "express";
import { signJWT, verifyRefreshToken } from "../utils/jwt";

export default function handleValidRefreshToken(req : Request, res : Response) {
    let refreshToken = req.headers.cookie?.split("=").slice(1).join();
    let isVaildRefreshToken = verifyRefreshToken(refreshToken as string);

    if(isVaildRefreshToken.expired === false) {
        const accessToken = signJWT({
            email : isVaildRefreshToken.payload?.email, 
            sessionId : isVaildRefreshToken.payload?.sessionId
        }, "5s")
        return res.status(200).send({
            "status" : 200,
            "message" : "재발급이 완료되었습니다.",
            "accessToken" : accessToken
        });
    } else {
        return res.status(401).send({
            "status" : 401,
            "message" : "유효한 refresh 토큰이 아닙니다.",
        });
    }
}
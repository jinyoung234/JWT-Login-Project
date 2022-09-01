import { Request, Response } from "express";
import { deleteSession, userSession } from "../db/userSession";
import { verifyRefreshToken } from "../utils/jwt";

export default function handleUserLogout(req : Request, res : Response) {
    const refreshToken = req.headers.cookie?.split("=").slice(1).join();
    const isVaildRefreshToken = verifyRefreshToken(refreshToken as string);
    const SESSION_ID = isVaildRefreshToken.payload?.sessionId;
    deleteSession(SESSION_ID);
    res.cookie('refreshToken', '', {maxAge : 0});
    return res.status(200).send({
        "status" : '200',
        "message" : "로그아웃 완료"
    });
}
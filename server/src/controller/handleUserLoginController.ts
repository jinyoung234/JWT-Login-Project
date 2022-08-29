import { NextFunction, Request, Response } from "express";
import { searchUser } from "../db/user";
import { createSession } from "../db/userSession";
import { signJWT } from "../utils/jwt";

// function for handle user login
export default function handleUserLogin(req : Request, res : Response, next : NextFunction) {
    
    // user가 입력한 email, password를 변수로 저장
    const {email, password} = req.body;

    // email을 통해 user 정보 접근
    const user = searchUser(email);

    // 만약 db에 password와 id 정보가 없다면 401 리턴
    if(!user) {
        return res.status(401).send("등록된 아이디가 존재하지 않습니다.");
    } else if (user.password !== password) {
        return res.status(401).send("비밀번호가 유효하지 않습니다.");
    }

    // 입력한 email을 통해 session 생성
    const session = createSession(email);

    // access token과 refresh token 생성
    // access token과 refresh token의 만료 주기는 각각 5분, 1년으로 설정
    const accessToken = signJWT({
        email : user.email, sessionId : session.sessionId
    }, "5s")

    const refreshToken = signJWT({
        sessionId : session.sessionId
    }, "1y");

    // 쿠키에 accessToken과 refreshToken을 담음
    res.cookie("accessToken", accessToken, {
        maxAge : 300000, // 5분
        httpOnly : true,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge : 3.154e10, // 1년
        httpOnly : true,
    });

    // 유저에게 session 반환
    return res.status(200).send(session);
}
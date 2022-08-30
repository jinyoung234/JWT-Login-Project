import { Express } from "express";
import handleAuthUser from "./controller/handleAuthUserController";
import handleUserCreate from "./controller/handleUserController";
import handleUserLogin from "./controller/handleUserLoginController";
import handleValidRefreshToken from "./controller/handleValidRefreshTokenController";

export default function routes(app : Express) {

    // 회원 가입 api
    app.post("/api/register", handleUserCreate);

    // 로그인 api
    app.post("/api/login", handleUserLogin);

    // 유저 확인 api
    app.get("/api/user", handleAuthUser);

    // 유저 refresh
    app.get("/api/refresh", handleValidRefreshToken)
}
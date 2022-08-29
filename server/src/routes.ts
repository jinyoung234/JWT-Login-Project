import { Express } from "express";
import handleUserCreate from "./controller/handleUserController";
import handleUserLogin from "./controller/handleUserLoginController";

export default function routes(app : Express) {

    // 회원 가입 api
    app.post("/api/register", handleUserCreate);

    // 로그인 api
    app.post("/api/login", handleUserLogin);
}
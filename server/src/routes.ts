import { Express } from "express";
import handleUserCreate from "../controller/handleUserController";

export default function routes(app : Express) {
    // 회원 가입 api
    app.post("/api/register", handleUserCreate);
}
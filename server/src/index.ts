import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

/**
 *  http에 암호화된 데이터를 분석하여 req.body에 담아주기 위해 사용
 * */

// json 포맷을 해독하기 위해 사용하는 미들웨어
app.use(express.json());

// x-www-form-urlencoded 포맷을 해독하기 위해 사용하는 미들웨어
app.use(express.urlencoded({ extended: false }));

// cors 설정
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// 서버 시작
function main() {
  app.listen(4000, () => {
    console.log("Server listening at http://localhost:4000");
  });
  routes(app);
}

main();

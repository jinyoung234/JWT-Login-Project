import { Request, Response } from 'express';
import { searchUser, users } from "../db/user";

// api로 부터 요청 받을 경우, res로 받은 데이터를 db에 추가 후 성공 응답 남겨주는 함수
export default function handleUserCreate(req : Request, res : Response) {
    
    const {email, password} = req.body;
    
    // user의 request를 통해 받은 email을 통해 실제 유저가 있는지 검색하여 나온 값
    const user = searchUser(email);

    // 만약 email이 db에 조회된다면 401 에러를 리턴
    if(user) {
        return res.status(401).send("이미 등록된 사용자 입니다.");
    }

    // 만약 email이 db에 조회가 된다면 users db에 데이터 추가
    users.push({
        id : users.length + 1,
        email,
        password
    })

    // 응답으로 200 코드와 함께 회원가입 처리를 완료 시킴
    console.log(users);
    return res.status(200).send("회원가입 처리가 완료되었습니다.");
}
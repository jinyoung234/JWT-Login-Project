import { Request, Response } from 'express';
import { searchUser, users } from "../db/user";

// api로 부터 요청 받을 경우, res로 받은 데이터를 db에 추가 후 성공 응답 남겨주는 함수
export default function handleUserCreate(req : Request, res : Response) {
    
    const {email} = req.body;
    
    // user의 request를 통해 받은 email을 통해 실제 유저가 있는지 검색하여 나온 값
    const user = searchUser(email);

    // 만약 email이 db에 조회되지 않는 다면 401 에러를 리턴
    if(user) {
        return res.status(401).send("등록된 사용자가 존재하지 않습니다.");
    }

    // 만약 email이 db에 조회가 된다면 users db에 데이터 추가
    users.push({
        id : users.length + 1,
        email
    })

    console.log(users);
    return res.status(200).send("회원가입 처리가 완료되었습니다.");
}
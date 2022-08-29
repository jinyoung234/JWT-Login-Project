interface IUser {
    id : number;
    email : string;
    password: string;
}

// user 데이터 생성
export const users = [
    {
        id : 1,
        email : "test@test.com",
    }
]

export const searchUser = (email : string) => {
    return users.find((user) => user.email === email) as IUser
}
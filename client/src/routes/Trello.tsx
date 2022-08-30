import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { client, refreshApi } from "../utils/api/api";

interface IResponse {
    status: string;
    message : string;
    email : string;
}

interface IToken {
    status: string;
    message : string;
    accessToken : string;
}

export default function Trello() {
    const [userInfo, setUserInfo] = useState('');
    useEffect(() => {
            client.get("/api/refresh")
            .then(res => {
                const data = res.data as IToken;
                client.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
                client.get("/api/user")
                .then(res => {
                    let data = res.data as IResponse
                    setUserInfo(data.email);
                })
                .catch(err => {
                    console.log(err);
                })
            })
    },[])
    useQuery(["refresh"], refreshApi, {
        refetchInterval : 1000*60*4,
        refetchOnWindowFocus : false,
    })
    return(
        <>
        <div>{userInfo}</div>
        </>
    )
}
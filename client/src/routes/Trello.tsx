import { useQuery } from "@tanstack/react-query";
import { useRecoilValueLoadable } from "recoil";
import { client, refreshApi } from "../utils/api/api";
import { refreshSelector } from "../utils/store";

export default function Trello() {
    const handleUserLogout = () => {
        client.get("/api/logout")
        .then(res => {
            window.location.replace('/');
        })
    }

    const refreshLoadable = useRecoilValueLoadable(refreshSelector);
    
    useQuery(["refresh"], refreshApi, {
        refetchInterval : 1000*60*4,
        refetchOnWindowFocus : false,
    });

    switch(refreshLoadable.state) {
        case 'hasValue' :
            return (
                <>
                    <div>{refreshLoadable.contents}</div>
                    <button
                        onClick={handleUserLogout}
                    >
                    logout
                    </button>
                </>
            );
        case 'loading' : 
            return <div>is Loading...</div>
        case 'hasError' : 
            throw refreshLoadable.contents  
    }
}
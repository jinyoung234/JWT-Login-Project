export interface IUserSession {
    sessionId : string;
    email : string;
    valid : boolean
}

export const userSession : Record<string, IUserSession> = {};

export function getSession(sessionId : string) {
    const sessionKey = Object.keys(userSession).find(id => id === sessionId) as string;
    
    return userSession[sessionKey];
}

export function deleteSession(sessionId : string) {
    delete userSession[sessionId];
}

// 유저의 세션 생성
export function createSession(email : string) {
    
    // sessionId 설정
    const sessionId = String(Object.keys(userSession).length + 1);

    // 세션 변수
    const session = {sessionId, email, valid : true};

    // 만든 세션을 userSession에 추가
    userSession[sessionId] = session;

    return session;
}
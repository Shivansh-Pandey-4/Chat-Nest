import type WebSocket from "ws";

export interface IUserInfo{
    userId : number;
    fullName : string;
    roomCode : string;
    roomId : number;
}


export type ISuccessAuth = {
    success : true;
    msg : string;
    userFullName : string;
    userId : number;
    roomId : number;
    roomCode : string;
}

export type IFailureAuth = {
    success : false;
    msg : string;
}

export type IAuthResponse = ISuccessAuth | IFailureAuth;


export interface IBaseHandler{
    currentSocket : WebSocket;
    allSockets : Map<string, Set<WebSocket>>;
    socketMapping : Map<WebSocket, IUserInfo>;
    authResponse : {
        success : boolean;
        msg : string;
        userFullName : string;
        userId : number;
        roomId : number;
        roomCode: string;
    }
}
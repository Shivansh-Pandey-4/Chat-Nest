

export interface ISuccess{
    success : true,
    msg : string;
    userFullName : string;
    userEmail : string;
    userId : number;
    roomId ?: number;
    roomCode ?: string;
}

export interface IFailure{
    success : false,
    msg : string;
    error ?: string;
}

export type IData = ISuccess | IFailure;
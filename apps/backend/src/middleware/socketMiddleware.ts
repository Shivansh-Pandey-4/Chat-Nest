import http from "node:http";
import cookie from "cookie";
import jwt from "jsonwebtoken"
import type { MyJwtPayload } from "../types/jwt.js";
import prisma from "@repo/db";
import type { IAuthResponse } from "../types/socket.js";



async function socketMiddleware(request : http.IncomingMessage): Promise<IAuthResponse>{
    
    const token = cookie.parseCookie(request.headers.cookie || "").token;
    
    if(!token || !token.trim()){
        return {
            success : false,
            msg : "token not provided"
        }
    }

    const url = new URL(request.url || "", `http://${request.headers.host}`);
    const requestRoomCode = url.searchParams.get("roomCode");

    if(!requestRoomCode || !requestRoomCode.trim()){
        return {
            success : false,
            msg : "roomCode not provided in query params"
        }
    }

    try {
        if(!process.env.JWT_SECRET){
            throw new Error("jwt string not found");
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload;
        
        if(!decode || !decode.id || !decode.fullName){
            return {
                success : false,
                msg : "incorrect token provided"
            }
        }

        const userExist = await prisma.user.findUnique({
            where : {id : decode.id},
            include : {room: true}
        });

        if(!userExist || !userExist.roomId){
            return {
                success : false,
                msg : "user not found or user not joined any room"
            }
        }

        if(userExist.room?.roomCode !== requestRoomCode ){
            return {
                success : false,
                msg : "unauthorized room access"
            }
        }

        return {
            success : true,
            msg : "user joined the room",
            userFullName : userExist.fullName,
            userId : userExist.id,
            roomCode : userExist.room?.roomCode,
            roomId : userExist.roomId
        }

    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return {
                success : false,
                msg : "token is expired"
            }
        }

        if(error instanceof jwt.JsonWebTokenError){
            return {
                success : false,
                msg : "incorrect token: " + error.message
            }
        }

        return {
            success : false,
            msg : `failed to authenticate : ${error instanceof Error && error.message}`
        }

    }
}


export default socketMiddleware;
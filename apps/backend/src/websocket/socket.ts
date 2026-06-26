import { WebSocketServer, WebSocket } from "ws";
import http from "node:http";
import socketMiddleware from "../middleware/socketMiddleware.js";
import type { IUserInfo } from "../types/socket.js";


const allSockets = new Map<string, Set<WebSocket>>();
const socketMapping = new Map<WebSocket, IUserInfo>();


function initializeWebsocket(httpServer : http.Server ){

    const wss = new WebSocketServer({server : httpServer});

    wss.on("connection",  async (socket, request)=>{

        const authResponse =  await socketMiddleware(request);

        if(!authResponse.success){
            return socket.close(1008, authResponse.msg);
        }

        socket.on("message", (data)=>{

        })

        socket.on("close", ()=>{
            
        })


    })
}


export default initializeWebsocket;
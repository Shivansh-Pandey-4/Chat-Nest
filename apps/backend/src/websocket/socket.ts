import { WebSocketServer, WebSocket } from "ws";
import http from "node:http";
import socketMiddleware from "../middleware/socketMiddleware.js";
import type { IUserInfo } from "../types/socket.js";
import joinHandler from "./handlers/joinHandler.js";
import chatHandler from "./handlers/chatHandler.js";


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
            try {
                const parsedMessage = JSON.parse(data.toString());

                if(parsedMessage.type === "join"){
                    joinHandler({allSockets, authResponse, socketMapping, currentSocket: socket});
                    return;
                }

                if(parsedMessage.type === "chat"){
                    const msg = parsedMessage.payload.msg;

                    return chatHandler({allSockets, authResponse, socketMapping, currentSocket: socket}, msg )
                }

            } catch (error) {
                    return socket.send(JSON.stringify({
                        type : "error",
                        payload : {
                            msg : error instanceof Error ? error.message : "unknown error occurred"
                        }
                    }))

            }

        })

        socket.on("close", ()=>{
            
        })


    })
}


export default initializeWebsocket;
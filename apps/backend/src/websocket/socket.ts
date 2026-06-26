import { WebSocketServer } from "ws";
import http from "node:http";

function initializeWebsocket(httpServer : http.Server ){

    const wss = new WebSocketServer({server : httpServer});

    wss.on("connection", (socket, request)=>{



    })
}


export default initializeWebsocket;
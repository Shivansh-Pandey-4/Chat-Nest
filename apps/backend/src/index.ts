import http from "node:http"
import dotenv from "dotenv";
import app from "./app.js";
import initializeWebsocket from "./websocket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

initializeWebsocket(httpServer);

httpServer.listen(PORT, ()=>{
    console.log(`server started listening on port: ${PORT}`);
})

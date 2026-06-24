import http from "node:http"
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, ()=>{
    console.log(`server started listening on port: ${PORT}`);
})

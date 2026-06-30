import express, { type Request, type Response } from "express"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import roomRoute from "./routes/roomRoute.js";
import cors from "cors";



const app = express();

app.use(cors({
    origin : "http://localhost:3001",
    credentials : true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/room", roomRoute);


app.get("/", (req: Request, res: Response)=>{
    return res.json({
        success : true,
        msg : "hello world"
    })
})


export default app;
import express, { type Request, type Response } from "express"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";



const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);

app.get("/", (req: Request, res: Response)=>{
    return res.json({
        success : true,
        msg : "hello world"
    })
})


export default app;
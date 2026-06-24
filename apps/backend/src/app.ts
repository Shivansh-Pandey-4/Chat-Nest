import express, { type Request, type Response } from "express"

const app = express();

app.get("/", (req: Request, res: Response)=>{
    return res.json({
        success : true,
        msg : "hello world"
    })
})


export default app;
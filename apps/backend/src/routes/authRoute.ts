import express, { type Request, type Response } from "express"
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { signupSchema, signinSchema } from "@repo/validation";
import zod from "@repo/validation";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/signup", async (req: Request<{}, {}, zod.infer<typeof signupSchema> >, res: Response)=>{

    const result = signupSchema.safeParse(req.body);

    if(!result.success){
        return res.json({
            success : false,
            msg : "invalid credentials provided",
            error : `err: ${result.error.issues[0]?.message} , path: ${result.error.issues[0]?.path.toString()}`
        })
    }

    try {
        const {email, password, fullName} = result.data;

        const userExist = await prisma.user.findUnique({
            where : {email}
        });

        if(userExist){
            return res.status(400).json({
                success : false,
                msg : "email already taken"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data : {email, fullName, password: hashedPassword},
            select : {
                fullName : true,
                email : true,
                createdAt : true,
                id : true,
                updatedAt :  true
            }
        });

        return res.json({
            success : true,
            msg : "user signed up successfully",
            user : newUser
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "failed to sign up",
            error : error instanceof Error ? error.message : "unknown error occurred"
        })
    }
})


router.post("/signin", async (req: Request<{}, {}, zod.infer<typeof signinSchema>>, res: Response)=>{

    const result = signinSchema.safeParse(req.body);
    
     if(!result.success){
        return res.json({
            success : false,
            msg : "invalid credentials provided",
            error : `err: ${result.error.issues[0]?.message} , path: ${result.error.issues[0]?.path.toString()}`
        })
    }


    try {

        const {email, password} = result.data;

        const userExist = await prisma.user.findUnique({
            where : {email}
        })

        if(!userExist){
            return res.status(400).json({
                success : false,
                msg : "invalid email or password"
            })
        }

        const verifyPassword = await bcrypt.compare(password, userExist.password);

        if(!verifyPassword){
            return res.status(400).json({
                success : false,
                msg : "invalid email or password"
            })
        }

        if(!process.env.JWT_SECRET){
            throw new Error("jwt string not found");
        }

        const token = jwt.sign({id : userExist.id, fullName: userExist.fullName}, process.env.JWT_SECRET, {expiresIn : "1hr"});

        res.cookie("token", token, {httpOnly : true});

        return res.json({
            success : true,
            msg : "user signed in successfully",
            user : userExist
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "failed to sign in",
            error : error instanceof Error ? error.message : "unknown error occurred"
        })
    }
})


router.post("/logout", (req: Request, res: Response)=>{
    res.clearCookie("token");

    return res.json({
        success : true,
        msg : "user logged out successfully"
    })

})


router.get("/me", authMiddleware, async (req: Request, res: Response)=>{
     try {
        const userExist = await prisma.user.findUnique({
            where : {
                id : req.userInfo.id
            },
            include : {room : true}
        })

        if(!userExist){
            return res.status(400).json({
                success : false,
                msg : "user not found"
            })
        }

        return res.json({
            success : true,
            msg : "user found successfully",
            userFullName : userExist.fullName,
            userEmail : userExist.email,
            userId : userExist.id,
            roomId : userExist.roomId,
            roomCode : userExist.room?.roomCode
        });

     } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "failed to get user",
            error : error instanceof Error ? error.message : "Unknown error occurred"
        })
     }
})


export default router;
import express, { type Request, type Response } from "express"
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const router = express.Router();


router.post("/signup", async (req: Request, res: Response)=>{
    const {fullName, email, password} = req.body;
    try {
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


router.post("/signin", async (req: Request, res: Response)=>{
    const {email, password} = req.body;

    try {
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
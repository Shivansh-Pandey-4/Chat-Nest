import express, { type Request, type Response } from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import prisma, { Prisma } from "@repo/db";
import generateRoomCode from "../lib/generateRoomCode.js";

const router = express.Router();


router.post("/create", authMiddleware, async(req: Request, res: Response)=>{
    try {

        const userExist = await prisma.user.findUnique({
            where : {id : req.userInfo.id},
            include: {room: true}
        })

        if(!userExist){
            return res.status(400).json({
                success : false,
                msg : "user not found"
            })
        }

        if(userExist.roomId){
            return res.json({
                success : true,
                msg : "user allReady present in a room",
                roomId : userExist.roomId,
                roomCode : userExist.room?.roomCode
            })
        }

        const newRoomCode = generateRoomCode();

        const newRoom = await prisma.room.create({
            data : {
                roomCode : newRoomCode,
            }
        });

        const updateUser = await prisma.user.update({
            where : {id: req.userInfo.id},
            data : {
                roomId : newRoom.id
            },
            include : {room : true}
        });

        return res.json({
            success : true,
            msg : "new room created successfully",
            roomId : updateUser.roomId,
            roomCode : updateUser.room?.roomCode
        })


    } catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === "P2002") {
                   return res.status(400).json({
                        success : false,
                        msg : "failed to create a new room",
                        error : error.message
                 })
                }
            }

         return res.status(500).json({
            success : false,
            msg : "failed to create a new room",
            error : error instanceof Error ? error.message : "unknown error occurred"
         })
    }
})
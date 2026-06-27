import zod from "zod";


const joinSchema = zod.object({
    type : zod.literal("join", "invalid type provided"),
    payload : zod.object({
        roomCode : zod.string().trim().length(6, "Length must be 6 characters long only")
    })
})


const chatSchema = zod.object({
    type : zod.literal("chat"),
    payload : zod.object({
        msg : zod.string().trim().min(1, "minimum 1 character is required")
    })
})


export const clientMsgSchema = zod.discriminatedUnion("type", [joinSchema, chatSchema]);
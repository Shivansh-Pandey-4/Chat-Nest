import zod from "zod";

export const signupSchema = zod.object({
    fullName : zod.string().trim().min(3, "minimum 3 characters are required").max(150, "maximum 150 characters are allowed"),

    email : zod.preprocess((val) => typeof val === "string" ? val.trim() : val, zod.email("invalid email provided")),

    password : zod.string().trim().min(6, "minimum 6 characters are required").max(150, "maximum 150 characters are allowed")
})


export const signinSchema = signupSchema.pick({email : true, password : true});
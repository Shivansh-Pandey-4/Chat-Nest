import  type { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload{
    id : number;
    fullName : string;
}
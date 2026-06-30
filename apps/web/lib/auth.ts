import { cookies } from "next/headers";

interface ISuccess{
    success : true,
    msg : string;
    userFullName : string;
    userEmail : string;
    userId : number;
    roomId ?: number;
    roomCode ?: string;
}

interface IFailure{
    success : false,
    msg : string;
    error ?: string;
}

type IData = ISuccess | IFailure;


export async function authVerify(){

    const cookie = await cookies();
    const token = cookie.get("token");

    if(token){
        try {
            const response = await fetch("http://localhost:3000/auth/me",{
                method : "GET",
                headers : {
                    Cookie : `token=${token.value}`
                }
            });

            let data: IData | null = null;
            try {
                 data = await response.json();
            } catch (error) {
                data  = null;
            }
            
            if(!response.ok){
                return false;
            }

            if(data && data.success){
                return {
                    userFullName : data.userFullName,
                    userEmail : data.userEmail,
                    userId : data.userId,
                    roomId : data.roomId,
                    roomCode : data.roomCode
                }
            }

        } catch (error) {
            return false;
        }
        
    }

    return false;
}
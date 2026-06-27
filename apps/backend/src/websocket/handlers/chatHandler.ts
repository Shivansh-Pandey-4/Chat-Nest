import type { IBaseHandler } from "../../types/socket.js";


function chatHandler(data: IBaseHandler, msg: string){
    const {allSockets, authResponse, currentSocket, socketMapping} = data;
    const {roomCode, roomId, userFullName, userId} = authResponse;

    return allSockets.get(roomCode)?.forEach(s => {
        if(s !== currentSocket){
            s.send(JSON.stringify({
                type : "chat",
                payload : {
                    msg : msg,
                    fromUser : userFullName
                }
            }))
        }
    })


}

export default chatHandler;
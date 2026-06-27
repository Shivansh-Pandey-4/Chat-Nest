import type { IBaseHandler } from "../../types/socket.js";

function typingHandler(data: IBaseHandler){

    const {allSockets, currentSocket, socketMapping} = data;
    const userInfo = socketMapping.get(currentSocket);

    if(!userInfo) return;

    const roomSockets = allSockets.get(userInfo.roomCode);
    if(!roomSockets){
        return ;
    }

    roomSockets.forEach(socket => {
        if(socket.readyState === socket.OPEN && socket !== currentSocket){
            socket.send(JSON.stringify({
                type : "typing",
                payload : {
                    userFullName : userInfo.fullName
                }
            }))
        }

    })

}

export default typingHandler;
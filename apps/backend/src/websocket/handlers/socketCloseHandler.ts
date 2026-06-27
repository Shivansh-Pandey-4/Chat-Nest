import type { IBaseHandler } from "../../types/socket.js";


function socketCloseHandler(data: IBaseHandler){
    const {allSockets, currentSocket, socketMapping} = data;

    const userInfo = socketMapping.get(currentSocket);
    if(!userInfo) return;

    const roomSocket = allSockets.get(userInfo.roomCode);

    if(!roomSocket){
            socketMapping.delete(currentSocket);
            return;
    }

    roomSocket.delete(currentSocket);
    socketMapping.delete(currentSocket);

    if(roomSocket.size === 0){
        allSockets.delete(userInfo.roomCode);
        return;
    }

    roomSocket.forEach(s => {
        if(s.readyState === s.OPEN){
            s.send(JSON.stringify({
                type : "leave",
                payload : {
                    msg : `${userInfo.fullName} has left the room`
                }
            }))
        }

    })
}


export default socketCloseHandler;
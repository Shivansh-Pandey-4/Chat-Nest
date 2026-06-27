import type { IBaseHandler } from "../../types/socket.js";



function joinHandler(data : IBaseHandler){
    const {allSockets, authResponse, socketMapping, currentSocket} = data;
    const {roomCode, roomId, userFullName, userId} = authResponse;

    if(!allSockets.has(roomCode)){
        allSockets.set(roomCode, new Set());
    }

    allSockets.get(roomCode)?.add(currentSocket);
    socketMapping.set(currentSocket, {fullName: userFullName, roomCode, roomId, userId});

    allSockets.get(roomCode)?.forEach(socket => {
        if(socket.readyState === socket.OPEN){
            socket.send(
                JSON.stringify({
                    type: "user_joined",
                    payload: {
                        msg: `${userFullName} joined ${roomCode}`
                    }
                })
            );
        }
    })

}

export default joinHandler;
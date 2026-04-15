import { io } from "socket.io-client"

let socket

export const connectSocket = (tokken) => {
    socket = io("http://localhost:8001", {
        auth: { tokken }
    })
}

export const getSocket = () => socket
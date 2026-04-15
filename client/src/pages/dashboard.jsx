import React, { useEffect, useState } from 'react'
import { getSocket } from '../socket/socket'

const DashBoard = () => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const userID = "69ccce23d3c14c400d203400"
    const receiver = "69d4f2da20d18f9710f33104"

    useEffect(() => {
        const socket = getSocket()
        if (!socket) return
        socket.emit("join", userID)
        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg])
        })
        return () => socket.off("receive_message")
    }, [])

    const sendMessage = () => {
        const socket = getSocket()
        if (!socket) return
        const msgData = {
            sender: userID,
            receiver,
            message
        }
        socket.emit("send_message", msgData)
        // ✅ correct structure
        setMessages((prev) => [...prev, msgData])
        setMessage("") // optional clear input
    }

    return (
        <div>
            {messages.map((m, i) => (
                <p key={i}>{m.message}</p>
            ))}
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default DashBoard
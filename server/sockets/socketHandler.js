
const Message = require("../models/message")

let users = {}

module.exports = (io) => {
    io.on("connection", (socket) => {
        // console.log("user Connected", socket.id)

        socket.on("join", (userid) => {
            users[userid] = socket.id
        })
        socket.on("send_message", async (data) => {
            const { sender, receiver, message } = data

            const newMsg = await Message.create({ sender, receiver, message })
            const receiverScocket = users[receiver]
            if (receiverScocket) {
                io.to(receiverScocket).emit("receive_message", newMsg)
            }
        })
        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}

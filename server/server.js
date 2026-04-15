require("dotenv").config()
const http = require("http")
const app = require("./app")

const { Server } = require("socket.io")
const connectDB = require("./config/db")

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})
connectDB()

require("./sockets/socketHandler")(io)

server.listen(8001, () => {
    console.log("Server is running on port 8001")
})
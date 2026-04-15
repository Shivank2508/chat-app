const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: String
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)
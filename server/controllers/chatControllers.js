exports.previousChat = async (req, res, next) => {
    const Message = require("../models/message")
    try {
        const { user1, user2 } = req.params

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 })
        res.status(200).json({ messages })
    } catch (err) {
        res.status(400).json({ message: err.msg })
    }
}
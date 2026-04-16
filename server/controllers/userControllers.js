
const user = require("../models/user")


exports.users = async (req, res, next) => {
    try {
        const users = await user.find().select("name")
        console.log(users)
        res.status(200).json({ users })
    } catch (err) {
        console.log(err)
        res.send(400).json({ message: err })
    }
}


const express = require("express")
const router = express.Router()

const auth = require('./auth')
const users = require("./users")
const chat = require("./chat")



router.use("/auth", auth)
router.use("/users", users)
router.use("/prechat", chat)

module.exports = router
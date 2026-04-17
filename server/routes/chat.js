const express = require("express")
const { previousChat } = require("../controllers/chatControllers")
const router = express.Router()



router.get("/previouschat/:user1/:user2", previousChat)

module.exports = router


const express = require("express")
const { users } = require("../controllers/userControllers")
const { authenticate } = require("../middleware/authmiddleware")
const router = express()

router.use("/allusers", authenticate, users)

module.exports = router
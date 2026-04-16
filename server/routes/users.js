const express = require("express")
const { users } = require("../controllers/userControllers")

const router = express()


router.use("/allusers", users)

module.exports = router
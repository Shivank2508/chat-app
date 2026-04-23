const express = require("express")
const { login, register, refresh } = require("../controllers/authcontrollers")
const router = express.Router()

router.use("/login", login)
router.use("/register", register)
router.use("/refresh", refresh)


module.exports = router
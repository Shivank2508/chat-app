
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/user")
const message = require("../models/message")


exports.register = async (req, res, next) => {
    try {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const userRegister = user.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword
        })
        res.status(200).json({
            userRegister,
            message: "created Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: err
        })
    }
}
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body
        const loginUser = await user.findOne({ email })
        if (!loginUser) {
            return res.status(401).json({
                message: "user does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, loginUser.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "password is not correct"
            })
        }
        const accessToken = jwt.sign(
            { id: loginUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        const refershToken = jwt.sign(
            { id: loginUser.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )
        loginUser.accessToken = accessToken
        loginUser.refreshToken = refershToken

        res.cookie("refreshToken", refershToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        await loginUser.save()
        res.status(200).json({ loginUser, accessToken, refershToken })

    } catch (err) {
        console.log(err)
    }
}
exports.refresh = async (req, res, next) => {
    try {
        const refershToken = req.cookies.refershToken
        if (!refershToken) {
            return res.status(401).json({ message: "unauthrize" })
        }
        const decoded = jwt.verify(refershToken, process.env.JWT_REFRESH_SECRET)

        const users = await user.findById(decoded.id)
        if (!users) {
            return res.status(401).json({ message: "unauthrize" })
        }

        const accessToken = jwt.sign(
            { id: users._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.status(200).json({ message: accessToken })

    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
}
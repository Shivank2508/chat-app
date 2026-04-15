
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/user")


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
        loginUser.accessToken = accessToken
        await loginUser.save()
        res.status(200).json({ loginUser, accessToken })

    } catch (err) {
        console.log(err)
    }
}
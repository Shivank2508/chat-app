const jwt = require("jsonwebtoken")

exports.authenticate = async (req, res, next) => {

    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(401).json({
            message: "Unautharize"
        })
    }
    const token = accessToken.split(" ")[1]
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
    }
}
const jwt = require("jsonwebtoken")

exports.authenticate = async (req, res, next) => {
    const accessToken = req.headers.authrization
    if (!accessToken) {
        return res.status(401).json({
            message: "Unautharize"
        })
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
    }
}
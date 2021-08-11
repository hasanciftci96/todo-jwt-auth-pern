const jwt = require("jsonwebtoken")
require("dotenv").config()
const isProduction = process.env.NODE_ENV === "production"
const secret = isProduction
    ? process.env.JWT_SECRET // Heroku will supply us with a string called DATABASE_URL for the connectionString,
    : process.env.JWT_LOCAL_SECRET

module.exports = async (req, res, next) => {
    try {
        //destructure the token
        const jwtToken = req.header("token")

        if (!jwtToken) {
            return res.status(403).send("Not Authorized")
        }

        const payload = jwt.verify(jwtToken, secret) //because remember in the jwtGenerator.js we set up a payload object with a user key

        req.user = payload.user //Burda da request'den geleni payload'in user key'inin value'suna esitliyoruz
        //
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Not Authorized")
    }

    next()
}

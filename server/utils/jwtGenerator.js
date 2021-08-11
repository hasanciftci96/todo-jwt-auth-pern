const jwt = require("jsonwebtoken")
require("dotenv").config()
const isProduction = process.env.NODE_ENV === "production"
const secret = isProduction
    ? process.env.JWT_SECRET // Heroku will supply us with a string called DATABASE_URL for the connectionString,
    : process.env.JWT_LOCAL_SECRET

function jwtGenerator(user_id) {
    const payload = {
        user: user_id,
    }

    return jwt.sign(payload, secret, { expiresIn: 3600 })
}

module.exports = jwtGenerator

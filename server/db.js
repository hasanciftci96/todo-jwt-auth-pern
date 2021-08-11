const { Pool } = require("pg")
const isProduction = process.env.NODE_ENV === "production"
const connectionString = `postgresql://hasanciftci@localhost:5432/jwttutorial`
const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL // Heroku will supply us with a string called DATABASE_URL for the connectionString,
        : connectionString,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
})

module.exports = pool

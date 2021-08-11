require("dotenv").config()

const express = require("express")
const db = require("./db")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 8080

//middleware
app.use(express.json())
app.use(cors())

//Routes
app.route("/api/names").get(async (req, res, next) => {
    try {
        const results = await db.query("SELECT * FROM test", [])
        res.json(results.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//register and login routes
app.use("/auth", require("./routes/jwtAuth"))

//dashboard route
app.use("/dashboard", require("./routes/dashboard"))

app.listen(PORT, () => console.log("Magic happening on PORT", +PORT))

const router = require("express").Router()
//allows us to breakdown our routes and then later combine them together'
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//register new users
router.post("/register", validInfo, async (req, res, next) => {
  //Burda valid info ilk validInfo.js'deki function'i execute et demek icin
  try {
    //First step destructure the req.body with the column names in our database
    const { name, email, password } = req.body //postman'de yolladiigimiz adlar

    //Second step check if the user exists and if so say the user already exists and throw an error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      //database'daki ad ile postmandaki body'deki key'leri eslestiriyoruz
      email,
    ])

    //Note: status 401 is unauthenticated while status 403 error is unauthorized
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists")
    }

    //bcrypt the user password(because remember if we dont use bcrypt then jwt tokens can reveal our information easily)
    const saltRound = 10 //bcrypts stuff base on its documentation
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    //enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    )

    //generating our jwt token, for new users
    const token = jwtGenerator(newUser.rows[0].user_id)
    res.json({ token })
    //
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

//login route
router.post("/login", validInfo, async (req, res, next) => {
  try {
    //first destructure the req.body
    const { email, password } = req.body

    //second, check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ])

    if (user.rows.length === 0) {
      return res.status(401).send("Incorrect credentials for login")
    }

    // 3) check if the client typed the correct password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    )

    console.log(validPassword)
    if (!validPassword) {
      return res.status(401).json("Incorrect credentials for login")
    }

    //if he passes all these then give him a jwt token, for existing users who want to login
    const token = jwtGenerator(user.rows[0].user_id) //No need to send the password because remember jwt is for authorization not authentication
    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

router.get("/is-verify", authorization, async (req, res, next) => {
  //by using the function from authorization.js we check if the token is valid
  try {
    res.json(true)
  } catch (err) {
    res.status(500).send("Server Error")
  }
})

module.exports = router

module.exports = (req, res, next) => {
    const { email, name, password } = req.body

    function validEmail(userEmail) {
        //checks if the email is valid (its a regex pattern)
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    }

    if (req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            //we check here if any of the 3 is empty or not (email, name, passwordemail, name, password)
            return res.status(401).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    } else if (req.path === "/login") {
        //now we will do the same exact thing but for /login route instead of /register route
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    }

    next()
}

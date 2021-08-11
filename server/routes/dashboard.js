const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")
//adam hep req.user.id yapiyor cunku jwtGenerator'de payload objesinin icinde user ve onun da icinde id diye bir object olusturmus onun yerine sen req.user'a devam et

router.get("/", authorization, async (req, res, next) => {
    try {
        const user = await pool.query(
            "SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1",
            [req.user]
        )
        res.json(user.rows)
        //
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error")
    }
})

router.post("/todos", authorization, async (req, res, next) => {
    //request respond
    try {
        //ikinci arguman [description] musterinin yolladigi json objesindeki description key'sinin valuesini placeholder olan $1'in yerine koy demek
        const { description } = req.body //just basic destructuring to get the value of description, daha fazla ilgi icin put'daki comment'i oku
        const newTodo = await pool.query(
            "INSERT INTO todos (user_id, description) VALUES($1, $2) RETURNING *", //VALUES($1) is a placeholder for this description
            [req.user, description] //RETURNING * is used whenever we are inserting data, updating or deleting data
            //It returns the data, send a post in postman with and without returning to see the difference
        )

        res.json(newTodo.rows[0]) //because we dont want to see all the other useless things in the json data of 200 status response
    } catch (err) {
        console.log(err.message)
    }
})

router.put("/todos/:id", authorization, async (req, res, next) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *", //AND statement'daki condition sayesinde basklarinin todos'una girip editliyemiyorsun, burda yapmaiz gerek cunku yukardakilerde query ile yapmiyoruz url'de burda ama yapiyoruz
            [description, id, req.user] //req.user'u authorization bolumunde set ettik. Burda baskalari senin todo'nu kullanmasin diye boyle yapiruz
        )
        if (updateTodo.rows.length === 0) {
            return res.json("This todo is not yours")
        }
        res.json(req.body.description)
    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/todos/:id", authorization, async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [
            id,
            req.user,
        ])

        if (deleteTodo.rows.length === 0) {
            return res.json("This todo is not yours")
        }
        res.json(`Todo was deleted`)
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router

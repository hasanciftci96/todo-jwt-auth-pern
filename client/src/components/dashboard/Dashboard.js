import React, { Fragment, useEffect, useState } from "react"
import InputTodo from "./todolist/InputTodo"
import ListTodo from "./todolist/ListTodo"
import { baseURL } from "../../route/route"

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("")
    const [allTodos, setAllTodos] = useState([])
    const [todosChange, setTodosChange] = useState(false)

    async function getName() {
        try {
            const response = await fetch(`${baseURL}/dashboard`, {
                method: "GET",
                headers: { token: localStorage.token }, //oncesinde localstorage'da login ederken token'imizi store etmistik cunku
            })

            const parseRes = await response.json()
            //console.log(parseRes)
            await setAllTodos(parseRes)
            await setName(parseRes[0].user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    //When someone clicks logout:
    //We have to remove everything in local storage or else his credentials will still be there
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect(() => {
        getName()
        setTodosChange(false) //anlik listenin page refresh etmeden degismesi icin cok onemli
        //todosChange false olarak basliyor sonra inputTodo.js'de  yeni bir sey ekleyince true'ya donuyor. True'ya donusu bu useEffect'i tetikliyor
        //ve setTodosChange'i bir daha false'a ceviriyoruz
    }, [todosChange])

    return (
        <Fragment>
            <div className="d-flex mt-5 justify-content-around">
                <h1>Hi {name},</h1>
                <button className="btn btn-primary" onClick={(e) => logout(e)}>
                    Logout
                </button>
            </div>
            <InputTodo setTodosChange={setTodosChange} />
            <ListTodo allTodos={allTodos} setTodosChange={setTodosChange} />
        </Fragment>
    )
}

export default Dashboard

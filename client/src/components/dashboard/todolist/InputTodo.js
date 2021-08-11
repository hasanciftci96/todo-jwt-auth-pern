import React, { useState } from "react"
import { baseURL } from "../../../route/route"

export default function InputTodo({ setTodosChange }) {
    const [description, setDescription] = useState("")

    function handleDescription(e) {
        setDescription(e.target.value)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const myHeaders = new Headers()

            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("token", localStorage.token)

            const body = { description }

            const response = await fetch(`${baseURL}/dashboard/todos`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            })
            await response.json()
            //console.log(parseResponse)
            setTodosChange(true)
            setDescription("")
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form onSubmit={onSubmitForm} className="d-flex mt-5">
                <input type="text" className="form-control" value={description} onChange={handleDescription} />
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    )
}

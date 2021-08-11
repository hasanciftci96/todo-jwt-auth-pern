import React, { Fragment, useState, useEffect } from "react"
import { baseURL } from "../../../route/route"

const EditTodo = ({ todo, setTodosChange }) => {
    const [description, setDescription] = useState(todo.description)

    useEffect(() => {
        console.log(description)
    }, [description])

    //edit description function

    const updateDescription = async (e) => {
        e.preventDefault()
        try {
            const body = { description }

            //proxy

            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("token", localStorage.token)

            await fetch(`${baseURL}/dashboard/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(body),
            })

            setTodosChange(true)

            // window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* 
        id = id10
      */}
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateDescription(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo

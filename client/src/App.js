import React, { Fragment, useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import Landing from "./components/Landing"
import { baseURL } from "./route/route"

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false) //unutma ternary'lerde ! kullaninca if object doesnt exist oluyor yani bu state false'ken

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    async function isAuth() {
        try {
            const response = await fetch(`${baseURL}/`, {
                method: "GET",
                headers: { token: localStorage.token },
            })
            const parseRes = await response.json()
            console.log(`is verify status is: ${parseRes}`)

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
        } catch (err) {
            console.error(err.message)
        }
    }

    //bu useEffect, login etmis bir kullanicinin token'i hala valid mi diye kontrol ediyor.
    useEffect(() => {
        isAuth()
    })

    //since the http://localhost:3000/ is blank, didnt want to confuse future me
    // if (window.location.href === "http://localhost:3000/") {
    //   window.location = "http://localhost:3000/login"
    // }

    //below we will use a ternary operator to see if the user is authenticated or not and redirect accordingly
    return (
        <Fragment>
            <Router>
                <div className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) =>
                                !isAuthenticated ? <Landing {...props} /> : <Redirect to="/dashboard" />
                            }
                        />
                        <Route
                            exact
                            path="/login"
                            render={(props) =>
                                !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />
                            }
                        />
                        <Route
                            exact
                            path="/register"
                            render={(props) =>
                                !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />
                            }
                        />
                        <Route
                            exact
                            path="/dashboard"
                            render={(props) =>
                                isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />
                            }
                        />
                    </Switch>
                </div>
            </Router>
        </Fragment>
    )
} //using render instead of components because this way each time we pass a new prop, we dont want it to remount, yani we dont want the elements to refresh all the time, if you pass it as a components instead of render than they will refresh

export default App

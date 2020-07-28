import React, {useState, useContext} from 'react'
import {useHistory} from "react-router-dom"
import UserContext from "../../context/UserContext"
import Axios from 'axios'
import ErrorMsg from "../Error/ErrorMsg"

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (event) => {
        event.preventDefault()
        try {
        const loginUser = { email, password }
        const loginRes = await Axios.post("http://localhost:3003/user/login", loginUser
    )
    setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
    })
    localStorage.setItem("auth-token", loginRes.data.token)
    history.push('/')
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
}
    return (
        <div className="page">
            <h2>Login</h2>
            {error && (
                <ErrorMsg message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
            <label htmlFor="login-email">Email</label>
            <input 
            id="login-email" 
            type="email" 
            onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="login-password">Password</label>
            <input 
            id="login-password" 
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            />

            <input type="submit" value="Login" />
            </form>
        </div>
    )
}

//worked through MERN auth tutorial on https://www.youtube.com/channel/UCQc5VXhS_wHKZL6oIK3moPA and https://github.com/jgbijlsma/mern-auth-template-front
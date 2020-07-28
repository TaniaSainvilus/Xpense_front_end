import React, {useState, useContext} from 'react'
import {useHistory} from "react-router-dom"
import UserContext from "../../context/UserContext"
import Axios from 'axios'
import ErrorMsg from "../Error/ErrorMsg"

export default function Register() {
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (event) => {
        event.preventDefault()
        
        try {
        const newUser = { email, username, password, passwordCheck }
        await Axios.post("http://localhost:3003/user/register",newUser)
        const loginRes = await Axios.post("http://localhost:3003/user/login", { email, 
        password,
    })
    setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
    })
    localStorage.setItem("auth-token", loginRes.data.token)
    history.push('/')

    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg)
    }
}
    return (
        <div className="page">
            <h2>Register</h2>
            {error && (
        <ErrorMsg message={error} clearError={() => setError(undefined)} />
      )}
            <form className="form" onSubmit={submit}>
            <label htmlFor="register-email">Email</label>
            <input 
            id="register-email" 
            type="email" 
            onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="register-username">Username</label>
            <input 
            id="register-username" 
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            />

            <label htmlFor="register-password">Password</label>
            <input 
            id="register-password" 
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            />
            <input 
            type="password" 
            placeholder="Verify password" 
            onChange={(event) => setPasswordCheck(event.target.value)}
            />

            <input type="submit" value="Register" />
            </form>
        </div>
    )
}

//worked through MERN auth tutorial on https://www.youtube.com/channel/UCQc5VXhS_wHKZL6oIK3moPA and https://github.com/jgbijlsma/mern-auth-template-front
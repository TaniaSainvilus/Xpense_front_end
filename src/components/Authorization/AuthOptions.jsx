import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory()

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        })
        localStorage.setItem("auth-token", "")
    }

    return (
        //logic for switching the register and login buttons to logout using a ternary...
        <nav className="authOptions">
            {userData.user ? (
                <button onClick={logout}>Log out</button>
            ) : (
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Login</button>
                    </>
                )}
        </nav>
    )
}

//worked through MERN auth tutorial on https://www.youtube.com/channel/UCQc5VXhS_wHKZL6oIK3moPA and https://github.com/jgbijlsma/mern-auth-template-front
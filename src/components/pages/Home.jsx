import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import CompleteBudget from './CompleteBudget'

export default function Home() {
    const { userData } = useContext(UserContext)

    return (
        <div className="page">
            {userData.user ? (
                <>
                <h1>Welcome {userData.user.username}</h1>
                <CompleteBudget />
                </>
            ) : (
                <>
                <h2>You are not logged in</h2>
                <Link id="login-redirect-link" to="/login">Login</Link>
                </>
            )}
        </div>
    )
}

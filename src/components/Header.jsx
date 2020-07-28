import React, { Component } from 'react'
import Login from "./Authorization/Login"
import Register from "./Authorization/Register"

class Header extends Component {
  render() {
    return (
      <header id="Header">
        <h1 className="title">Xpense</h1>
        <div className="buttons">
        <Register />
        <Login />
        </div>
      </header>
    )
  }
}

export default Header
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from './Authorization/AuthOptions'

class Header extends Component {

  render() {
    return (
      <header id="Header">
      <Link to ="/">
        <h1 className="title">Xpense</h1>
      </Link>
      <AuthOptions />
      </header>
    )
  }
}

export default Header
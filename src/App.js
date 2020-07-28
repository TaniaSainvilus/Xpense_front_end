import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/Header";
import Home from './components/pages/Home';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register';
import UserContext from './context/UserContext';


// Part 5 of MERN stack video...10:33
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3003/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3003/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  //worked through MERN auth tutorial on https://www.youtube.com/channel/UCQc5VXhS_wHKZL6oIK3moPA and https://github.com/jgbijlsma/mern-auth-template-front

  return (
      <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>

      <div id='container'></div>
        
      
</>       
    )
}

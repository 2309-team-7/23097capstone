import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import {BrowserRouter as Router } from "react-router-dom"
import Login from './Login'
import Register from './Register'

// TODO Needs to be linked with proper logo and search bar placement. Also needs proper navlink implementation for /Home
// WILL NOT RUN AS IS. The code for adding /home and /account are in here but not imported because I don't have them on my branch. This code will not work unless you remove those lines or import those components.

function Navbar() {
    return (
        <>
          <Router>
            <div id = "top-container">
              <h1 id = "title"><img id='logo-image' src={PLACEHOLDER}/>Booze Buddy</h1> 
                <div id = "navbar">
                  <Link className = "navlink" to = "/Home">Home</Link>
                  {!token ? (
                    <>
                      <Link className = "navlink" to = "/Login">Login</Link>
                      <Link className = "navlink" to = "/Signup">Sign Up</Link>
                    </>
                  ) : (
                    <Link className = "navlink" to = "/Account">My Account</Link>
                  )}
                </div>
            </div>
            <div id = "routes">
              <Routes>
                <Route path = "/" element = {<Login/>} />
                <Route path = "/Home" element = {<Home/>} />
                <Route path = "/Login" element = {<Login token = {token} setToken = {setToken}/>} />
                <Route path = "/Register" element = {<Register token = {token} setToken = {setToken}/>} />
                <Route path = "/Account" element = {<Account token = {token} setToken = {setToken}/>} />
              </Routes>
            </div>
          </Router>
        </>
      )
}

export default Navbar
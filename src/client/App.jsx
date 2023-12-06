import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import { Routes, Route, Link } from "react-router-dom"
import {BrowserRouter as Router } from "react-router-dom"

function App() {

  return (
    <>
    <Router>
    <div className='App'>
        <h1>Boilerplate</h1>
        <img id='comp-img' src='./computer.png'></img>
        <p>Replace the starter code in this template with something cool</p>
        <Login />
    </div>
    <div id = "Routes">
      <Routes>
        <Route path = "/" element = {<Login/>} />
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;

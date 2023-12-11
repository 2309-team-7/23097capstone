import React, { useState } from 'react';

export default function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState(null)

  async function handleLogin(e) {
      e.preventDefault()
      try {
          const response = await fetch(
              "http://localhost:3000/api/users/login", //Double check API endpoint here
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      email,
                      password,
                  })
              }
          );
          const result = await response.json()
          console.log("Login Result ", result)
          props.setToken(result.token)
          setSuccessMessage(result.message)
      } catch(error) {
          setError(error.message)
          console.log(error)
      }
  }

  return (
      <div className = "login-form">
          <h2 className = "form-header">Login</h2>
          {successMessage && <p>{successMessage}</p>}
          {error && <p>{error}</p>}
          <form>
              <label className = "form-item">
                  Email
                  <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className = "form-item">
                  Password
                  <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <button className = "form-button" onClick = {handleLogin}>Login</button>
          </form>
      </div>
  )
}

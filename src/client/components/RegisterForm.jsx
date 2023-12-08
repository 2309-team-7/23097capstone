import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

export default function RegisterForm({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      firstname,
      lastname,
      email,
      password,
    });
    try {
      const response = await fetch(`http://localhost:3000/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });
      const result = await response.json();
      console.log("Signup Result: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.div}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          className={styles.input}
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        />
        <label>Last Name:</label>
        <input
          className={styles.input}
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />
        <label>Email:</label>
        <input
          className={styles.input}
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password:</label>
        <input
          className={styles.input}
          required
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

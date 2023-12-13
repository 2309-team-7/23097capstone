import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

export default function RegisterForm({ setToken }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      firstname: name,
      lastname,
      email,
      password,
    });
    try {
      const response = await fetch(`http://localhost:3000/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const result = await response.json();
      console.log("Signup Result: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.div}>
      <div className={styles.box}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Create Your Account</h2>
        </div>
        <hr className={styles.line}></hr>
        <label>Name:</label>
        <input
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
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
        <button type="submit" className={styles.button}>
          <h3 className={styles.submit}>Submit</h3>
        </button>
      </form>
      </div>
    </div>
  );
}

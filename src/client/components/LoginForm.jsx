import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setToken(result.token);
        });
    } catch (error) {}
  }

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          className={styles.input}
          name="email"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Password:</label>
        <input
          className={styles.input}
          required
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
        <Link className={styles.a} to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

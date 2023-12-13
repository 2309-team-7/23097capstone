import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
export default function LoginForm({ setToken, setUser }) {
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
          setUser(result.user);
        });
    } catch (error) {}
  }

  return (
    <div className={styles.div}>
      <div className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.welcome}>
        <h2>Welcome Back!</h2>
        <h3>Please Sign in to continue</h3>
        </div>
        <hr className={styles.line}></hr>
        <label className={styles.labelEmail}>
          Email:
        </label>
        <input
          className={styles.input}
          name="email"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className={styles.labelPass}>
          Password:
          </label>
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
          <h3 className={styles.submit}>Submit</h3>
        </button>
        <button className={styles.create}>
          <Link className={styles.a} to="/register">
            <h3>Create New Account</h3>
          </Link>
        </button>
      </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import styles from "./RegisterForm.module.css";

export default function AddCommentForm({ setToken }) {
  const [comment, addComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      comment,
    });
    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      const result = await response.json();
      console.log("Comment: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      addComment("");
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
        <label>Comment:</label>
        <input
          className={styles.input}
          value={comment}
          onChange={(event) => addComment(event.target.value)}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

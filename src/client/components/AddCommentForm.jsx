import React, { useState } from "react";
import styles from "./AddCommentForm.module.css";

const API = "localhost:3000/api";

export default function AddCommentForm({ setToken }) {
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      comment,
    });
    try {
      const response = await fetch(`${API}/comments/createComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: comment,
        }),
      });
      const result = await response.json();
      console.log("Comment Post: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setComment("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.div}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Comment</label>
        <input
          className={styles.input}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

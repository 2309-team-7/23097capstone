import React, { useState } from "react";
import styles from "./AddCommentForm.module.css";

const API = "http://localhost:3000/api";

export function UpdateCommentForm({ token, commentId, setMode, commentContent }) {
  const [comment, setComment] = useState({
    id: commentId,
    content: commentContent,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();

    if (!token) {
      setError("You must be logged in to comment");
    }
    if (!comment.content) {
      setError("You must enter a comment");
    }

    try {
      setError(null);
      const response = await fetch(`${API}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment,
        }),
      });
      const result = await response.json();
      console.log("Comment Post: ", result);
      setSuccessMessage(result.message);
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
          value={comment.content}
          className={styles.input}
          onChange={(event) =>
            setComment((comment) => {
              return {
                ...comment,
                content: event.target.value,
              };
            })
          }
        />
        <button className={styles.button} type="submit">
          Save
        </button>
        <button onClick={() => setMode("view")}>Cancel</button>
      </form>
    </div>
  );
}

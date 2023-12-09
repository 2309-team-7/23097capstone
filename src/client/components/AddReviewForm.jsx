import React, { useState } from "react";
import styles from "./AddReviewForm.module.css";

const API = "localhost:3000/api";

export default function AddReviewForm({ setToken }) {
  const [review, setReview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      review,
    });
    try {
      const response = await fetch(`${API}/reviews/createReview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review,
        }),
      });
      const result = await response.json();
      console.log("Review Post: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setReview("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.div}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Review</label>
        <input
          className={styles.input}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

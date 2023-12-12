import React, { useState } from "react";
import styles from "./AddReviewForm.module.css";

const API = "http://localhost:3000/api";

export function UpdateReviewForm({ token, reviewId, setMode, reviewContent, reviewRating }) {
  const [review, setReview] = useState({
    id: reviewId,
    content: reviewContent,
    rating: reviewRating,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();

    if (!token) {
      setError("You must be logged in to review");
    }
    if (!review.content) {
      setError("You must enter a review");
    }

    try {
      setError(null);
      const response = await fetch(`${API}/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review,
        }),
      });
      const result = await response.json();
      console.log("Review Post: ", result);
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
        <label>Review</label>
        <input
          value={review.content}
          className={styles.input}
          onChange={(event) =>
            setReview((review) => {
              return {
                ...review,
                content: event.target.value,
              };
            })
          }
        />
        <label>{`Rating: ${review.rating}`}</label>
        <input
          className={styles.input}
          type="range"
          min="0"
          max="100"
          value={review.rating}
          onChange={(event) =>
            setReview((review) => {
              return {
                ...review,
                rating: event.target.value,
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

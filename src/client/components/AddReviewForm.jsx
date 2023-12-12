import React, { useEffect, useState } from "react";
import styles from "./AddReviewForm.module.css";

const API = "http://localhost:3000/api";

export default function AddReviewForm({ token, itemId, userId }) {
  const [review, setReview] = useState({
    item_id: itemId,
    content: "",
    rating: 50,
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
    if (!review.rating) {
      setError("You must enter a rating");
    }

    console.log({
      review,
    });
    try {
      setError(null);
      const response = await fetch(`${API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          review,
        }),
      });
      const result = await response.json();
      console.log("Review Post: ", result);

      setSuccessMessage(result.message);
      setReview("");
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    console.log(review);
  }, [review]);
  return (
    <div className={styles.div}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Review</label>
        <input
          className={styles.input}
          value={review.content}
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
          Submit
        </button>
      </form>
    </div>
  );
}

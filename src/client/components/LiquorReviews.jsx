import React, { useEffect, useState } from "react";
import { useApiHook } from "../hooks/useApi";
import AddReviewForm from "./AddReviewForm";
import { Review } from "./Review";
import styles from "./LiquorReviews.module.css";

export function LiquorReviews({ liquorId, token }) {
  const { data, isLoading, error } = useApiHook(`/items/reviews/${liquorId}`);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  const removeReviewById = (id) => {
    setReviews((reviews) => {
      return reviews.filter((review) => review.id !== id);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
      <AddReviewForm token={token} itemId={liquorId} />
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <li>No reviews yet</li>
        ) : (
          reviews.map((review) => {
            return <Review key={review.id} review={review} token={token} removeReviewById={removeReviewById} />;
          })
          
        )}
      </ul>
      
    </div>
  );
}

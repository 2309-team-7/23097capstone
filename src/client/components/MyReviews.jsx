import React, { useEffect } from "react";
import { Review } from "./Review";
import { useApiHook } from "../hooks/useApi";
export default function MyReviews({ reviews = [], token }) {
  return (
    <div>
      <h3>My Reviews</h3>
      <ul>
        {reviews.length === 0 ? (
          <p>No Reviews</p>
        ) : (
          reviews.map((review) => (
            <Review review={review} token={token} key={review.id} />
          ))
        )}
      </ul>
    </div>
  );
}

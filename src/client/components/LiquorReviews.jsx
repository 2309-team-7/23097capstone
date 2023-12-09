import React from "react";
import { useApiHook } from "../hooks/useApi";
import { LiquorComments } from "./LiquorComments";

export function LiquorReviews({ reviewId, token }) {
  const { reviews, isLoading, error } = useApiHook(
    `/items/reviews/${reviewId}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <li>No reviews yet</li>
        ) : (
          reviews.map((review) => {
            return (
              <li>
                <h4>{review.content}</h4>
                <LiquorComments
                  commentId={comments.id}
                  token={token}
                  reviewId={reviews.id}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

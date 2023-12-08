import React from "react";
import { useApiHook } from "../hooks/useApi";
import { LiquorComments } from "./LiquorComments";

export function LiquorReviews({ itemId, token }) {
  const {
    data: items,
    isLoading,
    error,
  } = useApiHook(`/items/reviews/${itemId}`);

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
        {items.length === 0 ? (
          <li>No reviews yet</li>
        ) : (
          items.map((item) => {
            return (
              <li>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <LiquorComments
                  itemId={itemId}
                  token={token}
                  reviewId={item.id}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

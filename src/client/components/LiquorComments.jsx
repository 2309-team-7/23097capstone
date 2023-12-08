import React from "react";
import { useApiHook } from "../hooks/useApi";

export function LiquorComments({ reviewId, token }) {
  const {
    data: items,
    isLoading,
    error,
  } = useApiHook(`/reviews/comments/${reviewId}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        <h3>Comments</h3>
        {items.length === 0 ? (
          <li>No comments yet</li>
        ) : (
          items?.map((item) => {
            return (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

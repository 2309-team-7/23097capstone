import React from "react";
import { useApiHook } from "../hooks/useApi";

export function LiquorComments({ commentId, token }) {
  const { comments, isLoading, error } = useApiHook(
    `/reviews/comments/${commentId}`
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
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <li>No comments yet</li>
        ) : (
          comments?.map((comment) => {
            return (
              <li key={comment.id}>
                <h4>{comment.title}</h4>
                <p>{comment.content}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

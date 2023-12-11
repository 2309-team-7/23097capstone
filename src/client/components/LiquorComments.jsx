import React, { useEffect, useState } from "react";
import { useApiHook } from "../hooks/useApi";
import { AddCommentForm } from "./AddCommentForm";
import { Comment } from "./Comment";

export function LiquorComments({ reviewId, token }) {
  const { data, isLoading, error } = useApiHook(`/reviews/comments/${reviewId}`);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  const removeCommentById = (id) => {
    setComments((comments) => {
      return comments.filter((comment) => comment.id !== id);
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
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <li>No comments yet</li>
        ) : (
          comments?.map((comment) => {
            return <Comment key={comment.id} comment={comment} token={token} removeCommentById={removeCommentById} />;
          })
        )}
      </ul>
      <AddCommentForm token={token} reviewId={reviewId} />
    </div>
  );
}

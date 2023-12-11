import React, { useEffect } from "react";
import { Comment } from "./Comment";
import { useApiHook } from "../hooks/useApi";
export default function MyComments({ comments = [], token }) {
  return (
    <div>
      <h3>My Comments</h3>
      <ul>
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          comments.map((comment) => (
            <Comment comment={comment} token={token} key={comment.id} />
          ))
        )}
      </ul>
    </div>
  );
}

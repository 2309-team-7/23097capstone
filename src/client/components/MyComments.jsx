import React, { useEffect } from "react";
import { Comment } from "./Comment";

export default function MyComments({ comments = [], token }) {
  return (
    <div>
      <h3>My Comments</h3>
      <ul>
        {comments.length === 0 ? (
          <p>Nothing checked out</p>
        ) : (
          comments.map((comment) => (
            <Comment comment={comment} token={token} key={comment.id} />
          ))
        )}
      </ul>
    </div>
  );
}

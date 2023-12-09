import React from "react";
import { RemoveCommentButton } from "./RemoveCommentButton";
import styles from "./Comment.module.css";

export function Comment({ comment, token, removeCommentById }) {
  return (
    <li className={styles.li}>
      <p>{comment}</p>
      <RemoveCommentButton
        token={token}
        commentId={comment.id}
        removeCommentById={removeCommentById}
      />
    </li>
  );
}

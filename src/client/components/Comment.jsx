import React, { Fragment, useState } from "react";
import styles from "./Comment.module.css";
import { RemoveCommentButton } from "./RemoveCommentButton";
import { UpdateCommentForm } from "./UpdateCommentForm";

export function Comment({ comment, token, removeCommentById }) {
  const [mode, setMode] = useState("view");
  return (
    <li className={styles.li}>
      {mode === "view" ? (
        <Fragment>
          <h4>{comment.content}</h4>
          <button onClick={() => setMode("edit")}>Edit</button>
        </Fragment>
      ) : (
        <UpdateCommentForm
          commentId={comment.id}
          token={token}
          setMode={setMode}
          commentContent={comment.content}
        />
      )}
      <RemoveCommentButton
        token={token}
        commentId={comment.id}
        removeCommentById={removeCommentById}
      />
    </li>
  );
}
function CommentUserDetails() {
  return <p>User Details</p>;
}

import React from "react";
import styles from "./Comment.module.css";

export function Comment({ comment, token }) {
  return (
    <li className={styles.li}>
      <p>{comment.text}</p>
    </li>
  );
}

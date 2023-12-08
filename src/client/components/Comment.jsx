import React from "react";

export function Comment({ item: comment, token }) {
  return (
    <li className={styles.li}>
      <p>{comment.text}</p>
    </li>
  );
}

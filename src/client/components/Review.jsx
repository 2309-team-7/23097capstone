import React from "react";

export function Review({ review, token }) {
  return (
    <li className={styles.li}>
      <p>{review.text}</p>
    </li>
  );
}

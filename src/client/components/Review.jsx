import { useState, useEffect } from "react";
import Axios from "axios";
import { RemoveReviewButton } from "./RemoveReviewButton";

export function Review({ review, token, removeReviewById }) {
  return (
    <li className={styles.li}>
      <p>{review}</p>
      <RemoveReviewButton
        token={token}
        reviewId={review.id}
        removeReviewById={removeReviewById}
      />
    </li>
  );
}

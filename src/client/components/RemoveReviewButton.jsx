import React, { useState } from "react";
export function RemoveReviewButton({ token, reviewId, removeReviewById }) {
  const [status, setStatus] = useState("idle");
  const deleteReview = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");

      await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      removeReviewById(reviewId);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <button disabled={status === "loading"} onClick={() => deleteReview()}>
      Delete
    </button>
  );
}

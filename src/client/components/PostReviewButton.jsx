import React, { useState } from "react";
import { useApiHook } from "../hooks/useApi";
export function PostReviewButton({ token, id }) {
  const [status, setStatus] = useState("idle");
  const postReview = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");
      const response = await fetch(`http://localhost:3000/reviews/:${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: false,
        }),
      }).then((response) => response.json());

      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <button disabled={status === "loading"} onClick={() => postReview()}>
      Post Review
    </button>
  );
}

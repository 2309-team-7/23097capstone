import React, { useState } from "react";
import { API } from "./LiquorDetails";

export function PostCommentButton({ token, commentId }) {
  const [status, setStatus] = useState("idle");
  const postComment = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");
      const response = await fetch(`${API}/comments/${commentId}`, {
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
    <button disabled={status === "loading"} onClick={() => postComment()}>
      Post Comment
    </button>
  );
}

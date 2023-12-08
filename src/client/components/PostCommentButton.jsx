import React, { useState } from "react";

export function PostCommentButton({ token, commentsId }) {
  const [status, setStatus] = useState("idle");
  const postComment = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");
      const response = await fetch(`http://localhost:3000/comments/:${commentsId}`, {
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

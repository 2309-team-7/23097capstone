import React, { useState } from "react";
import { API } from "./LiquorDetails";
export function RemoveCommentButton({ token, commentsId, removeCommentById }) {
  const [status, setStatus] = useState("idle");
  const deleteComment = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");

      await fetch(`${API}/comments/:${commentsId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: true,
        }),
      }).then((response) => response.json());
      removeCommentById(commentsId);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <button disabled={status === "loading"} onClick={() => deleteComment()}>
      Delete
    </button>
  );
}

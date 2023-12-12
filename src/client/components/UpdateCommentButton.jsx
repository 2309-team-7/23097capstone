import React, { useState } from "react";

export function UpdateCommentButton({ token, id }) {
  const API = `localhost:3000/api/`;
  const [status, setStatus] = useState("idle");
  const updateCommentButton = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");
      const response = await fetch(`${API}/comments/:${id}`, {
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
    <button
      disabled={status === "loading"}
      onClick={() => updateCommentButton()}
    >
      Edit Comment
    </button>
  );
}

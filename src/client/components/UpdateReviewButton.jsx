import React, { useState } from "react";

export function UpdateReviewButton({ token, id }) {
  const API = `localhost:3000/api/`;
  const [status, setStatus] = useState("idle");
  const updateReviewButton = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");
      const response = await fetch(`${API}/reviews/:${id}`, {
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
      onClick={() => updateReviewButton()}
    >
      Edit Review
    </button>
  );
}

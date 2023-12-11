import React, { useState } from "react";
export function RemoveLiquorButton({ token, liquorId }) {
  const [status, setStatus] = useState("idle");
  const deleteLiquor = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");

      await fetch(`http://localhost:3000/api/items/${liquorId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus("idle");
      // navigate("/");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <button disabled={status === "loading"} onClick={() => deleteLiquor()}>
      Delete
    </button>
  );
}

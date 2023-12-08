import React, { useState } from "react";
export function DeleteLiquorButton({ token, item_id, removeItemById }) {
  const [status, setStatus] = useState("idle");
  const deleteLiquor = async () => {
    if (status === "loading") return;
    try {
      setStatus("loading");

      await fetch(`http://localhost:3000/items/${item_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: true,
        }),
      }).then((response) => response.json());
      removeItemById(item_id);
      setStatus("idle");
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

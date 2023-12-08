import React from "react";
import styles from "./LiquorDetails.module.css";

import { useApiHook } from "../hooks/useApi";

export function LiquorDetails({ token, itemId }) {
  const { data: item, isLoading, error } = useApiHook(`/items/${itemId}`);

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;

  if (!item) {
    return <h3>Item not found!</h3>;
  }

  return (
    <div className={styles.div}>
      <img className={styles.img} src={item.imageUrl} />
      <h1>{item.name}</h1>
      <p className={styles.p}>{item.description}</p>
      <p className={styles.p}>${item.price}</p>
      <p className={styles.p}>ABV: {item.alcohol_content}</p>
      <p className={styles.p}>Category: {item.category}</p>
    </div>
  );
}

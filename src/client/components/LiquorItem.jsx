import React from "react";
import { DeleteLiquorButton } from "./DeleteLiquorButton";
import { LiquorReviews } from "./LiquorReviews";
import styles from "./LiquorItem.module.css";
import { LiquorComments } from "./LiquorComments";

export function LiquorItem({ item, token, removeLiquorById }) {
  return (
    <li className={styles.li}>
      <p>{item.name}</p>
      <DeleteLiquorButton
        token={token}
        liquorId={item.id}
        removeLiquorById={removeLiquorById}
      />
      <LiquorReviews />
      <LiquorComments />
    </li>
  );
}

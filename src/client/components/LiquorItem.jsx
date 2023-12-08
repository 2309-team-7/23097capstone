import React from "react";
import { DeleteLiquorButton } from "./DeleteLiquorButton";
import styles from "./LiquorItem.module.css";

export function LiquorItem({ item, token, removeLiquorById }) {
  return (
    <li className={styles.li}>
      <p>{item.name}</p>
      <DeleteLiquorButton
        token={token}
        liquorId={item.id}
        removeLiquorById={removeLiquorById}
      />
    </li>
  );
}

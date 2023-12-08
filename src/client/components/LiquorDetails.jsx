import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "./LiquorDetails.module.css";

export const API = "http://localhost:5432/2309-7-db/api";

async function fetchLiquorById(item_id) {
  const response = await Axios.get(`${API}/items/:${item_id}`);
  return response;
}
export function LiquorDetails({ token, item_id }) {
  const [itemData, setLiquor] = useState();

  useEffect(() => {
    async function getAndSetLiquor() {
      try {
        const response = await fetchLiquorById(item_id);
        setLiquor(response.data.item);
      } catch (error) {
        console.log(error);
      }
    }
    getAndSetLiquor();
  }, []);

  if (!itemData) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={styles.div}>
      <img className={styles.img} src={itemData.imageUrl} />
      <h1>{itemData.name}</h1>
      <p className={styles.p}>{itemData.description}</p>
      <p className={styles.p}>${itemData.price}</p>
      <p className={styles.p}>ABV: {itemData.alcohol_content}</p>
      <p className={styles.p}>Category: {itemData.category}</p>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { CheckoutBookButton } from "./CheckoutBookButton";
// import styles from "./BookDetails.module.css";

export const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

async function fetchLiquorById(item_id) {
  const response = await Axios.get(`${API}/books/${item_id}`);
  return response;
}
export function LiquorDetails({ token, bookId: item_id }) {
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

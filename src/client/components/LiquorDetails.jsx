import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LiquorDetails.module.css";

import { useApiHook } from "../hooks/useApi";
// const id = id;
async function fetchLiquorById(id) {
  const response = await axios.get(`${useApiHook}/items/${id}`);
  return response;
}
export function LiquorDetails({ id }) {
  const [item, setItem] = useState();

  useEffect(() => {
    async function getAndSetLiquor() {
      try {
        const response = await fetchLiquorById(id);
        setItem(response.data.item);
      } catch (error) {
        console.log(error);
      }
    }
    getAndSetLiquor();
  }, []);

  if (!item) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={styles.div}>
      <h1>{item.name}</h1>
    </div>
  );
}

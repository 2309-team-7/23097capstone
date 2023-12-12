import React, { useDebugValue } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LiquorDetails.module.css";

import { useApiHook } from "../hooks/useApi";
import { useParams } from "react-router";
// const id = id;
// async function fetchLiquorById(id) {
//   const response = await axios.get(`${useApiHook}/items/${id}`);
//   return response;
// }
// export function LiquorDetails({ id }) {
//   const [item, setItem] = useState();

//   useEffect(() => {
//     async function getAndSetLiquor() {
//       try {
//         const response = await fetchLiquorById(id);
//         setItem(response.data.item);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAndSetLiquor();
//   }, []);

//   if (!item) {
//     return <h1>Loading...</h1>;
//   }
//   return (
//     <div className={styles.div}>
//       <h1>{item.name}</h1>
//     </div>
//   );
// }

function LiquorDetails() {
   const [ item, setItem ] = useState({})

   const { id } = useParams()

   useEffect(() => {
    fetchSingleItem()
   }, [])

   async function fetchSingleBottle() {
    let API = `http://localhost:3000/api`

    try {
      const { data } = await axios.get(`${API}/items/${id}`)
      setItem(data.data.item)
    } catch (err) {
        console.error(err.message)
    }
   }
   console.log(item)

   return <div className="details">
    {
      item.id ?
        <div className="single-bottle">
          <h2>{item.name}</h2>
        </div>
      :
      <h1>No item with the id: {id}</h1>
    }
   </div>
}

export default LiquorDetails

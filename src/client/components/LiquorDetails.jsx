// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./LiquorDetails.module.css";
// import { useParams } from "react-router";
// import { useApiHook } from "../hooks/useApi";
// // const id = id;
// async function fetchLiquorById(id) {
//   const response = await axios.get(`${useApiHook}/items/${id}`);
//   return response;
// }
// export default function LiquorDetails({ id }) {
//   const [item, setItem] = useState();
//   const { id } = useParams();
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
import { useState, useEffect } from "react";
import axios from "axios";
import { useApiHook } from "../hooks/useApi";
import { useParams } from "react-router-dom";

function LiquorDetails() {
  const [item, setItem] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetchSingleLiquor();
  }, []);

  async function fetchSingleLiquor() {
    let API = "http://localhost:3000/api/";

    try {
      const { data } = await axios.get(`${API}items/${id}`);
      console.log(data);
      setItem(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  // console.log(item);

  return (
    <div className="details">
      {item.id ? (
        <div className="single-puppy">
          <h2>{item.name}</h2>
        </div>
      ) : (
        <h1>No puppy was found with id: "{id}". Try again.</h1>
      )}
    </div>
  );
}

export default LiquorDetails;

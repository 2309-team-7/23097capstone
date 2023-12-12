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
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiHook } from "../hooks/useApi";
import { LiquorReviews } from "./LiquorReviews";
import { RemoveLiquorButton } from "./RemoveLiquorButton";
import { UpdateLiquorForm } from "./UpdateLiquorForm";

function LiquorDetails({ token = "", user }) {
  const [mode, setMode] = useState("view");

  const { itemId } = useParams();

  const { data: item, isLoading, error } = useApiHook(`/items/${itemId}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="details">
      {item.id ? (
        <div className="single-puppy">
          {!user?.is_admin ? (
            <Fragment>
              <h2>{item.name}</h2>
              <LiquorReviews liquorId={item.id} token={token} />
            </Fragment>
          ) : mode === "view" ? (
            <Fragment>
              <h2>{item.name}</h2>
              <button onClick={() => setMode("edit")}>Edit</button>
              <RemoveLiquorButton token={token} liquorId={item.id} />
              <LiquorReviews liquorId={item.id} token={token} />
            </Fragment>
          ) : (
            <UpdateLiquorForm
              token={token}
              liquorId={item.id}
              setMode={setMode}
              liquorName={item.name}
              liquorDescription={item.description}
              liquorImageUrl={item.imageurl}
              liquorPrice={item.price}
              liquorAlcoholContent={item.alcohol_content}
              liquorCategory={item.category}
            />
          )}
        </div>
      ) : (
        <h1>No item was found with id: "{itemId}". Try again.</h1>
      )}
    </div>
  );
}

export default LiquorDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiHook } from "../hooks/useApi";
import styles from "./LiquorList.module.css";




export default function LiquorList() {
  const { data: items, isLoading, error } = useApiHook("/items");

  useEffect(() => {
    console.log(items);
  }, [items]);

  const [searchText, setSearchText] = useState("");

  // Ensure items is an array before filtering
  const itemsToList = searchText && Array.isArray(items)
    ? items.filter((item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    : items;

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>; // Display error message

  return (
    <div>
      <input
        placeholder="Search..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <ul className={styles.ul}>
        {itemsToList && itemsToList.length > 0 ? (
          itemsToList.map((item) => (
            <li key={item.id}>
              <Link to={`/${item.id}`}> 
                <h3>{item.name}</h3> 
              </Link>
            </li>
          ))
        ) : (
          <h3>No Booze Found!</h3>
        )}
      </ul>
    </div>
  );
}
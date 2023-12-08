import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const API = "http://localhost:3000/api/users/login";

export async function fetchLiquor() {
  const response = await Axios.get(`${API}/items`);
  return response;
}

export default function LiquorList() {
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState();
  useEffect(() => {
    async function getAndSetItems() {
      try {
        const response = await fetchLiquor();
        setItems(response.data.books || []);
      } catch (error) {
        console.log(error);
      }
    }
    getAndSetItems();
  }, []);

  const itemsToList = searchText
    ? items.filter(
        (item) => item?.name?.toLowerCase().includes(searchText.toLowerCase()) // Using optional chaining
      )
    : items;

  return (
    <ul className={styles.ul}>
      {!itemsToList ? (
        <h3>Loading...</h3>
      ) : itemsToList.length ? (
        <>
          <input
            placeholder="Search..."
            onChange={(event) => setSearchText(event.target.value)}
          />
          {itemsToList.map((item) => {
            return (
              <li key={item.id}>
                {" "}
                <Link to={`/${item.id}`}>
                  <h3>{item.title}</h3>
                </Link>
              </li>
            );
          })}
        </>
      ) : (
        <h3>No Booze Found!</h3>
      )}
    </ul>
  );
}

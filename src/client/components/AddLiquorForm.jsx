import React, { useState } from "react";
import styles from "./AddLiquorForm.module.css";

export default function AddLiquorForm({ setToken }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [alcohol_content, setAlcoholContent] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name,
      description,
      imageurl,
      price,
      alcohol_content,
      category,
    });
    try {
      const response = await fetch(`http://localhost:3000/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: {
            name,
            description,
            imageurl,
            price,
            alcohol_content,
            category,
          },
        }),
      });
      const result = await response.json();
      console.log("Signup Result: ", result);
      setToken(result.token);
      setSuccessMessage(result.message);
      setName("");
      setDescription("");
      setImageUrl("");
      setPrice("");
      setAlcoholContent("");
      setCategory("");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.div}>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input className={styles.input} value={name} onChange={(event) => setName(event.target.value)} />
        <label>Description:</label>
        <input className={styles.input} value={description} onChange={(event) => setDescription(event.target.value)} />
        <label>imageUrl:</label>
        <input className={styles.input} required type="url" value={imageurl} onChange={(event) => setImageUrl(event.target.value)} />
        <label>Price:</label>
        <input
          className={styles.input}
          required
          type="number"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <label>Alcohol Content:</label>
        <input
          className={styles.input}
          required
          type="number"
          value={alcohol_content}
          onChange={(event) => {
            setAlcoholContent(event.target.value);
          }}
        />
        <label>Category:</label>
        <input
          className={styles.input}
          required
          type="text"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

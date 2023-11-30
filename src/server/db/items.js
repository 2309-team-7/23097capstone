const { client } = require('../../../../../unit4.JuiceBox/Unit4.Juicebox.Starter/db');
const db = require('./client')

const getAllItems = async() => {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM items`);

    return rows;
  } catch (err) {
      throw err
  }
}

const createItem = async({ name, description, imageUrl, price, alcoholContent, tags}) => {
  try {
    const { rows: [ item ] } = await db.query(`
    INSERT INTO items(name, description, imageUrl, price, alcoholContent, tags)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`, [name, description, imageUrl, price, alcoholContent, tags]);

    return item;
  } catch (err) {
      throw err;
  }
}




module.exports = {
  getAllItems,
  createItem,
};
const db = require('./client')

const getAllItems = async() => {
  try {
    const { rows } = await db.query(`
    SELECT *
    FROM items`);

    return rows;
  } catch (err) {
      throw err
  }
}

const createItem = async({ name, description, imageUrl, price, alcoholContent, category}) => {
  try {
    const { rows: [ item ] } = await db.query(`
    INSERT INTO items(name, description, imageUrl, price, alcoholContent, category)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`, [name, description, imageUrl, price, alcoholContent, category]);

    return item;
  } catch (err) {
      throw err;
  }
}




module.exports = {
  getAllItems,
  createItem,
};
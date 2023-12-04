const db = require('./client')
const utils = require('./utils')

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

const getItem = async(id) => {
  try {
    const { rows: [item] } = await db.query(`
    SELECT * FROM items WHERE id=$1`, [id]);
    return item;
  } catch(err) {
      throw err
  }
}

const getAllItemReviews = async(item_id) => {
  try {
    const { rows } = await db.query(`
    SELECT *
    FROM reviews
    WHERE item_id=$1`,[item_id]);

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

const updateItem = async(id, fields = {} ) => {
  const setString = Object.keys(fields).map((key,index) => `'${key}'=$${index + 1}`).join(', ');

  try {
    if ( setString.length > 0) {
      await db.query(`
      UPDATE items SET ${ setString } WHERE id=${id} RETURNING *;
      `, Object.values(fields));
    }
    return await getItem(id)
  } catch (err) {
      throw err
  }
}

const deleteItem = async(id) => {
  try {
    const { rows: [item] } = await db.query(`
    DELETE FROM items WHERE id = ${id} RETURNING *;`)
    return item;
  } catch (err) {
      throw err
  }
}




module.exports = {
  getAllItems,
  getItem,
  getAllItemReviews,
  createItem,
  updateItem,
  deleteItem
};
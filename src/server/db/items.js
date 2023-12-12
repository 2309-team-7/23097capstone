const db = require("./client");
const utils = require("./utils");

const getAllItems = async () => {
  try {
    const { rows } = await db.query(`
    SELECT *
    FROM items`);

    return rows;
  } catch (err) {
    throw err;
  }
};

const getItem = async (id) => {
  try {
    const {
      rows: [item]} = await db.query(
      `
    SELECT * 
    FROM items 
    WHERE id = $1`,
      [id]
    );
    return item;
  } catch (err) {
    throw err;
  }
};

const getAllItemReviews = async (id) => {
  try {
    const { rows } = await db.query(
      `
    SELECT *
    FROM reviews
    WHERE item_id = $1`,
      [id]
    );

    return rows;
  } catch (err) {
    throw err;
  }
};

const createItem = async ({ name, description, imageUrl, price, alcohol_content, category }) => {
  try {
    const {
      rows: [item],
    } = await db.query(
      `
    INSERT INTO items(name, description, imageUrl, price, alcohol_content, category)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
      [name, description, imageUrl, price, alcohol_content, category]
    );

    return item;
  } catch (err) {
    throw err;
  }
};

const updateItem = async ({ id, ...fields }) => {
  try {
    const itemUpdates = {};
    for (let column in fields) {
      if (fields[column] !== undefined) itemUpdates[column] = fields[column];
    }
    let item;
    if (utils.dbFields(itemUpdates).insert.length > 0) {
      const { rows } = await db.query(
        `
    UPDATE items
    SET ${utils.dbFields(itemUpdates).insert}
    WHERE id=${id}
    RETURNING *;
    `,
        Object.values(itemUpdates)
      );
      item = rows[0];
    }
    return item;
  } catch (err) {
    throw err;
  }
};

const deleteItem = async (id) => {
  try {
    const {
      rows: [item],
    } = await db.query(`
    DELETE FROM items WHERE id = ${id} RETURNING *;`);
    return item;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllItems,
  getItem,
  getAllItemReviews,
  createItem,
  updateItem,
  deleteItem,
};

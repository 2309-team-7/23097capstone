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
      rows: [item],
    } = await db.query(
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
    SELECT items.id, users.name, reviews.content, reviews.rating
    FROM items, users, reviews
    WHERE items.id = $1 AND users.id = reviews.user_id;`,
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
  // @TODO: cascade deletes!
  try {
    const {
      rows: [item],
    } = await db.query(`
    DELETE FROM items WHERE id = ${id} RETURNING *;`);
    return item;
  } catch (err) {
    console.log(err);
    throw err;
    //     error: update or delete on table "items" violates foreign key constraint "reviews_item_id_fkey" on table "reviews"
    //     at C:\Users\Sean\source\repos\23097capstone\node_modules\pg\lib\client.js:526:17
    //     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    //     at async deleteItem (C:\Users\Sean\source\repos\23097capstone\src\server\db\items.js:96:9)
    //     at async C:\Users\Sean\source\repos\23097capstone\src\server\api\items.js:120:7 {
    //   length: 271,
    //   severity: 'ERROR',
    //   code: '23503',
    //   detail: 'Key (id)=(2) is still referenced from table "reviews".',
    //   hint: undefined,
    //   position: undefined,
    //   internalPosition: undefined,
    //   internalQuery: undefined,
    //   where: undefined,
    //   schema: 'public',
    //   table: 'reviews',
    //   column: undefined,
    //   dataType: undefined,
    //   constraint: 'reviews_item_id_fkey',
    //   file: 'ri_triggers.c',
    //   line: '2609',
    //   routine: 'ri_ReportViolation'
    // }
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

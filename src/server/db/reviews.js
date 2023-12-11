const db = require("./client");
const utils = require("./utils");

const getReview = async (id) => {
  try {
    const {
      rows: [review],
    } = await db.query(
      `
    SELECT * 
    FROM reviews
    WHERE id = $1`,
      [id]
    );

    return review;
  } catch (err) {
    throw err;
  }
};

const getReviewedItems = async () => {
  try {
    const { rows: items } = await db.query(`
    SELECT DISTINCT item_id
    FROM reviews;`);

    return items;
  } catch (err) {
    throw err;
  }
};

const createReview = async ({ item_id, user_id, content, rating }) => {
  console.log({ item_id, user_id, content, rating });
  try {
    const {
      rows: [review],
    } = await db.query(
      `
    INSERT INTO reviews(item_id, user_id, content, rating)
    VALUES($1, $2, $3, $4)
    RETURNING *`,
      [item_id, user_id, content, rating]
    );

    return review;
  } catch (err) {
    throw err;
  }
};
// PATCH -  /api/reviews/:id
const updateReview = async ({ id, ...fields }) => {
  try {
    const reviewUpdates = {};
    for (let column in fields) {
      if (fields[column] !== undefined) reviewUpdates[column] = fields[column];
    }
    let review;
    if (utils.dbFields(reviewUpdates).insert.length > 0) {
      const { rows } = await db.query(
        `
    UPDATE reviews
    SET ${utils.dbFields(reviewUpdates).insert}
    WHERE id=${id}
    RETURNING *;
    `,
        Object.values(reviewUpdates)
      );
      review = rows[0];
    }
    return review;
  } catch (err) {
    throw err;
  }
};

// DELETE - /api/reviews/:id
const deleteReview = async (id) => {
  console.log("deleting");
  // @TODO: delete the review
  // you need to cascasde the delete to the comments table!!! See error below
  try {
    const {
      rows: [review],
    } = await db.query(`
      DELETE 
      FROM reviews 
      WHERE id=${id}`);
    console.log({ review });
    return review;
  } catch (err) {
    console.log({ err });
    //     {
    //   err: error: update or delete on table "reviews" violates foreign key constraint "comments_review_id_fkey" on table "comments"
    //       at C:\Users\Sean\source\repos\23097capstone\node_modules\pg\lib\client.js:526:17
    //       at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    //       at async deleteReview (C:\Users\Sean\source\repos\23097capstone\src\server\db\reviews.js:84:9)
    //       at async C:\Users\Sean\source\repos\23097capstone\src\server\api\reviews.js:80:29 {
    //     length: 283,
    //     severity: 'ERROR',
    //     code: '23503',
    //     detail: 'Key (id)=(10) is still referenced from table "comments".',
    //     hint: undefined,
    //     position: undefined,
    //     internalPosition: undefined,
    //     internalQuery: undefined,
    //     where: undefined,
    //     schema: 'public',
    //     table: 'comments',
    //     column: undefined,
    //     dataType: undefined,
    //     constraint: 'comments_review_id_fkey',
    //     file: 'ri_triggers.c',
    //     line: '2609',
    //     routine: 'ri_ReportViolation'
    //   }
    // }
    throw err;
  }
};

module.exports = {
  getReview,
  getReviewedItems,
  createReview,
  updateReview,
  deleteReview,
};

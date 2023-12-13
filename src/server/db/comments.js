const db = require("./client");
const utils = require("./utils");

const getCommentById = async (id) => {
  try {
    const {rows: [comment] }  = await db.query(`
    SELECT users.name, comments.content
    FROM users, comments
    WHERE users.id = comments.user_id AND comments.id = $1`,[id]);
    return comment;
  } catch (err) {
    throw err;
  }
};

const getAllCommentsForReview = async (review_id) => {
  try {
    const { rows } = await db.query(`
    SELECT reviews.id,users.name,comments.content
    FROM reviews, users, comments
    WHERE reviews.id = $1 AND users.id = comments.user_id;`,
      [review_id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

const getAllCommentsByUser = async (user_id) => {
  try {
    const { rows } = await db.query(
      `
    SELECT comments.content
    FROM comments
    WHERE user_id = $1`,
      [user_id]
    );

    return rows;
  } catch (err) {
    throw err;
  }
};

const createComment = async ({ review_id, user_id, content }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
    INSERT INTO comments(review_id, user_id, content)
    VALUES($1, $2, $3)
    RETURNING *`,
      [review_id, user_id, content]
    );

    return comment;
  } catch (err) {
    throw err;
  }
};

const updateComment = async ({ id, ...fields }) => {
  try {
    const commentUpdates = {};
    for (let column in fields) {
      if (fields[column] !== undefined) commentUpdates[column] = fields[column];
    }
    let comment;
    if (utils.dbFields(commentUpdates).insert.length > 0) {
      const { rows } = await db.query(
        `
    UPDATE comments
    SET ${utils.dbFields(commentUpdates).insert}
    WHERE id=${id}
    RETURNING *;
    `,
        Object.values(commentUpdates)
      );
      comment = rows[0];
    }
    return comment;
  } catch (err) {
    throw err;
  }
};

const deleteComment = async (id) => {
  console.log(id);
  try {
    const {
      rows: [comment],
    } = await db.query(`
    DELETE FROM comments WHERE id = ${id} RETURNING *;`);
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getCommentById,
  getAllCommentsForReview,
  getAllCommentsByUser,
  createComment,
  updateComment,
  deleteComment,
};

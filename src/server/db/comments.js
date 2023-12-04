const db = require('./client')
const utils = require('./utils')

const getAllCommentsForReview = async(review_id) => {
  try {
    const { rows: [reviewComments] } = await db.query(`
    SELECT *
    FROM comments
    WHERE review_id = $1`, [review_id]);
    
    return reviewComments;
  } catch (err) {
      throw err
  }
}

const getAllCommentsByUser = async(user_id) => {
  try {
    const { rows } = await db.query(`
    SELECT *
    FROM comments
    WHERE user_id = $1`, [user_id]);

    return rows;
  } catch (err) {
      throw err
  }
}

const createComment = async({ review_id, user_id, content }) => {
  try {
    const { rows: [ comment ] } = await db.query(`
    INSERT INTO comments(review_id, user_id, content)
    VALUES($1, $2, $3)
    RETURNING *`, [review_id, user_id, content]);
  
    return comment;
  } catch (err) {
      throw err;
  }
}

const updateComment = async(id, user_id, fields ={}) => {

  const setString = Object.keys(fields).map((key, index) => `'${key}'=$${index + 1}`).join(', ');
  if ( setString === 0) {
    return;
  }
  try {
    const values = [...Object.values(fields), id, user_id];
    const { rows: [ comment ]} = await db.query(`
    UPDATE comments SET ${setString}, userId=$${Object.keys(fields).length + 1}
    WHERE id=$${Object.keys(fields).length +2}
    RETURNING *;
    `, values);
    return comment;
  } catch (err) {
      throw err
  }
}

const deleteComment = async(id) => {
  try {
    const { rows: [ comment ] } = await db.query(`
    DELETE FROM comments WHERE id = ${id} RETURNING *;`);
      return comment;
  } catch (error) {
      throw error
  }
}


module.exports = {
  getAllCommentsForReview,
  getAllCommentsByUser,
  createComment,
  updateComment,
  deleteComment
};
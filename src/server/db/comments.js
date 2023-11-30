const db = require('./client')

const createComment = async({ reviewId, userId, content }) => {
  try {
    const { rows: [ comment ] } = await db.query(`
    INSERT INTO comments(reviewId, userId, content)
    VALUES($1, $2, $3)
    RETURNING *`, [reviewId, userId, content]);
  
    return comment;
  } catch (err) {
      throw err;
  }
}


module.exports = {
  createComment,
};
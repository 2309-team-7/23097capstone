const db = require('./client')
const utils = require('./utils')

const createComment = async({ reviewId, userId, content }) => {
  try {
    const { rows: [ comment ] } = await db.query(`
    INSERT INTO comments("reviewId", "userId", content)
    VALUES($1, $2, $3)
    RETURNING *`, [reviewId, userId, content]);
  
    return comment;
  } catch (err) {
      throw err;
  }
}

const updateComment = async(id, userId, fields ={}) => {

  const setString = Object.keys(fields).map((key, index) => `'${key}'=$${index + 1}`).join(', ');
  if ( setString === 0) {
    return;
  }
  try {
    const values = [...Object.values(fields), id, userId];
    const { rows: [ comment ]} = await db.query(`
    UPDATE comments SET ${setString}, "userId"=$${Object.keys(fields).length + 1}
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
  createComment,
  updateComment,
  deleteComment
};
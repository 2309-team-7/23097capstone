const db = require('./client')
const utils = require('./utils')

const createReview = async({ item_id, user_id, content, rating }) => {
  try {
    const { rows: [ review ] } = await db.query(`
    INSERT INTO reviews(item_id, user_id, content, rating)
    VALUES($1, $2, $3, $4)
    RETURNING *`, [item_id, user_id, content, rating])

    return review;
  } catch (err) {
      throw err;
  }
}
// PUT -  /api/reviews/:id
const updateReview = async(id, fields = {}) => {
  const setString = Object.keys(fields).map((key,index) => `'${key}'=$${index + 1}`).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [review] } = await db.query(`
    UPDATE reviews SET ${setString} WHERE id=${id} RETURNING *
   `, Object.values(fields));
    return review;
  } catch (err) {
      throw err
  }
}

// DELETE - /api/reviews/:id
const deleteReview = async(id) => {
  try {
    const { rows: [review] } = await db.query(`
      DELETE FROM reviews WHERE id=${id}`)
      return review;
  } catch (err) {
      throw err
  }
}


module.exports = {
  createReview,
  updateReview,
  deleteReview
};
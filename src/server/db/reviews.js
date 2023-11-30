const db = require('./client')

const createReview = async({ itemId, userId, content, rating }) => {
  try {
    const { rows: [ review ] } = await db.query(`
    INSERT INTO reviews("itemId", "userId", content, rating)
    VALUES($1, $2, $3, $4)
    RETURNING *`, [itemId, userId, content, rating])

    return review;
  } catch (err) {
      throw err;
  }
}


module.exports = {
  createReview,
};
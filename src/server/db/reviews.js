const db = require('./client')
const utils = require('./utils')

const getReview = async(id) => {
  try {
    const { rows: [review] } = await db.query(`
    SELECT * 
    FROM reviews
    WHERE id = $1`, [id])

    return review;
  } catch(err) {
      throw err
  }
}

const getReviewedItems = async() => {
  try {
    const { rows: items } = await db.query(`
    SELECT DISTINCT item_id
    FROM reviews;`)

    return items
  } catch(err) {
      throw err
  }
}

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
// PATCH -  /api/reviews/:id
const updateReview = async({id, ...fields}) => {
  try {
    const reviewUpdates = {};
   for ( let column in fields) {
    if(fields[column] !== undefined) reviewUpdates[column] = fields[column];
   }
   let review;
   if ( utils.dbFields(reviewUpdates).insert.length > 0) {
    const { rows } = await db.query(`
    UPDATE reviews
    SET ${ utils.dbFields(reviewUpdates).insert }
    WHERE id=${id}
    RETURNING *;
    `, Object.values(reviewUpdates));
    review = rows[0];
   }
   return review;
  } catch (err) {
      throw err
  }
}

// DELETE - /api/reviews/:id
const deleteReview = async(id) => {
  try {
    const { rows: [review] } = await db.query(`
      DELETE 
      FROM reviews 
      WHERE id=${id}`)
      return review;
  } catch (err) {
      throw err
  }
}


module.exports = {
  getReview,
  getReviewedItems,
  createReview,
  updateReview,
  deleteReview
};
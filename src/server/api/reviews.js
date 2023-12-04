const express = require('express');
const reviewsRouter = express.Router();

const {
  createReview,
  updateReview,
  getAllCommentsForReview,
  deleteReview
} = require('../db')

//GET - api/reviews/comments/:id
reviewsRouter.get('/comments/:id', async(req, res, next) => {
  try {
    const reviewComments = await getAllCommentsForReview(req.params.id);
    res.send(reviewComments)
  } catch (err) {
      next(err)
  }
})


module.exports = reviewsRouter;
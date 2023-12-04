const express = require('express');
const reviewsRouter = express.Router();
const { requireUser } = require('./utils')
const JWT_SECRET = process.env;

const {
  getReview,
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
});

//POST - /api/reviews/ - create new review *requires user*
reviewsRouter.post('/', async(req, res, next) => {
  const { item_id, user_id, content, rating } = req.body;

  const reviewData = {};
  try {
    reviewData.item_id = item_id;
    reviewData.user_id = user_id;
    reviewData.content = content;
    reviewData.rating = rating;

    const review = await createReview(reviewData)

    if(review) {
      res.send(review);
    } else {
      next({
        name: 'ReviewCreationError',
        message: 'There was an error creating the review.'
      })
    }
  } catch ({name, message}) {
      next({ name, message});
  }
});

//PATCH - /api/reviews/:id - update review
reviewsRouter.patch('/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    const presentReview = await getReview(id);
    if(!presentReview) {
      next({
        name: "ReviewNotFound",
        message: "There was no review with that id."
      })
    } else {
      const { content, rating } = req.body;
      const updatedReview = await updateReview({id: id, content, rating})
      if(updatedReview) {
        res.send(updatedReview);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your review.'
        })
      }
    }
  } catch(err) {
    next(err)
  }
});

//DELETE - /api/reviews/:id 
reviewsRouter.delete('/:id', requireUser, async(req, res, next) => {
  try {
    const { id } = req.params;
    const reviewToDelete = await getReview(id);
    if(!reviewToDelete) {
      next({
        name: 'NothingToDelete',
        message: `No review with the Id: ${id}`
      })
    } else {
      const deletedReview = await deleteReview(id);
      res.send({ success: true, ...deleteReview})
    }
  } catch (err) {
      next(err)
  }
})


module.exports = reviewsRouter;
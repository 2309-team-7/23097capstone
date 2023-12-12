const express = require("express");
const reviewsRouter = express.Router();
const utils = require("./utils");
const JWT_SECRET = process.env;

const { getReview, createReview, updateReview, getAllCommentsForReview, deleteReview } = require("../db");

//GET - api/reviews/comments/:id
reviewsRouter.get("/comments/:id", async (req, res, next) => {
  try {
    const reviewComments = (await getAllCommentsForReview(req.params.id)) || [];
    res.send(reviewComments);
  } catch (err) {
    next(err);
  }
});

//POST - /api/reviews/ -
reviewsRouter.post("/", utils.requireUser, async (req, res, next) => {
  const { review } = req.body;

  try {
    review.user_id = req.user.id;

    const result = await createReview(review);

    if (result) {
      res.send(result);
    } else {
      next({
        name: "ReviewCreationError",
        message: "There was an error creating the review.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH - /api/reviews/:id - update review
reviewsRouter.patch("/:id", utils.requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const presentReview = await getReview(id);
    if (!presentReview) {
      next({
        name: "ReviewNotFound",
        message: "There was no review with that id.",
      });
    } else {
      const { review } = req.body;
      const updatedReview = await updateReview(review);
      if (updatedReview) {
        res.send(updatedReview);
      } else {
        next({
          name: "FailedToUpdate",
          message: "There was an error updating your review.",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

//DELETE - /api/reviews/:id
reviewsRouter.delete("/:id", utils.requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const reviewToDelete = await getReview(id);
    if (!reviewToDelete) {
      console.log("No review with that id");
      next({
        name: "NothingToDelete",
        message: `No review with the Id: ${id}`,
      });
    } else {
      const deletedReview = await deleteReview(id);
      console.log(deletedReview);
      res.send({ success: true });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = reviewsRouter;

const express = require("express");
const commentsRouter = express.Router();
const utils = require("./utils");

const {
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../db");

//GET - /api/comments/:id - get comment by Id
commentsRouter.get("/:id", async (req, res, next) => {
  try {
    const currentComment = await getCommentById(req.params.id);
    res.send(currentComment);
  } catch (err) {
    next(err);
  }
});

//POST - /api/comments/ - create new comment
commentsRouter.post("/", utils.requireUser, async (req, res, next) => {
  const { comment } = req.body;

  try {
    comment.user_id = req.user.id;

    const result = await createComment(comment);

    if (result) {
      res.send(result);
    } else {
      next({
        name: "FailedToCreateComment",
        message: "Error creating comment.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH - /api/comments/:id - update comments
commentsRouter.patch("/:id", utils.requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentComment = await getCommentById(id);
    if (!currentComment) {
      next({
        name: "CommentNotFound",
        message: "There are no comments with that id.",
      });
    } else {
      const { comment } = req.body;
      const updatedComment = await updateComment(comment);
      if (updatedComment) {
        res.send(updatedComment);
      } else {
        next({
          name: "FailedToUpdate",
          message: "There was an error updating the comment.",
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//DELETE - /api/comments/:id  - Delete comment
commentsRouter.delete("/:id", utils.requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const commentToDelete = await getCommentById(id);
    if (!commentToDelete) {
      console.log("comment not found");
      next({
        name: "Not Found",
        message: "No comment with that Id.",
      });
    } else {
      await deleteComment(id);
      res.send({ success: true });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = commentsRouter;

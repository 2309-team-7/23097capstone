const express = require('express');
const commentsRouter = express.Router();
const utils = require('./utils')

const {
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} = require('../db')

//GET - /api/comments/:id - get comment by Id
commentsRouter.get('/:id', async(req, res, next) => {
  try {
    const currentComment = await getCommentById(req.params.id);
    res.send(currentComment)
  } catch(err) {
      next(err)
  }
});

//POST - /api/comments/ - create new comment 
commentsRouter.post('/', utils.requireUser, async(req, res, next) => {
  const { content } = req.body;

  const commentData = {};
  try {
    commentData.content = content;

    const comment = await createComment(commentData);

    if(comment) {
      res.send(comment);
    } else {
      next({
        name: 'FailedToCreateComment',
        message: 'Error creating comment.'
      })
    }
    } catch ({name, message}) {
        next({name, message})
    }
});

//PATCH - /api/comments/:id - update comments
commentsRouter.patch('/:id', utils.requireUser, async(req, res, next) => {
  try {
    const { id } = req.params;
    const currentComment = await getCommentById(id);
    if(!currentComment) {
      next({
        name: "CommentNotFound",
        message: "There are no comments with that id."
      })
    } else {
      const { content } = req.body;
      const updatedComment = await updateComment({id: id, content})
      if(updatedComment) {
        res.send(updatedComment);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating the comment.'
        })
      }
    }
  } catch({name, message}) {
    next({name, message})
  }
});

//DELETE - /api/comments/:id  - Delete comment
commentsRouter.delete('/:id', utils.requireUser, async(req, res, next) => {
  try {
    const { id } = req.params;
    const commentToDelete = await getCommentById(id);
    if(!commentToDelete) {
      next({
        name: 'Not Found',
        message: 'No comment with that Id.'
      })
    } else {
      const deletedComment = await deleteComment(id);
      res.send({success: true, ...deleteComment})
    }
  } catch (err) {
      next(err)
  }
});

module.exports = commentsRouter;
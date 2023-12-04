const express = require('express');
const commentsRouter = express.Router();

const {
  createComment,
  updateComment,
  deleteComment
} = require('../db')



module.exports = commentsRouter;
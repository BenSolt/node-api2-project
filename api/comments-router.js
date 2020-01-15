const express = require('express');

const Posts = require('../data/db');

const router = express.Router();


// FIND COMMENTS  (GET)
router.get('/posts/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'blogpost not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the blogpost',
      });
    });
});


// FIND COMMENT BY ID (GET)
router.get('/posts/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The comments information could not be retrieved',
      });
    });
});

// INSERT COMMENT (ADD)
router.post('/posts/:id/comments', (req, res) => {
  const postData = req.body;
  if (!req.params.id){
    res.status(400).json({
    message: "The post with the specified ID does not exist."})
  }
  if (!postData.text){
    res.status(400).json({
    message: "Please provide text for the comment"})
  }
    Posts.insertComment(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

module.exports = router;
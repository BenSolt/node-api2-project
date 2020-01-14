const express = require('express');

const Posts = require('../data/db');

const router = express.Router();


// FIND COMMENTS  (GET)
router.get('/api/posts/:id/comments', (req, res) => {
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
router.get('/api/posts/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
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
        message: 'Error retrieving the blogpost comments',
      });
    });
});

// INSERT COMMENT (ADD)
router.post('/api/posts/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the blogpost',
      });
    });
});

module.exports = router;
const express = require('express');

const Posts = require('../data/db');

const router = express.Router();


//GET POSTS
router.get('/posts', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the blogpost',
      });
    });
});

//GET POST BY ID (GET)
router.get('/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be retrieved',
      });
    });
});

//ADD A POST (POST)
router.post('/posts', (req, res) => {
  const postData = req.body;
    if (!postData.title || !postData.contents ){
      res.status(400).json({
      errorMessage: "Please provide title and contents for the post."})
    }
    Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"});
    });
});

//EDIT A POST (PUT)
router.put('/posts/:id', (req, res) => {
  const changes = req.body;
  if (!postData.title || !postData.contents ){
    res.status(400).json({
    errorMessage: "Please provide title and contents for the post."})
  }
  Posts.update(req.params.id, changes)
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
        message: 'The post information could not be modified',
      });
    });
});

// DELETE POST (DELETE)
router.delete('/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The blogpost has been deleted' });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed',
      });
    });
});



module.exports = router;


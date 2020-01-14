const express = require('express');

const Posts = require('../data/db');

const router = express.Router();


//GET POSTS
router.get('/api/posts', (req, res) => {
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
router.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
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

//ADD A POST (POST)
router.post('/api/posts', (req, res) => {
    Posts.insert(req.body)
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

//EDIT A POST (PUT)
router.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The blogpost could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the blogpost',
      });
    });
});

// DELETE POST (DELETE)
router.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The blogpost has been nuked' });
      } else {
        res.status(404).json({ message: 'The blogpost could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the blogpost',
      });
    });
});



module.exports = router;


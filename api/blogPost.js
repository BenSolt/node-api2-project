const express = require('express');

const Posts = require('../data/db');

const router = express.Router();



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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

// FIND COMMENT BY ID
router.delete('/:id', (req, res) => {
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

// FIND COMMENTS
router.get('/:id', (req, res) => {
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


// FIND COMMENT BY ID
router.get('/:id', (req, res) => {
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
        message: 'Error retrieving the blogpost',
      });
    });
});

// INSERT COMMENT
router.post('/', (req, res) => {
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


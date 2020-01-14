const express = require('express');

const blogRouter = require('../api/blogPost-router');
const commentsRouter = require('../api/comments-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(
    `<h2>PROJECT API</h>
  `);
});

// requests to routes that begin with /api/hubs
server.use('/api', blogRouter);
server.use('/api', commentsRouter);

module.exports = server;
const express = require('express');

const hubsRouter = require('../hubs/hubs-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(
    `<h2>PROJECT API</h>
  `);
});

// requests to routes that begin with /api/hubs
server.use('/api/hubs', hubsRouter);
server.use('/api/users', usersRouter);

module.exports = server;
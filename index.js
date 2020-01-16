const server = require('./api/server');

//added for heroku
const port = process.env.PORT || 4000;
// port on line 7 and ${port}

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:4000${port} ***\n`);
});

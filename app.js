process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configure express
const express = require('express');
const app = express();

app.use(express.static('dist'));

// Start server
const ip = process.env.IP || undefined;
const port = process.env.PORT || 8080;

const server = require('http').createServer(app);
server.listen(port, ip, function () {
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});

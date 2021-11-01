const http = require('http');

const { routeHandler } = require('./routes');

console.log({ routeHandler });

const server = http.createServer(routeHandler);

server.listen(4000);

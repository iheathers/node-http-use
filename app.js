// CORE IMPORTS AT TOP
const http = require('http');

// THIRD PARTY IMPORTS AT SECOND
const express = require('express');

// LOCAL IMPORTS

// const { routeHandler } = require('./routes');

const app = express();

const server = http.createServer(app);

server.listen(5000);

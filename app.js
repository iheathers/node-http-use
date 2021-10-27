const http = require('http');

const server = http.createServer((req, res) => {
  //   console.log({ req });

  console.log('URL: ', req.url);
  console.log('METHOD:', req.method);
  console.log('HEADERS: ', req.headers);
});

server.listen(4000);

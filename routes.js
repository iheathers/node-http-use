const fs = require('fs');

const routeHandler = (req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === '/') {
    res.setHeader('Content-type', 'text/html');
    res.write(`
        <form method="POST" action="/message">
        <input name="message" />
        <input type="submit" value="submit" />
        </form>
        `);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    console.log('POST handling');

    let body = '';

    req.on('data', (chunk) => {
      console.log({ chunk });

      body += chunk;
    });

    return req.on('end', () => {
      console.log({ body });
      fs.writeFile('message.txt', body, (err) => {
        if (err) {
          throw Error();
        }
        console.log('File message.txt has been created.');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<h1>Hello</h1>');
  res.write('<h1>dear</h1>');
  res.write('<h1></h1>');
  res.write('<h1>you been pulling me closer</h1>');
  res.write('<h1>Hello</h1>');
  res.end();
};

module.exports = {
  routeHandler,
};

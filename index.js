const http = require('http');

const port = 3001;

let products = [
  { id: 1, name: "laptop", price: 3222 },
  { id: 2, name: "Webcap", price: 1233 },
  { id: 3, name: "Smart phone", price: 1233 }
];

const handelServserError = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.write(message);
  res.end();
};

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Hello, World!\n');
      res.end();
    } catch (cerror) {
      handelServserError(res, 500, 'Not Found');
    }
  } 
  else if (req.method === 'POST' && req.url === '/') {
     
    try {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Products is created Successfuly!\n');
      res.end();
    } catch (cerror) {
      handelServserError(res, 500, 'Not Found');
    }
  } 

  else if (req.method === 'GET' && req.url === '/products') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(products));
      res.end();
    } catch (cerror) {
      handelServserError(res, 500, 'Not Found');
    }
  } 
  if (req.method === 'GET' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
      const id = req.url?.split('/')[2];
      const product = products.find((product) => product.id == id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end();
    } catch (cerror) {
      handelServserError(res, 500, 'Not Found');
    }
  } 

});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
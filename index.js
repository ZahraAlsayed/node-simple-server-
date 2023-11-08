const { error } = require('console');
const http = require('http');
const { parse } = require('querystring');
const fs = require('fs/promises');

const port = 3001;


const handelServserError = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message : message,
  }));
};

const handelSuccessRespos = (res ,statusCode,message ,payload={}) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: message,
    payload: payload,
    
      }));
};

const server = http.createServer(async(req, res) => {
  console.log(req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/') {
    try {
     handelSuccessRespos(res,200, "Hello, World!")
    } catch (cerror) {
      handelServserError(res, 500, error.message);
    }
  } else if (req.method === 'POST' && req.url === '/') {
      try {
        let body = '';
        req.on('data', (chunk) => {
          body = body + chunk;
        })
        req.on('end', (chunk) => {
          body = body + chunk;
          console.log(parse(body));
        })
     
        handelSuccessRespos(res, 201, "Hello, World!");
      } catch (cerror) {
        handelServserError(res, 500, error.message);
      }
    
  }
  
  else if (req.method === 'GET' && req.url === '/products') {
    const products =JSON.parse( await fs.readFile('products.json','utf-8'))
    try {
      handelSuccessRespos(res,200, "Get All products" , products)
    } catch (cerror) {
      handelServserError(res, 500, error.message);
    }
  } 
  else if (req.method === 'GET' && req.url.match(/\/products\/([0-9]+)/)) {
    try {
       const products =JSON.parse( await fs.readFile('products.json','utf-8'))
      const id = req.url?.split('/')[2];
      const product = products.find((product) => product.id == id);
     handelSuccessRespos(res,200, "Get one products information",product)
    } catch (cerror) {
      handelServserError(res, 500, error.message);
    }
  } 
   else if (req.method === 'POST' && req.url === '/products') {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body = body + chunk;
      });
      req.on('end', async() => {
        const data = parse(body);
        const newProduct = {
          id: new Date().getTime().toString(),
          name:data.name,
          price:data.price,
          
        };
        //get exisiteing data
        const exisiteingProducts = JSON.parse(await fs.readFile('products.json', 'utf-8'))
        // add the new product
        exisiteingProducts.push(newProduct);
        // write the file
        await fs.writeFile('products.json',JSON.stringify(exisiteingProducts))

        handelSuccessRespos(res, 201, "the product created sucessfuly");
      });
      
    } catch (cerror) {
      handelServserError(res, 500, error.message);
    }
  } 

});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
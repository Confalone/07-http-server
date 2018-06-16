'use strict';

const http = require('http');
const parser = require('./lib/parser');
const cowsay = require('cowsay');

function makeHtmlResponse(res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.statusMessage = 'OK';
}
const requestHandler = (req, res) => {
  parser(req)
    .then(req => {
      if (req.method === 'GET' && req.url.pathname === '/') {
        makeHtmlResponse(res);


        let markup = `<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
           <header>
             <nav>
               <ul> 
                 <li><a href="/cowsay">cowsay</a></li>
               </ul>
             </nav>
           </header>
           <main>
             HTTP Servers! Cowsay!
           </main>
          </body>
        </html>`;

        res.write(markup);

        res.end();
        return;
      
      } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {

        makeHtmlResponse(res);
        let message = cowsay.say({text: 'I need something good to say'});
        if(req.url.query.text) message = cowsay.say(req.url.query);
        let markup = `
                <!DOCTYPE html>
                  <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <pre>${message}</pre>
          </body>
        </html>`;
        
        res.write(markup);
        
        res.end();
        
        return;
      } else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
  

        if(req.body.text === undefined) {
          res.setHeader('Content-Type', 'text/json');
          res.statusCode = 400;
          res.statusMessage = 'error: invalid request: body required';
          res.end();
          return;
        }
        
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'Alrighty then';
        res.body = cowsay.say({text: `${req.body.text}`});
        res.write(`{"content": "${req.body.text}"}`);
        res.end();
        return;

      } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }
    }) 
    .catch(err => {
      res.writeHead(500);
      res.write(err);
      res.end();
    });
};
    


const app = http.createServer(requestHandler);

const server = module.exports = {};
server.start = (port, callback) => {
  app.listen(port, callback);
};

server.stop = (callback) => {
  console.log('Server is stopped');
  app.close(callback);
};
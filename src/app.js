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
      }
    });
};


// let message = req.url.query.you;

// use this for /cosway?text=whatever u please
// message = "Hola";

// res.write(`<!DOCTYPE html><html><body><h1>${message}</h1></body></html>`);
// ... Instead of doing manual HTML like that, you could have used the "fs" module to read a file
// and "res.write()" the contents of that file.

//   res.end();
//   return;
// }


// Here, we have a "POST" request which will always return a JSON object.  That object will either be
// the JSON that you posted in (just spitting it back out), or an error object, formatted to look like JSON
// else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
//   res.setHeader('Content-Type', 'text/json');
//   res.statusCode = 200;
//   res.statusMessage = 'Alrighty than';

//send back json message
// res.write(JSON.stringify(req.body));
//   let cowMessage = cowsay.say{(text: req.body.text)};
// res.write(JSON.stringify{
//   content: cowMessage({ req.body.text });

//   res.end();
//   return;
// }

// else {
//     res.setHeader('Content-Type', 'text/html');
//     res.statusCode = 404;
//     res.statusMessage = 'Not Found';
//     res.write('Resource Not Found');
//     res.end();
//   }

//     }) // closes the "then" of the parser promise
//   .catch(err => {
//     res.writeHead(500);
//     res.write(err);
//     res.end();
//   })
// };

const app = http.createServer(requestHandler);

const server = module.exports = {};
server.start = (port, callback) => {
  app.listen(port, callback);
};

server.stop = (callback) => {
  console.log('Server is stopped');
  app.close(callback);
};
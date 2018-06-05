'use strict';

/Feature Tasks
For this assignment you will be building a HTTP server with a main server module and separate module/s to parse a request's url and body.

The application will use the Cowsay module.

The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stoping the server. It should export an object with start and stop methods. The start and stop methods should each return a promise that resolves on success and rejects on error.

GET /
When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.

<!DOCTYPE html>
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
   <header>
   <main>
     <!-- project description -->
   </main>
  </body>
</html>
GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server should parse the querystring for a text key. It should then send a rendered HTML page with a cowsay cow speaking the value of the text query. If their is no text query the cow message should say 'I need something good to say!'.

<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
    <h1> cowsay </h1>
    <pre>
      <!-- cowsay.say({text: req.query.text}) -->
    </pre>
  </body>
</html>
POST /api/cowsay
When a client makes a POST request to /api/cowsay it should send JSON that includes {"text": "<message>"}. The server should respond with a JSON body {"content": "<cowsay cow>"}.

A response for a valid Requests should have a status code of 200 and the JSON body

{
  "content": "<cowsay cow text>" 
}
A response for a invalid Requests should have a status code of 400 and the JSON body...

{
  "error": "invalid request: text query required"
}
Request	Response Status Code	Response Type	Response Body
With out a body	400	JSON	{"error": "invalid request: body required"}
With out text property on the body	400	JSON	{"error": "invalid request: text query required"}
With text query	200	J
[![Build Status](https://travis-ci.com/Confalone/07-http-server.svg?branch=master)](https://travis-ci.com/Confalone/07-http-server)

# Lab 07 Vanilla HTTP Server

### Instructions
 * 1. npm install
 * 2. add a `.env` with the following code: `PORT=3000`
 * 3. start the server `npm run start`
 * 4. follow specific instructions below for a GET or POST request

 #### GET request
 * to make a request to `/` user must go to `http://localhost:3000` in the prefered browser.  server will respond with an HTML and a link to `/cowsay`]
 * user can click the cowsay link and be directed to a page with an image of a cow with a quote box
 * to change the words the cow is saying a user can add `?text={message}`
 
 #### For Example
 * `http://localhost:3000/cowsay?text=hello`  this is how the user would change the cows words to hello

 #### Post request (all done in terminal)
 * check that httpie is installed
 * user can type the data they want to send in the following format `echo '{"<key>" : "<value"}' | http post localhost:3000/api/cowsay`
 * response should be a 200 status code and text in the follwoing format `{"content":"<value>"}`

 #### For Example
 * request: `echo '{"text" : "tyler"}' | http post localhost:3000/api/cowsay`
 * response: `{"content":"tyler"}`
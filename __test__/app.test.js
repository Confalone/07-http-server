'use strict';

const superagent = require('superagent');
const app = require('../src/app.js'); //eslint-disable-line

describe('app.test.js',() => {
  it('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = { 'text':'tyler'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(bodyToTest)
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });
});
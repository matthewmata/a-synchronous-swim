const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if(req.method === 'GET'){
    res.writeHead(200, headers);
    res.end(JSON.stringify(messages.dequeue()));
  } else if(req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end();
  } else if(req.method === 'POST'){
    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      res.on('error', (err) => {
        console.error(err);
      });
      res.writeHead(200, headers);
      // console.log(JSON.stringify(body))
      res.end(JSON.stringify(body))
    })
  }

};

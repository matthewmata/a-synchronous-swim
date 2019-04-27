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

  if(req.method === 'GET' && req.url === '/movement'){
    res.writeHead(200, headers);
    res.end(JSON.stringify(messages.dequeue()));
  } else if(req.method === 'GET' && req.url === '/picture'){
    res.writeHead(200, headers);
    fs.readFile('../picture.txt', 'utf8', (err, data) => {
      if (err) console.error(err);
      console.log('in server');
      res.end(JSON.stringify(data));
    })
  }
  else if(req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end();
  } else if(req.method === 'POST' && req.url === '/beckham'){
    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      fs.writeFile( 'picture.txt', body, (err) => {
        if (err) console.error(err);
      })
      res.on('error', (err) => {
        console.error(err);
      });
      res.writeHead(200, headers);
      // console.log(JSON.stringify(body))
      res.end('success')
    })
  }

};

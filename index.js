#!/bin/env node

var nodemailer = require('nodemailer');

var http, director, bot, router, server, port, db;

http        = require('http');
director    = require('director');
bot         = require('./bot.js');
today       = require('./modules/command-list.js');

router = new director.http.Router({
  '/'    : {
    get: ping
  },
'/list' : {
get: pingit
},
  '/init' : {
    get:  bot.init,
    post: bot.init
  },
  '/commands' : {
    get: bot.commands
    //post: bot.commands
  },
  '/bot/:botRoom' : {
    get: ping,
    post: bot.respond
  },
});

server = http.createServer(function (req, res) {
  req.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.NODEJS_SERVICE_PORT || process.env.PORT || 8080 || 3002);
ip = process.env.NODEJS_SERVICE_IP || "0.0.0.0" || "127.0.0.1";

server.listen(port, ip);

function ping() {
  this.res.writeHead(200);
  this.res.end("I am AlexBot.\n\For a list of commands go to\n\https://nodejs-mongo-persistent-cc.b9ad.pro-us-east-1.openshiftapps.com/commands");
}

function pingit() {
  this.res.writeHead(200, {"content-type": "text/html"});
  this.res.end(today.buildHTML);
}

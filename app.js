/**
 * Why node?
 * non-blocking code, just like JS, when you make a ajax request or promises, the remaining code gets executed until the ajax/promise gets resolved
 * then that part of the code is run. Meaning the execution doesn't stop until the request is resolved. IE.. non-blocking code, async.
 * */


/**
 * general info:
 * */

// 1. ./ vs ../ vs no dot:
  // ./ means same directory.  ../ parents directory. w/o anything then it will look for node native modules ex var http = require('http');

// 2. version: 1.2.3
  //  1. the major ie complete new app
  //  2. minor ie some new features
  //  3. patch ie.. bugfixes

// 3. {encoding: 'utf-8'} will print text




/**
 * General require
 * */

var http = require('http');
var fs = require('fs');
var path = require('path');
var events = require('events');  // custom events
var express = require('express');






/**
 * Example of blocking VS non-blocking node w/ readFile
 * */

//blocking:
// var contents = fs.readFileSync('index.html');
// console.log(contents);

// non:
// var filePath = path.join(__dirname, 'index.html');
// var index;
// fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
//   err ? console.log(err) : (index = data);
// });




/**
 * Making a http request using two different ways 1 & 2:
 * 1. returning a text node (not html markup, even if you use <h1>hi</h1> it still will print out <h1>hi</h1>)
 * 2. returning html markup
 * */


/**
 * Making a http request 1 (using callbacks):
 * content-Type, specifies the returned data:
 * */

// curl -i http://localhost:8080
// http.createServer(function(request, response) {
//   // 1. response.writeHead(200, {'Content-Type': 'text/plain'});  // is a text node
//   // 2. response.writeHead(200, {'Content-Type': 'text/html'}); // html markup
//
//   response.write(index);
//   response.end();
// }).listen(8080);



/**
 * Making a http request 2 (using 'on'):
 * */
// var server = http.createServer();
//
// server.on('request', function(request, response) {
//   response.writeHead(200);
//   response.write("Hello, this is dog");
//   response.end();
// });
//
// server.on('request', function(request, response) {
//   console.log("New request coming in...");
// });
//
// server.on('close', function(){
//   console.log("Closing down the server...");
// });
//
// server.listen(8080);




/**
 * Making a custom new event
 * 1. need to instantiate EventEmitter
 * 2. define your functions listeners
 * 3. call them as needed
 * */

// 1:
// var EventEmitter = events.EventEmitter;
// var logger = new EventEmitter();
//
// 2:
// logger.on('warn', function(message){
//   console.log(message);
// });
//
// logger.on('info', function(message){
//   console.log(message);
// });
//
// logger.on('error', function(message){
//   console.log(message);
// });
//
//
// //curl -i http://localhost:8080
// http.createServer(function(request, response) {
//   // response.writeHead(200, {'Content-Type': 'text/plain'});  // is a text node
//   response.writeHead(200, {'Content-Type': 'text/html'}); // html markup
//
//   3:
//   // Using the custom events here:
//   logger.emit('warn', ['callBack string']);
//   logger.emit('info', {a: 'callBack string'});
//   logger.emit('error', 'callBack string');
//
//   response.write(index);
//   response.end();
// }).listen(8080);






/**
 * Stream
 * Creating a readable & writing stream, for transferring large data
 * Why when you transfer large data, you have have pieces of it, making it easy for the receiver to consume the data and much much faster...
 * */

// var pieceNumber = 0;
// var jsonSample = fs.createReadStream(__dirname + '/largeData.json'); // reading
// var transferringJsonSample = fs.createWriteStream(__dirname + '/transferringJson.json');  // writing

// 1. Hard way:

// jsonSample.on('data', function (piece) { // adding a event when the data is being transferred
//
//   pieceNumber++;
//   console.log(pieceNumber);
//   console.log('New piece');
//   console.log(piece);
//
//   // Writing:
//   transferringJsonSample.write(piece);
// });

// 2. Easy way:
// jsonSample.pipe(transferringJsonSample); // reads + write? use pipe..





/**
 * Streaming from command line, using a curl command you can select what file you want to copy
 * */

// var server = http.createServer();
// server.on('request', function(request, response) {
//
//   var transferringJsonSample = fs.createWriteStream(__dirname + '/transferringJson.json');  // writing
//   request.pipe(transferringJsonSample);
//   response.end();
//
// });
//
// server.listen(8080);
// curl --upload-file largeData.json http://localhost:8080/    --double check, maybe not be the right command


/**
 * Let's create an HTTP server that will serve index.html.
 * Reading the html file then sending that to the response
 * */
// http.createServer(function(request, response) {
//   response.writeHead(200, {'Content-Type': 'text/html'});
//
//   var file = fs.createReadStream('index.html');
//   file.pipe(response);
// }).listen(8080);




/**
 * modules
 * custom modules & npm modules (why code it, if most one else already did the heavy work..)
 * */


// Custom modules:
// var helloFnc = require('./modules/custom_module1');  // only the path w/o .js
// var helloObj = require('./modules/custom_module2');  // No .js
//
// helloFnc();
// helloObj.helloMethod();

// npm modules:
// it's a command: npm install <module/package name> ex: npm install request


/**
 * package.json
 * is a json file that contains details about your node app including all it's dependencies
 * npm install, will look at your package.json file and install all your required dependencies
 * */
var packageJson = {
  "name": "leanding node.js",
  "version": "1",
  "dependencies": {
    "request": "1.8.6"
  }
};





/**
 * Sockets: chat room
 * */
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var users = {};
var userNum = 1;
var myUsers = 'myUsers';

/**
 * Getting static files!!!!!!!!
 * */
app.use(express.static(__dirname + '/public')); // then you your markup you have set your directory, by whatever is in your public folder: <script src="/script.js"></script>



io.on('connection', function (client) {
  // client is everyone who joins the chat room, meaning if you have 2 tab open, you'll have 2 clients
  // client is a obj... so you can add a id to that client.

  // Welcome to chat room
  client.emit('messages', 'Welcome to chat room');

  // On messages sent:
  client.on('messages', function (data) {
    // Sending chat to clients:
    setTimeout(function () {
      client.broadcast.emit('messages', data);
    }, 50);
  });

  client.on('joinChatRoom', function (data) {
    var t = users[myUsers + userNum] = data;
    client.id = t;
    userNum++;

    console.log(client.id );
  });
});



app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});



server.listen(8080);

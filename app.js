/*var express = require('express');
var http = require('http').Server(express);
var bodyParser = require('body-parser');
var app = express();
var io = require('socket.io')(http);*/

/*var app = express();
var server = app.listen(3000);

var io = require('socket.io').listen(server);*/

/*var telegram = require('telegram-bot-api');
var api = new telegram({
  token: '217858149:AAEcK3srkLSNgFKfy8njbv7tFvEFY1Y8WUo',
  updates: {
    enabled: true,
    get_interval: 1000
  }
});
api.getMe().then(function(data){
    console.log(data.username +' bot server is running on :3000 port');
});
app.get('/', function (req, res) {
  res.send("server is running");
});
api.on('message', function(message){
  var chat_id = message.chat.id,
      messageFrom = message.chat.first_name +' '+ message.chat.last_name;
      
  api.sendMessage({
    chat_id: message.chat.id,
    text: message.text != "hello" ? messageFrom + ' сказал: ' + message.text : 'hello World'
  })
  .then(function(message){
    console.log(message.text);
  })
});
io.on('connection', function(socket){
  socket.join(socket.id);
  console.log(socket.id);
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
  socket.on('chat message', function(msg){
    console.log('id: '+msg.id+' message: ' + msg.message);
    api.sendMessage({
      chat_id: msg.recepient,
    text: 'message from: '+msg.id+" text: "+msg.message
  });
  socket.broadcast.to(socket.id).emit('my message', msg);
  });
});*/
var express = require('express');
const server = express()
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://mintercom.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })
  .listen(3000, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
io.on('connection', (socket) => {
  socket.join(socket.id);
  console.log(socket.id);
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('say to someone', function(id, msg){
    socket.broadcast.to(id).emit('my message', msg);
  });
  socket.on('chat message', function(msg){
    console.log('id: '+msg.id+' message: ' + msg.message);
    api.sendMessage({
      chat_id: msg.recepient,
    text: 'message from: '+msg.id+" text: "+msg.message
  });
  socket.broadcast.to(socket.id).emit('my message', msg);
  });
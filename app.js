var express = require('express'),
    app = express(),
    server = app.listen(process.env.PORT || 3000),
    io = require('socket.io').listen(server),
    telegram = require('telegram-bot-api');

var api = new telegram({
      token: '217858149:AAEcK3srkLSNgFKfy8njbv7tFvEFY1Y8WUo',
      updates: {
        enabled: true,
        get_interval: 1000
      }
});
var managerId = "";

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://mintercom.herokuapp.com:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
api.getMe();
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});
api.on('message', function(message){
  var splitedMessage = (message.text).split(" ")
      sendToSocket = "/#"+splitedMessage.shift();
      messageBody =  splitedMessage.join(" ");
      io.sockets.in(sendToSocket).emit('direct message', { message: messageBody });
});
io.on('connection', function(socket){
  var thisSocketId = socket.id;
  console.log("user connected, his ID : " + thisSocketId);
  socket.on('connected customer', function(data){
    managerId = data;
  });

  socket.on('disconnect', function(){
    console.log("user disconnected, his id: " + thisSocketId);
  });

  socket.on('chat message', function(msg){
    io.sockets.in(thisSocketId).emit('pong message', { message: msg.message });
    api.sendMessage({
      chat_id: managerId,
      text: 'message from: '+thisSocketId+" text: "+msg.message
    });
  });
});

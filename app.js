var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);

var io = require('socket.io').listen(server);
var telegram = require('telegram-bot-api');
var api = new telegram({
	token: '217858149:AAEcK3srkLSNgFKfy8njbv7tFvEFY1Y8WUo',
	updates: {
		enabled: true,
		get_interval: 1000
	}
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://mintercom.herokuapp.com:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
api.getMe();
app.get('/', function (req, res) {
	res.sendfile('index.html', { root: __dirname });
});
api.on('message', function(message){
	var chat_id = message.chat.id,
      sendTo = splitedMessage[0].slice(1),
	    messageFrom = message.chat.first_name +' '+ message.chat.last_name;
	
	api.sendMessage({
		chat_id: message.chat.id,
		text: message.text != "hello" ? messageFrom + ' сказал: ' + message.text : 'hello World'
	})
	.then(function(message){
    if (io.sockets.connected[sendTo]) {
      io.sockets.connected[sendTo].emit('message', message);
    }
    else{
      api.sendMessage({
        chat_id: message.chat.id,
        text: "this user not found";
      })
    }
	})
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    api.sendMessage({
      chat_id: 213345206,
      text: 'user disconnected: '+socket.id
    });
  });
  socket.on('chat message', function(msg){
    console.log('id: '+msg.id+' message: ' + msg.message);
    socket.emit('pong message', { message: msg.message });
    api.sendMessage({
    	chat_id: msg.recepient,
		  text: 'message from: '+msg.id+" text: "+msg.message
	  });
  });
});

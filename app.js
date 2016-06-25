var telegram = require('telegram-bot-api');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var api = new telegram({
	token: '217858149:AAEcK3srkLSNgFKfy8njbv7tFvEFY1Y8WUo',
	updates: {
		enabled: true,
		get_interval: 1000
	}
});
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/', function (req, res) {

});
app.post('/', function (req, res) {
	console.log(req.body)
	api.sendMessage({
		chat_id: req.body.chatid,
		text: 'Сообщение от польз. #'+req.body.session+" :"+req.body.messagetxt
	})
	.then(function(){
		console.log(req.body.messagetxt);
		res.send('done');
	})

});
app.listen(3000, function () {
	api.getMe().then(function(data){
   		console.log(data.username +' bot server is running on :3000 port');
	});
  
});
api.on('message', function(message){
	var chat_id = message.chat.id,
	    messageFrom = message.chat.first_name +' '+ message.chat.last_name;
	    
	api.sendMessage({
		chat_id: message.chat.id,
		text: message.text != "лох" ? messageFrom + ' сказал: ' + message.text : 'сам лох' + message.chat.id
	})
	.then(function(message){
		console.log(message.text);
	})
});
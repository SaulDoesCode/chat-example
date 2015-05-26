var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.use("/assets", express.static(__dirname + '/assets'));

io.on('connection', function(socket){
    console.log("Someone Connected");
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });  
});

io.on('disconnect', function(msg) {
    console.log("Someone Disconnected");
});

http.listen(app.get('port'), function(){
  console.log('Server Started : listening on *:3000');
});

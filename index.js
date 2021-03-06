var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  io.emit('chat message', '---' + socket.client.id + 'just joined the room!!!');
  socket.on('chat message', function(msg) {
   io.emit('chat message', '[' + socket.client.id + ']:' + msg);
   });
  socket.on('disconnect', function(){
    io.emit('chat message', '---' + socket.client.id + 'just left the room!');
  });
});
const port = process.env.PORT || 3000;
http.listen(3000, function(){
  console.log('listening on *: 3000');
});

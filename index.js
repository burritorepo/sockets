var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
    });

    socket.on('canalCliente', function (obj) {
      io.emit('canalServer', obj);
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});